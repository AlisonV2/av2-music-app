<template>
    <!-- App Name -->
  <nav class="p-2 mt-0 fixed w-full z-10 top-0">
    <div class="container mx-auto flex justify-start items-center py-2 px-4">
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        <img height="70" width="70" src="../assets/img/logo.png" id="logo" />
      </router-link>

      <div class="flex flex-grow justify-end">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <!-- <li>
            <router-link class="text-white nav-item" :to="{ name: 'about' }">
              About
            </router-link>
          </li> -->
          <li v-if="!userLoggedIn">
            <a
              class="text-white nav-item"
              href="#"
              @click.prevent="toggleAuthModal"
            >
              Login
            </a>
          </li>
          <template v-else>
            <li>
              <router-link class="text-white nav-item" :to="{ name: 'manage' }">
                Manage
              </router-link>
            </li>
            <li>
              <a class="text-white nav-item" href="#" @click.prevent="signout"
                >Logout</a
              >
            </li>
          </template>
        </ul>
      </div>
    </div>
    </nav>
</template>

<script>
  import { mapMutations, mapState } from 'vuex';

  export default {
    name: 'Header',
    computed: {
      ...mapState({
        userLoggedIn: (state) => state.auth.userLoggedIn,
      }),
    },
    methods: {
      ...mapMutations(['toggleAuthModal']),
      signout() {
        this.$store.dispatch('signout', {
          router: this.$router,
          route: this.$route,
        });
        if (this.$route.meta.requiresAuth) {
          this.$router.push({ name: 'home' });
        }
      },
    },
  };
</script>
