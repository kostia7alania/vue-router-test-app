<template>
  <div>
    Board with prop id: {{ id }}
    <div>
      <label for="is-user">
        Is User?
        <input v-model="isUser" id="is-user" type="checkbox" />
      </label>
      <router-view :prop-to-child="parseInt(id)" />
      <router-view v-if="isUser" name="user" />
      <router-view v-else name="guest" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    return {
      isUser: false,
    };
  },
};
</script>
