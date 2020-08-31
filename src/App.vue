<template>
  <div id="app">

    <div class="links">
      <router-link :to="{ name: 'register' }">Register</router-link>
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'forgot' }">Forgot</router-link>
      <template v-if="loggedIn">
        <router-link :to="{ name: 'license' }">License</router-link>
        <router-link :to="{ name: 'board' }">Board</router-link>
        <router-link :to="{ name: 'board-child', params: { id: 33 } }"
          >Board:33</router-link
        >
        <router-link :to="{ path: '/board/33/child' }"
          >Board:33/child</router-link
        >
        <router-link :to="{ path: '/404' }">404</router-link>
      </template>

      <label for="logged-in"
        >Logged In
        <input type="checkbox" id="logged-in" v-model="loggedIn" />
      </label>
      <label for="has-license"
        >Has License
        <input type="checkbox" id="has-license" v-model="hasLicense" />
      </label>
    </div>

    <transition name="fade">
      <router-view />
    </transition>

    
    <div class="h500"></div>
    <div> Bottom </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: !!window.localStorage.getItem("logged-in"),
      hasLicense: !!window.localStorage.getItem("has-license"),
    };
  },
  watch: {
    loggedIn(e) {
      window.localStorage.setItem("logged-in", e ? true : "");
    },
    hasLicense(e) {
      window.localStorage.setItem("has-license", e ? true : "");
    },
  },
};
</script>

<style scoped>
.links > * {
  margin: 1em;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}

.fade-enter-active {
  transition-delay: 0.25s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.h500 {
  height: 1000px;
}
</style>
