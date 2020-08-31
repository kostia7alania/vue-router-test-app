<template>
  <div>
    <h1>component for unauthorized users</h1>
    <div>
      <router-link :to="{ name: 'forgot' }">Forgot</router-link>
      <router-link :to="{ name: 'login' }">Login</router-link>
      <router-link :to="{ name: 'register' }">Register</router-link>
    </div>
    <router-view />
  </div>
</template>
