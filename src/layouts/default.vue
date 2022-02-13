<script setup lang="ts"></script>

<template>
  <div
    class="bg-white dark:bg-true-gray-900 h-full p-4 max-w-5xl mx-auto"
    p="y-4 x-6"
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
