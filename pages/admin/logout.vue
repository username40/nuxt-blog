<template>
    <p>logout</p>
</template>

<script>
    export default {
        name: "logout",
      layout: 'admin',
      middleware: ['admin-auth']
    }
</script>

<style scoped>

</style>
