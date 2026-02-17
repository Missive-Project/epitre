import { supabaseClient } from "../clients/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export const authService = {
  async getSession(): Promise<Session | null> {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    return data.session;
  },
};
