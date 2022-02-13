<script setup lang="ts"></script>

<template>
  <div
    class="h-full max-w-5xl mx-auto"
    p="4"
    text="true-gray-800 dark:true-gray-200"
    font="mono medium"
  >
    <NavBar />
    <main class="mt-8">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
