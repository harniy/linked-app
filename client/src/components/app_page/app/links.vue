<template>
    <div class="links__block">
        <FilterBlock />
        <AllLinks />
    </div>
</template>

<script>
import FilterBlock from './filter/filter.vue'
import AllLinks from './links_section/links_block.vue'
export default {
    components: {FilterBlock, AllLinks}
}
</script>



<style>
.links__block {
    width: 100%;
    height: 76%;
}
</style>