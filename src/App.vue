<template>
  <Navbar/>
  <div class="content">
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {Navbar} 
}
</script>

<style>
  .content{
    margin: 0 auto;
    min-width: 1200px;
    padding: 0 20px;
  }
</style>
