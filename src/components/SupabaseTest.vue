<script setup lang="ts">
import { ref, onMounted } from "vue";
import { supabase } from "../config/supabase.config.ts";

const loading = ref(true);
const isConnected = ref(false);
const error = ref<string | null>(null);
const data = ref<unknown>(null);
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

onMounted(async () => {
  try {
    const { data: sessionData, error: supabaseError } =
      await supabase.auth.getSession();
    data.value = sessionData;

    if (supabaseError) throw supabaseError;

    isConnected.value = true;
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = String(e);
    }
    isConnected.value = false;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="supabase-test">
    <h2>Test de connexion Supabase</h2>
    <div v-if="loading">Vérification de la connexion...</div>
    <div v-else-if="isConnected" class="success">
      ✅ Connexion à Supabase réussie !
      <p>URL: {{ supabaseUrl }}</p>
      <p>data: {{ data }}</p>
    </div>
    <div v-else class="error">❌ Erreur de connexion : {{ error }}</div>
  </div>
</template>

<style scoped>
.supabase-test {
  padding: 20px;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin: 20px;
}

.success {
  color: green;
  font-weight: bold;
}

.error {
  color: red;
  font-weight: bold;
}
</style>
