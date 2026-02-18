import ky from "ky";

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
});
