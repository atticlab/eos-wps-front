<template>
  <v-container fluid>
    <v-row class="mt-6">
      <v-col
        cols="12"
        md="8"
        lg="9"
      >
        <div
          v-if="overview !== $t('noDataTexts.noOverview')"
          class="overview-container"
          v-html="overview"
        />
        <div v-else>
          {{ overview }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Overview',
    props: {
      overview: {
        type: String,
        default() {
          return this.$t('noDataTexts.noOverview');
        },
      },
    },
  };
</script>

<style lang="scss" scoped>
  .overview-container {
   margin-bottom: -12px;
  }
</style>
