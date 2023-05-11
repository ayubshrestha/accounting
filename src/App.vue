<template>
  <router-view/>
</template>
<script>
import coa from './views/coa.vue'
import inventory from './views/inventory.vue'
export default {
    name: 'tree',
    components: {
        coa,
        inventory
    },
    data() {
        return {
        }
    },
}
</script>
<style>
</style>
