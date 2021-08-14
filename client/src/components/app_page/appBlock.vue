<template>
  <div class="app__block">
      <LinkskHeader />
      <Links />
  </div>
</template>


<script>
import LinkskHeader from './app/linkHeader.vue'
import Links from './app/links.vue'

export default {
    components: {LinkskHeader, Links},

};
</script>



<style>

.app__block {
  width: 85%;
  height: 100%;
}
</style>