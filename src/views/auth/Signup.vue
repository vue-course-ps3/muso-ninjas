<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>
    <input type="text" placeholder="Display name" v-model="displayName" required>
    <input type="email" placeholder="Email" v-model="email" required>
    <input type="password" placeholder="Password" v-model="password" required>
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending">Sign up</button>
    <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup(){
    const {error, signup, isPending} = useSignup();
    const router = useRouter();
    const displayName = ref('');
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () =>{
      const res = await signup( email.value, password.value, displayName.value);
      if(!error.value){
        router.push({name: 'UserPlaylists'});
      }

    }

    return {displayName, email, password, error, isPending, handleSubmit}
  }

}
</script>

<style>

</style>