const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const tokenService = {
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  getAccessToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  clearTokens(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  hasToken(): boolean {
    return !!this.getAccessToken();
  },
};
