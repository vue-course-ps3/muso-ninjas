<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete playlist</button>
    </div>
    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs have been added to the playlist yet.</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist"/>
    </div>
    
  </div>
</template>

<script>
import AddSong from '@/components/AddSong.vue';
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  components:{AddSong},
  setup(props) {
    const { error, document: playlist } = getDocument('playlists', props.id)
    const { user } = getUser()
    const { deleteDoc} = useDocument('playlists', props.id)
    const router = useRouter();

    const ownership = computed(()=>{
      return playlist.value && user.value && playlist.value.userId === user.value.uid
    })
    const handleDelete = async () => {
      await deleteDoc()
      router.push({name: 'Home'})
    }
    return { error, playlist, ownership, handleDelete }
  }
}
</script>

<style>
.playlist-details {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 40px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.playlist-info {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #f0f8ff, #e6f7ff);
  border-radius: 10px;
}

.playlist-info h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
  font-weight: bold;
  text-transform: capitalize;
}

.playlist-info p {
  margin-bottom: 10px;
  color: #555;
  font-size: 1rem;
  line-height: 1.5;
}

.username {
  color: #888;
  font-size: 0.9rem;
  font-style: italic;
}

.description {
  text-align: left;
  font-size: 1rem;
  color: #444;
  line-height: 1.6;
  margin-top: 15px;
}

.song-list {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.song-list p {
  color: #333;
  font-size: 1rem;
  text-align: center;
}
.single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--secondary);
    margin-bottom: 20px;
  }
</style>