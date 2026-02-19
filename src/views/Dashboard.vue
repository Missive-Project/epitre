<script setup lang="ts">
import { useSession, useSignOut } from "../composables/useAuth";

const { data: session, isLoading, error } = useSession();
const { mutate: signOut, isPending: isSigningOut } = useSignOut();
</script>

<template>
  <div class="dashboard-container">
    <nav class="navbar">
      <h1>Epitre Dashboard</h1>
      <button class="logout-button" :disabled="isSigningOut" @click="signOut()">
        Se déconnecter
      </button>
    </nav>

    <main class="dashboard-content">
      <div v-if="isLoading" class="loading">Chargement...</div>

      <div v-else-if="error" class="error-card">
        <p>Erreur lors du chargement de la session</p>
      </div>

      <div v-else-if="session" class="welcome-card">
        <div class="avatar">
          {{ session.user.email?.charAt(0).toUpperCase() }}
        </div>
        <h2>Bienvenue !</h2>
        <p class="email">{{ session.user.email }}</p>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">ID utilisateur</span>
            <span class="value">{{ session.user.id }}</span>
          </div>
          <div class="info-item">
            <span class="label">Provider</span>
            <span class="value">Google</span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-container {
  min-height: 100vh;
  background: #f5f7fa;
}

.navbar {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h1 {
  font-size: 1.5rem;
  color: #333;
}

.logout-button {
  padding: 0.5rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.logout-button:hover {
  background: #5568d3;
}

.dashboard-content {
  max-width: 800px;
  margin: 3rem auto;
  padding: 0 2rem;
}

.loading,
.error-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-card {
  color: #c33;
  background: #fee;
  border: 1px solid #fcc;
}

.welcome-card {
  background: white;
  padding: 3rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.welcome-card h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.email {
  font-size: 1.125rem;
  color: #667eea;
  font-weight: 500;
  margin-bottom: 2rem;
}

.info-grid {
  display: grid;
  gap: 1rem;
  text-align: left;
}

.info-item {
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.label {
  font-size: 0.875rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 1rem;
  color: #333;
  word-break: break-all;
}
</style>
