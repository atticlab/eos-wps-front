<template>
  <v-container fluid>
    <v-row class="mb-10 mt-6">
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div>
          <div class="accent--text font-weight-semi-bold text-uppercase mb-1">
            {{ $t('proposalPage.totalRequested') }}
          </div>
          <div class="font-weight-semi-bold word-break fs-20">
            {{ totalBudget }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div>
          <div class="accent--text font-weight-semi-bold text-uppercase mb-1">
            {{ $t('common.numberOfPayments') }}
          </div>
          <div class="font-weight-semi-bold word-break fs-20">
            {{ `${duration} ${$t('common.months')}` }}
          </div>
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="3"
      >
        <div>
          <div class="accent--text font-weight-semi-bold text-uppercase mb-1">
            {{ $t('proposalPage.monthlyRequested') }}
          </div>
          <div class="font-weight-semi-bold word-break fs-20">
            {{ monthlyBudget }}
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <BudgetTable
          v-if="budgetData !== $t('noDataTexts.noBudgetItems')"
          :budget-data-init="budgetData"
          :eos-price="eosPrice"
        />
        <div
          v-else
          class="text-center"
        >
          {{ budgetData }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import BudgetTable from '@/components/BudgetTable.vue';
  import ActionType from '@/store/constants';

  export default {
    name: 'BudgetOverview',
    components: {
      BudgetTable,
    },
    props: {
      monthlyBudget: {
        type: String,
        default() {
          return this.$t('noDataTexts.noMonthlyBudget');
        },
      },
      totalBudget: {
        type: String,
        default() {
          return this.$t('noDataTexts.noTotalBudget');
        },
      },
      duration: {
        type: Number,
        default: 1,
      },
      budgetData: {
        type: String,
        default() {
          return this.$t('noDataTexts.noBudgetItems');
        },
      },
    },
    computed: {
      ...mapState({
        eosPrice: state => state.userService.eosPrice,
      }),
    },
    mounted() {
      this[ActionType.REQUEST_EOS_PRICE]();
    },
    methods: {
      ...mapActions('userService', [
        ActionType.REQUEST_EOS_PRICE,
      ]),
    },
  };
</script>

<style scoped>

</style>
