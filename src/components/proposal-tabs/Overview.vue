<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        md="7"
        lg="8"
      >
        <div v-html="overview" />
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
        default: '',
        // default: this.$t('common.noData'),
      },
      proposer: {
        type: String,
        default: 'No data',
        // default: this.$t('common.noData'),
      },
      hash: {
        type: String,
        default: 'No data',
        // default: this.$t('common.noData'),
      },
      category: {
        type: String,
        default: 'No data',
        // default: this.$t('common.noData'),
      },
      created: {
        type: Number,
        default: () => '',
      },
    },
  };
</script>

<style scoped>

</style>
