export interface ApiResponse {
  code: number;
  response: string;
}

export interface Auth {
  username: string;
  key: string;
}

const baseUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "/api";

async function request(
  method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
  path: string,
  auth: Auth,
  body?: object, 
  basePath?: string
) {
  const startUrl = basePath ?? baseUrl;
  const fullUrl = startUrl + path;
  
  console.log(`[REQUEST START] ${method} ${fullUrl}`, body ? { body } : '');
  
  try {
    const headers: Record<string, string> = {};

    if (auth.key) {
      headers["Account-Auth-Account"] = auth.username;
      headers["Account-Auth-ApiKey"] = auth.key;
    }

    if (body != undefined) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(fullUrl, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const text = await response.text();

    return { code: response.status, response: text };
  } catch (error) {
     if (error instanceof Error ) {
      console.error(`Network error: ${error.message}`);
      throw error;
    } else {
      console.error("Unknown network error");
      throw new Error("Network error");
    }
  }
}

export async function getResponse(
  path: string,
  auth: Auth, 
  basePath?: string,
): Promise<ApiResponse> {
  return request("GET", path, auth, undefined, basePath);
}

export async function postResponse(
  path: string,
  auth: Auth,
  body?: object, 
  basePath?: string,
): Promise<ApiResponse> {
  return request("POST", path, auth, body, basePath);
}

export async function patchResponse(
  path: string,
  auth: Auth,
  body?: object, 
  basePath?: string,
): Promise<ApiResponse> {
  return request("PATCH", path, auth, body, basePath);
}

export async function putResponse(
  path: string,
  auth: Auth,
  body?: object,
  basePath?: string,
): Promise<ApiResponse> {
  return request("PUT", path, auth, body, basePath);
}

export async function deleteResponse(
  path: string,
  auth: Auth, 
  basePath?: string,
): Promise<ApiResponse> {
  return request("DELETE", path, auth, undefined, basePath);
}
