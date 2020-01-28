<template>
  <v-container fluid>
    <v-row
      v-if="video && created"
      class="mb-10 mt-6"
    >
      <v-col
        cols="12"
        md="5"
      >
        <div>
          <div class="accent--text font-weight-semi-bold text-uppercase">
            {{ $t('proposalPage.videoLink') }}
          </div>
          <div class="font-weight-semi-bold word-break fs-20">
            <template v-if="video === $t('noDataTexts.noVideo')">
              {{ video }}
            </template>
            <a
              v-else
              :href="video"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ video }}
            </a>
          </div>
        </div>
      </v-col>
      <v-col
        v-if="created !== $t('noDataTexts.noDate')"
        cols="12"
        md="5"
      >
        <div>
          <div class="accent--text font-weight-semi-bold text-uppercase">
            {{ $t('proposalPage.created') }}
          </div>
          <div class="font-weight-semi-bold word-break fs-20">
            {{ $moment(created).format($constants.DATE_FORMAT) }}
          </div>
        </div>
      </v-col>
    </v-row>
    <v-row>
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
      video: {
        type: String,
        default() {
          return this.$t('noDataTexts.noVideo');
        },
      },
      created: {
        type: String,
        default() {
          return this.$t('noDataTexts.noDate');
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
