<script setup lang="ts">
import { useHealth } from "../composables/useHealth";

const { data, isLoading, isError, error, refetch } = useHealth();
</script>

<template>
  <div class="health-check">
    <h2>API Health Check</h2>
    <button @click="refetch()">🔄 Vérifier</button>

    <div v-if="isLoading">⏳ Chargement...</div>
    <div v-else-if="isError" class="error">❌ {{ error?.message }}</div>
    <div v-else-if="data" class="success">✅ {{ data.status }}</div>
  </div>
</template>

<style scoped>
.health-check {
  padding: 2rem;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>
