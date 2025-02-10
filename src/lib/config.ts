export const API_BASE_URL = "https://frontend-take-home-service.fetch.com";
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const DOG_BREEDS_ENDPOINT = `${API_BASE_URL}/dogs/breeds`;

export const API_DEFAULT_HEADERS = { "Content-Type": "application/json" };

export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
