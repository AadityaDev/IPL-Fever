<template>
  <section />
</template>

<script>
export default {
  name: 'StoreRouter',
  props: {
    nextRoute: {
      type: String,
      default: '',
      required: true,
    },
  },
  mounted() {
    this.$router.push(this.nextRoute);
  },
};
</script>
