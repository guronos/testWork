<template>
  <header>
      Test work
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header, main {
    display: flex;
    justify-content: center;
}
header {
    background: rgba(178, 219, 227, 0.8);
    padding: 2rem;
    border-radius: 0 0 8px 8px;
}
</style>
