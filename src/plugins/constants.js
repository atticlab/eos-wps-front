import Vue from 'vue';
import Stub from '../assets/img/proposal-img-stub.png';

const constants = {
  PROPOSAL_CATEGORIES: ['development', 'marketing', 'finance', 'community', 'other'],
  DATE_FORMAT: 'YYYY.MM.DD',
  UNITS: ['unit', 'hour', 'day', 'month', 'year'],
  DURATIONS_OF_PAYMENTS: [1, 2, 3, 4, 5, 6],
  EOS_PRECISION: 10000,
  EOS_MAX_DIGITS: 4,
  // PROPOSAL_IMAGE_STUB_URL: 'https://miro.medium.com/max/1280/0*cjs6iONVcGI6AnKT.jpg',
  PROPOSAL_IMAGE_STUB_URL: Stub,
  // FIXME: Vue.prototype.$t() always fails
  BUDGET_HEADERS: [
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Title',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
      value: 'title',
    },
    {
      // text: Vue.prototype.$t('common.cost'),
      text: 'Cost',
      value: 'cost',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
    },
    {
      // text: Vue.prototype.$t('common.amount'),
      text: 'Amount',
      value: 'amount',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
    },
    {
      // text: Vue.prototype.$t('common.unit'),
      text: 'Unit',
      value: 'unit',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
    },
    {
      // text: Vue.prototype.$t('common.subtotal'),
      text: 'Subtotal',
      value: 'subtotal',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
    },
    {
      // text: Vue.prototype.$t('common.actions'),
      text: 'Actions',
      value: 'action',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
    },
  ],
  MILESTONES_HEADERS: [
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Title',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
      value: 'title',
      width: '40%',
    },
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Start',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
      value: 'startsAt',
    },
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'End',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
      value: 'endsAt',
    },
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Actions',
      sortable: false,
      class: ['body-1', 'font-weight-bold', 'secondary--text'],
      value: 'action',
    },
  ],
  CONTRACT_NAME: 'wpswpswpswps',
  EOS_ORACLE: 'eosdtorclize',
  VOTE_YES: 'yes',
  VOTE_NO: 'no',
  VOTE_ABSTAIN: 'abstain',
  MAX_TABLE_ITEMS: 15,
  // Min deposit is '100 EOS'. Number is used for simplicity of calculations
  MIN_DEPOSIT: 100,
};

// Use the constants as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$constants = constants;
  },
});
