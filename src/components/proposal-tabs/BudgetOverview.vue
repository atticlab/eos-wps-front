<template>
  <v-container fluid>
    <v-row class="mb-12">
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          class="text-center"
          color="pink darken-4 white--text"
        >
          <v-card-title class="justify-center pa-2">
            {{ $t('proposalPage.totalRequested') }}:
          </v-card-title>
          <v-card-text
            class="white pt-4
                   text-center
                   text-uppercase
                   word-break
                   font-weight-bold
                   indigo--text"
          >
            {{ totalBudget }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          class="text-center"
          color="pink darken-4 white--text"
        >
          <v-card-title class="justify-center pa-2">
            {{ $t('common.numberOfPayments') }}:
          </v-card-title>
          <v-card-text
            class="white pt-4
                   text-center
                   text-uppercase
                   word-break
                   font-weight-bold
                   indigo--text"
          >
            {{ `${duration} ${$t('common.months')}` }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <v-card
          class="text-center"
          color="pink darken-4 white--text"
        >
          <v-card-title class="justify-center pa-2">
            {{ $t('proposalPage.monthlyRequested') }}:
          </v-card-title>
          <v-card-text
            class="white pt-4
                   text-center
                   text-uppercase
                   word-break
                   font-weight-bold
                   indigo--text"
          >
            {{ monthlyBudget }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <BudgetTable
          :budget-data-init="budgetData"
          :eos-price="eosPrice"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import BudgetTable from '@/components/BudgetTable.vue';
  import getEosPrice from '@/mixins/getEosPrice';

  export default {
    name: 'BudgetOverview',
    components: {
      BudgetTable,
    },
    mixins: [getEosPrice],
    props: {
      monthlyBudget: {
        type: String,
        default: 'No data',
      },
      totalBudget: {
        type: String,
        default: 'No data',
      },
      duration: {
        type: Number,
        default: 1,
      },
      budgetData: {
        type: String,
        default: '',
      },
    },
    mounted() {
      this.$_getEosPrice();
    },
  };
</script>

<style scoped>

</style>
