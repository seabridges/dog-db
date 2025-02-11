export const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const DOGS_ENDPOINT = `${API_BASE_URL}/dogs`;
export const DOGS_BREEDS_ENDPOINT = `${DOGS_ENDPOINT}/breeds`;
export const DOGS_SEARCH_ENDPOINT = `${DOGS_ENDPOINT}/search`;
export const DOGS_MATCH_ENDPOINT = `${DOGS_ENDPOINT}/match`;

export const API_DEFAULT_HEADERS = { "Content-Type": "application/json" };

export enum API_METHODS {
  GET = "GET",
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
