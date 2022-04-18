<template>
  <section class="sidebar-right">
    <h1>sidebar-right</h1>
    <h2>Informacoes da interecao do mapa aqui</h2>
    <p>Texto normal sobre</p>

    <div>
      <SideBarTools></SideBarTools>
    </div>
  </section>
</template>
<style scoped lang="scss">
.sidebar-right {
  @apply absolute right-4 top-4 bg-brand-primary-lightest @csm:bg-red-900 w-96 z-540 rounded-lg p-8;
  height: calc(100vh - 2rem);
}
</style>
