import Vue from 'vue';
// import Image from '../assets/img/proposal-img-stub.png';

const constants = {
  PROPOSAL_CATEGORIES: ['development', 'marketing', 'finance', 'community', 'other'],
  DATE_FORMAT: 'YYYY-MM-DD',
  UNITS: ['unit', 'hour', 'day', 'month', 'year'],
  DURATIONS_OF_PAYMENTS: [1, 2, 3, 4, 5, 6],
  EOS_PRECISION: 10000,
  EOS_MAX_DIGITS: 4,
  PROPOSAL_IMAGE_STUB_URL: 'https://miro.medium.com/max/1280/0*cjs6iONVcGI6AnKT.jpg',
  // FIXME: Vue.prototype.$t() always fails
  BUDGET_HEADERS: [
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Title',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
      value: 'title',
    },
    {
      // text: Vue.prototype.$t('common.cost'),
      text: 'Cost',
      value: 'cost',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
    },
    {
      // text: Vue.prototype.$t('common.amount'),
      text: 'Amount',
      value: 'amount',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
    },
    {
      // text: Vue.prototype.$t('common.unit'),
      text: 'Unit',
      value: 'unit',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
    },
    {
      // text: Vue.prototype.$t('common.subtotal'),
      text: 'Subtotal',
      value: 'subtotal',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
    },
    {
      // text: Vue.prototype.$t('common.actions'),
      text: 'Actions',
      value: 'action',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
    },
  ],
  MILESTONES_HEADERS: [
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Title',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
      value: 'title',
      width: '40%',
    },
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Start',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
      value: 'startsAt',
    },
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'End',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
      value: 'endsAt',
    },
    {
      // text: Vue.prototype.$t('common.title'),
      text: 'Actions',
      sortable: false,
      class: ['body-1', 'font-weight-bold'],
      value: 'action',
    },
  ],
  CONTRACT_NAME: 'wpswpswpswps',
  EOS_ORACLE: 'eosdtorclize',
  VOTE_YES: 'yes',
  VOTE_NO: 'no',
  VOTE_ABSTAIN: 'abstain',

  // Examples of data
  AVAILABLE_BUDGET: '50000.0000 EOS',
  EOS_RATE: 2.7,
  PROPOSALS_ACTIVE: [
    {
      proposer: 'PrOpOsEr',
      proposal_name: 'title1',
      title: 'Title 1',
      monthly_budget: '100.0000 EOS',
      duration: 1,
      total_budget: '100.0000 EOS',
      status: 'active',
      deposit: '100.0000 EOS',
      payments: '0.0000 EOS',
      proposal_json: [
        {
          key: 'created',
          value: Vue.prototype.$moment().valueOf(),
        },
        // {
        //   key: 'img',
        //   value: Image,
        // },
        {
          key: 'category',
          value: 'development',
        },
        {
          key: 'hash',
          value: '1fb57b0e9a9e2a7144b3c4dd33a26d7efa4d5d15e59c6812b90b23dfa94bd280',
        },
        {
          key: 'summary',
          value: 'Description description description description description description.',
        },
        {
          key: 'overview',
          value: `<h1><strong>FAQ</strong></h1><p>This is a FAQ compiled
          from the comments of' + ' DashCentral, DashNexus, the #thunderdome channel
            of Dash Talk Discord and direct communication with community
            members. It will be updated as new questions come up that
            need answers. We will also be in the afterparty following
            today's podcast, so please stop by if want additional clarification o
            n questions you might have.</p><p>&nbsp;</p><p><strong>1.)
            Dash Refill / Mobile Topup is a for profit business and should
            talk to the DIF.</strong></p>`,
        },
        {
          key: 'budget_data',
          value: [
            {
              title: 'Budget title',
              cost: 1000,
              amount: 3,
              unit: 'unit',
              subtotal: 3000,
            },
            {
              title: 'Budget title 2',
              cost: 500,
              amount: 2,
              unit: 'unit',
              subtotal: 1000,
            },
          ],
        },
        {
          key: 'milestones',
          value: [
            {
              title: 'Title 1',
              startsAt: Vue.prototype.$moment().subtract(30, 'days').valueOf(),
              endsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
            },
            {
              title: 'Title 2',
              startsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
              endsAt: Vue.prototype.$moment().add(60, 'days').valueOf(),
            },
          ],
        },
      ],
    },
  ],
  PROPOSALS_DRAFT: [
    {
      proposer: 'PrOpOsEr draft',
      proposal_name: 'title1 draft',
      title: 'Title draft',
      monthly_budget: '100.0000 EOS',
      duration: 1,
      total_budget: '100.0000 EOS',
      status: 'draft',
      deposit: '100.0000 EOS',
      payments: '0.0000 EOS',
      isDraft: true,
      proposal_json: [
        {
          key: 'created',
          value: Vue.prototype.$moment().valueOf(),
        },
        // {
        //   key: 'img',
        //   value: Image,
        // },
        {
          key: 'category',
          value: 'other',
        },
        {
          key: 'hash',
          value: '1fb57b0e9a9e2a7144b3c4dd33a26d7efa4d5d15e59c6812b90b23dfa94bd280',
        },
        {
          key: 'summary',
          value: 'Description description description description description description.',
        },
        {
          key: 'overview',
          value: `<h1><strong>FAQ</strong></h1><p>This is a FAQ compiled
          from the comments of' + ' DashCentral, DashNexus, the #thunderdome channel
            of Dash Talk Discord and direct communication with community
            members. It will be updated as new questions come up that
            need answers. We will also be in the afterparty following
            today's podcast, so please stop by if want additional clarification o
            n questions you might have.</p><p>&nbsp;</p><p><strong>1.)
            Dash Refill / Mobile Topup is a for profit business and should
            talk to the DIF.</strong></p>`,
        },
        {
          key: 'budget_data',
          value: [
            {
              title: 'Budget title',
              cost: 1000,
              amount: 3,
              unit: 'unit',
              subtotal: 3000,
            },
            {
              title: 'Budget title 2',
              cost: 500,
              amount: 2,
              unit: 'unit',
              subtotal: 1000,
            },
          ],
        },
        {
          key: 'milestones',
          value: [
            {
              title: 'Title 1',
              startsAt: Vue.prototype.$moment().subtract(30, 'days').valueOf(),
              endsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
            },
            {
              title: 'Title 2',
              startsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
              endsAt: Vue.prototype.$moment().add(60, 'days').valueOf(),
            },
          ],
        },
      ],
    },
  ],
  PROPOSAL_ACTIVE: {
    proposer: 'PrOpOsEr',
    proposal_name: 'title1',
    title: 'Title 1',
    monthly_budget: '100.0000 EOS',
    duration: 1,
    total_budget: '100.0000 EOS',
    status: 'active',
    deposit: '100.0000 EOS',
    payments: '0.0000 EOS',
    proposal_json: [
      {
        key: 'created',
        value: Vue.prototype.$moment().valueOf(),
      },
      // {
      //   key: 'img',
      //   value: Image,
      // },
      {
        key: 'category',
        value: 'development',
      },
      {
        key: 'hash',
        value: '1fb57b0e9a9e2a7144b3c4dd33a26d7efa4d5d15e59c6812b90b23dfa94bd280',
      },
      {
        key: 'summary',
        value: 'Description description description description description description.',
      },
      {
        key: 'overview',
        value: `<h1><strong>FAQ</strong></h1><p>This is a FAQ compiled
          from the comments of' + ' DashCentral, DashNexus, the #thunderdome channel
            of Dash Talk Discord and direct communication with community
            members. It will be updated as new questions come up that
            need answers. We will also be in the afterparty following
            today's podcast, so please stop by if want additional clarification o
            n questions you might have.</p><p>&nbsp;</p><p><strong>1.)
            Dash Refill / Mobile Topup is a for profit business and should
            talk to the DIF.</strong></p>`,
      },
      {
        key: 'budget_data',
        value: [
          {
            title: 'Budget title',
            cost: 1000,
            amount: 3,
            unit: 'unit',
            subtotal: 3000,
          },
          {
            title: 'Budget title 2',
            cost: 500,
            amount: 2,
            unit: 'unit',
            subtotal: 1000,
          },
        ],
      },
      {
        key: 'milestones',
        value: [
          {
            title: 'Title 1',
            startsAt: Vue.prototype.$moment().subtract(30, 'days').valueOf(),
            endsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
          },
          {
            title: 'Title 2',
            startsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
            endsAt: Vue.prototype.$moment().add(60, 'days').valueOf(),
          },
        ],
      },
    ],
  },
  PROPOSAL_DRAFT: {
    proposer: 'PrOpOsEr draft',
    proposal_name: 'title1 draft',
    title: 'Title draft',
    monthly_budget: '100.0000 EOS',
    duration: 1,
    total_budget: '100.0000 EOS',
    status: 'draft',
    deposit: '100.0000 EOS',
    payments: '0.0000 EOS',
    isDraft: true,
    proposal_json: [
      {
        key: 'created',
        value: Vue.prototype.$moment().valueOf(),
      },
      // {
      //   key: 'img',
      //   value: Image,
      // },
      {
        key: 'category',
        value: 'other',
      },
      {
        key: 'hash',
        value: '1fb57b0e9a9e2a7144b3c4dd33a26d7efa4d5d15e59c6812b90b23dfa94bd280',
      },
      {
        key: 'summary',
        value: 'Description description description description description description.',
      },
      {
        key: 'overview',
        value: `<h1><strong>FAQ</strong></h1><p>This is a FAQ compiled
          from the comments of' + ' DashCentral, DashNexus, the #thunderdome channel
            of Dash Talk Discord and direct communication with community
            members. It will be updated as new questions come up that
            need answers. We will also be in the afterparty following
            today's podcast, so please stop by if want additional clarification o
            n questions you might have.</p><p>&nbsp;</p><p><strong>1.)
            Dash Refill / Mobile Topup is a for profit business and should
            talk to the DIF.</strong></p>`,
      },
      {
        key: 'budget_data',
        value: [
          {
            title: 'Budget title',
            cost: 1000,
            amount: 3,
            unit: 'unit',
            subtotal: 3000,
          },
          {
            title: 'Budget title 2',
            cost: 500,
            amount: 2,
            unit: 'unit',
            subtotal: 1000,
          },
        ],
      },
      {
        key: 'milestones',
        value: [
          {
            title: 'Title 1',
            startsAt: Vue.prototype.$moment().subtract(30, 'days').valueOf(),
            endsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
          },
          {
            title: 'Title 2',
            startsAt: Vue.prototype.$moment().add(30, 'days').valueOf(),
            endsAt: Vue.prototype.$moment().add(60, 'days').valueOf(),
          },
        ],
      },
    ],
  },
  VOTES: [
    {
      proposal_name: 'title1',
      total_net_votes: 2,
      votes: [
        { key: 'mybp1', value: 'yes' },
        { key: 'mybp2', value: 'no' },
        { key: 'mybp3', value: 'yes' },
        { key: 'mybp4', value: 'abstain' },
        { key: 'mybp5', value: 'yes' },
      ],
    },
  ],
};

// Use the constants as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$constants = constants;
  },
});
