import { supabaseClient } from "../clients/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import { tokenService } from "./tokenService";

export const authService = {
  async signInWithGoogle(): Promise<void> {
    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      throw new Error(`Sign in error: ${error.message}`);
    }
  },

  async getSession(): Promise<Session | null> {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      throw new Error(`Get session error: ${error.message}`);
    }

    if (data.session) {
      tokenService.saveTokens(
        data.session.access_token,
        data.session.refresh_token,
      );
    }

    return data.session;
  },

  async signOut(): Promise<void> {
    const { error } = await supabaseClient.auth.signOut();

    tokenService.clearTokens();

    if (error) {
      throw new Error(`Sign out error: ${error.message}`);
    }
  },

  async refreshSession(): Promise<Session | null> {
    const { data, error } = await supabaseClient.auth.refreshSession();

    if (error) {
      tokenService.clearTokens();
      throw new Error(`Refresh session error: ${error.message}`);
    }

    if (data.session) {
      tokenService.saveTokens(
        data.session.access_token,
        data.session.refresh_token,
      );
    }

    return data.session;
  },
};
