<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/ninja.png"/>
      <h1><router-link :to="{name: 'Home'}">Muso Ninjas</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{name: 'CreatePlaylist'}">Create Playlist</router-link>
          <router-link :to="{name: 'UserPlaylists'}">My playlists</router-link>
          <span>Hi there, {{ user.displayName }}</span>
          <button @click="HandleClick">Logout</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{name: 'Signup'}">Sign up</router-link>
          <router-link class="btn" :to="{name: 'Login'}">Log in</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import { useRouter } from 'vue-router';
export default {
  setup(){
    const {user} = getUser();
    const {logout} = useLogout();
    const router = useRouter();
    const HandleClick = async () => {
      await logout();
      router.push({name: 'Login'});
    }
    return {HandleClick, user}
  }
}
</script>

<style scoped>
   .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  span{
    font-size: 14px;
    display: inline-block;
    margin-left: 16px;
    padding-left: 16px;
    border-left: 1px solid #eee;
  }
</style>