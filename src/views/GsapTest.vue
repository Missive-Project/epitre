<script setup lang="ts">
import { onMounted, ref } from "vue";
import { gsap } from "gsap";
import SupabaseTest from "../components/SupabaseTest.vue";
import HermesTest from "../components/HermesTest.vue";

const box = ref<HTMLElement | null>(null);

onMounted(() => {
  gsap.to(box.value, {
    rotation: 360,
    duration: 2,
    repeat: -1,
    ease: "linear",
  });
});
</script>

<template>
  <div class="container">
    <h1>Test GSAP</h1>
    <div ref="box" class="box">GSAP OK ✓</div>
    <SupabaseTest />
    <HermesTest />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  gap: 2rem;
}

.box {
  width: 100px;
  height: 100px;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  border-radius: 10px;
}
</style>
