export const getUserTwitchConnection = async (accessToken: string) => {
  const URL_ENDPOINT = `https://discord.com/api/users/@me/connections`;

  const respnse = await fetch(URL_ENDPOINT, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result = await respnse.json();

  return result;
};
