<script setup lang="ts"></script>

<template>
  <main>
    <div>
      <p>Page 404</p>
    </div>
    <router-view />
    <div>
      <Button @click="$router.back()">
        Clica aqui! vamos para uma pagina que existe!
      </Button>
    </div>
  </main>
</template>
