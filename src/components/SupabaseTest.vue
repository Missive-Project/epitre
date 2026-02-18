<script setup lang="ts">
import { useSession } from "../composables/useAuth";

const { data: session, isLoading, isError, error } = useSession();
</script>

<template>
  <div class="supabase-test">
    <h2>Test de connexion Supabase</h2>
    <div v-if="isLoading">⏳ Vérification de la connexion...</div>

    <div v-else-if="isError" class="error">
      ❌ Erreur de connexion : {{ error?.message }}
    </div>

    <div v-else class="success">
      ✅ Connexion à Supabase réussie !
      <p v-if="session">Session active: {{ session.user?.email }}</p>
      <p v-else>Aucune session active</p>
    </div>
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
