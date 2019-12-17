<template>
  <div class="d-flex flex-column justify-center align-center py-12 my-12">
    <h1>{{ $t('notFoundPage.notFound') }}</h1>
    <v-btn
      :to="'/'"
      color="primary"
    >
      {{ $t('notFoundPage.home') }}
    </v-btn>
  </div>
</template>

<script>
  export default {
    name: 'NotFound',
  };
</script>

<style lang="scss" scoped>
  .c {
    height: 100vh;
  }
</style>
