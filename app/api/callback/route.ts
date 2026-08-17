import { NextRequest, NextResponse } from "next/server";

function popupHtml(message: string) {
  return `<!DOCTYPE html>
<html>
  <body>
    <script>
      (function () {
        function receiveMessage(e) {
          window.opener.postMessage(
            'authorization:github:${message}',
            e.origin
          );
          window.removeEventListener("message", receiveMessage, false);
        }
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      })();
    </script>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");

  if (!clientId || !clientSecret) {
    return new NextResponse(
      "OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET not set — see README.md, Decap CMS section.",
      { status: 500 }
    );
  }
  if (!code) {
    return new NextResponse("Missing OAuth code from GitHub.", { status: 400 });
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    }
  );
  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    const html = popupHtml(
      `error:${JSON.stringify({ message: tokenData.error_description ?? "OAuth failed" })}`
    );
    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  }

  const html = popupHtml(
    `success:${JSON.stringify({ token: tokenData.access_token, provider: "github" })}`
  );
  return new NextResponse(html, { headers: { "Content-Type": "text/html" } });
}
