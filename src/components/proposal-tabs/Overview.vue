<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="7"
        lg="8"
      >
        <div
          v-if="overview !== $t('noDataTexts.noOverview')"
          v-html="overview"
        />
        <div v-else>
          {{ overview }}
        </div>
      </v-col>
      <v-col
        order="first"
        order-md="2"
      >
        <v-card color="pink darken-4 white--text mb-5">
          <v-card-title class="justify-center pa-2">
            {{ $t('proposalPage.author') }}:
          </v-card-title>
          <v-card-text
            class="white
                   pt-4
                   text-center
                   font-weight-bold
                   word-break
                   indigo--text"
          >
            {{ proposer }}
          </v-card-text>
        </v-card>

        <v-card color="pink darken-4 white--text mb-5">
          <v-card-title class="justify-center pa-2">
            {{ $t('proposalPage.category') }}:
          </v-card-title>
          <v-card-text
            class="white
                   pt-4
                   text-center
                   font-weight-bold
                   text-uppercase
                   word-break
                   indigo--text"
          >
            {{ category }}
          </v-card-text>
        </v-card>

        <v-card
          v-if="video !== $t('noDataTexts.noVideo')"
          color="pink darken-4 white--text mb-5"
        >
          <v-card-title class="justify-center pa-2">
            {{ $t('proposalPage.videoLink') }}:
          </v-card-title>
          <v-card-text
            class="white
                   pt-4
                   text-center
                   font-weight-bold
                   text-uppercase
                   word-break
                   indigo--text"
          >
            <a
              :href="video"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ video }}
            </a>
          </v-card-text>
        </v-card>

        <!--        <v-card color="pink darken-4 white&#45;&#45;text mb-5">-->
        <!--          <v-card-title class="justify-center pa-2">-->
        <!--            {{ $t('proposalPage.created') }}:-->
        <!--          </v-card-title>-->
        <!--          <v-card-text-->
        <!--            class="white-->
        <!--                   pt-4-->
        <!--                   text-center-->
        <!--                   text-uppercase-->
        <!--                   word-break-->
        <!--                   font-weight-bold-->
        <!--                   indigo&#45;&#45;text"-->
        <!--          >-->
        <!--            {{ $moment(created).format($constants.DATE_FORMAT) }}-->
        <!--          </v-card-text>-->
        <!--        </v-card>-->

        <!--        <v-card color="pink darken-4 white&#45;&#45;text">-->
        <!--          <v-card-title class="justify-center pa-2">-->
        <!--            {{ $t('proposalPage.hash') }}:-->
        <!--          </v-card-title>-->
        <!--          <v-card-text-->
        <!--            class="white pt-4-->
        <!--                   text-center-->
        <!--                   text-uppercase-->
        <!--                   word-break-->
        <!--                   font-weight-bold-->
        <!--                   indigo&#45;&#45;text"-->
        <!--          >-->
        <!--            {{ hash }}-->
        <!--          </v-card-text>-->
        <!--        </v-card>-->
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
      proposer: {
        type: String,
        default() {
          return this.$t('noDataTexts.noProposer');
        },
      },
      hash: {
        type: String,
        default() {
          return this.$t('noDataTexts.noHash');
        },
      },
      category: {
        type: String,
        default() {
          return this.$t('noDataTexts.noCategory');
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
        default: '',
      },
    },
  };
</script>

<style scoped>

</style>
