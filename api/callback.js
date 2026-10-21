export default async function handler(req, res) {
  const { code } = req.query;
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;

  try {
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });

    const data = await response.json();
    const accessToken = data.access_token;

    const html = `
      <!DOCTYPE html><html><body><script>
        const receiveMessage = (message) => {
          if (message.data === "authorizing:github") {
            window.opener.postMessage(
              'authorization:github:success:{"token":"${accessToken}","provider":"github"}',
              message.origin
            );
          }
          window.removeEventListener("message", receiveMessage);
        };
        window.addEventListener("message", receiveMessage, false);
        window.opener.postMessage("authorizing:github", "*");
      </script></body></html>
    `;
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Auth Error');
  }
}