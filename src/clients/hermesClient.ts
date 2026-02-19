import ky from "ky";
import { tokenService } from "../services/tokenService";
import { authService } from "../services/authService";

const hermesBaseUrl = import.meta.env.VITE_HERMES_API_URL;

export const hermesClient = ky.create({
  prefixUrl: hermesBaseUrl,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
  retry: {
    limit: 2,
    statusCodes: [408, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const accessToken = tokenService.getAccessToken();

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, _options, response) => {
        if (response.status === 401) {
          try {
            await authService.refreshSession();
            const newToken = tokenService.getAccessToken();

            if (newToken) {
              request.headers.set("Authorization", `Bearer ${newToken}`);
              return ky(request);
            }
          } catch (error) {
            console.error("Session refresh error:", error);
            tokenService.clearTokens();
            window.location.href = "/login";
          }
        }
        return response;
      },
    ],
  },
});
