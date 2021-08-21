<template>
  <main>
    <section class="mb-8 py-20 text-center relative">
      <div
        class="absolute inset-0 w-full h-full"
        id="home-header"
      ></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <div class="text-white main-header-content">
            <h1 class="font-bold text-5xl mb-5">Your Very Own Music App</h1>
          </div>
        </div>
      </div>
    </section>
    <!-- Main Content -->
    <section class="container mx-auto">
      <div
        class="bg-white opacity-90 rounded border border-gray-200 relative flex flex-col"
      >
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
          <span class="card-title text-purple-500">Songs</span>
          <!-- Icon -->
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <SongItem v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>

<script>
  import { songsCollection } from '@/includes/firebase';
  import SongItem from '@/components/SongItem.vue';

  export default {
    name: 'Home',
    components: {
      SongItem,
    },
    data() {
      return {
        songs: [],
        maxPerPage: 25,
        pendingRequest: false,
      };
    },
    async created() {
      this.getSongs();

      window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const bottomOfWindow =
          Math.round(scrollTop) + innerHeight === offsetHeight;

        if (bottomOfWindow) {
          this.getSongs();
        }
      },
      async getSongs() {
        if (this.pendingRequest) {
          return;
        }

        this.pendingRequest = true;

        let snapshots;

        if (this.songs.length) {
          const lastDoc = await songsCollection
            .doc(this.songs[this.songs.length - 1].docID)
            .get();
          snapshots = await songsCollection
            .orderBy('modified_name')
            .startAfter(lastDoc)
            .limit(this.maxPerPage)
            .get();
        } else {
          snapshots = await songsCollection
            .orderBy('modified_name')
            .limit(this.maxPerPage)
            .get();
        }

        snapshots.forEach((document) => {
          this.songs.push({
            docID: document.id,
            ...document.data(),
          });
        });

        this.pendingRequest = false;
      },
    },
  };
</script>
