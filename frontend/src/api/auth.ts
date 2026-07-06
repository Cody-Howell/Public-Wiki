import { postResponse, type Auth } from "./fetchHelpers";

export async function apiSignIn(
  identifier: string,
  password: string,
  basePath?: string,
): Promise<Auth> {
  const requestBody = {
    username: identifier,
    password: password,
  };

  const result = await postResponse(
    "/user/signin",
    { username: "", key: "" },
    requestBody,
    basePath,
  );

  if (result.code !== 200) {
    throw new Error(result.response || "Invalid credentials");
  }

  try {
    const response = JSON.parse(result.response) as string;
    return { username: identifier, key: response };
  } catch {
    throw new Error("Invalid response format");
  }
}

export async function apiSetPassword(
  auth: Auth,
  newPassword: string,
  basePath?: string,
): Promise<boolean> {
  const requestBody = {
    username: auth.username,
    password: newPassword,
  };
  const res = await postResponse("/user/changepw", auth, requestBody, basePath);
  return res.code === 200;
}
