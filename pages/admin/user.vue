<template>
    <p>user</p>
</template>

<script>
    export default {
        name: "user",
      layout: 'admin',
      middleware: ['admin-auth']
    }
</script>

<style scoped>

</style>
