<template>
  <router-link
    v-if="!isList"
    class="proposal-link d-block"
    :to="{ path: isDraft
      ? `/proposal/draft/${proposalName}`
      : `/proposal/active/${proposalName}` }"
  >
    <v-card
      class="h-100"
      flat
    >
      <div>
        <v-img
          :src="img"
          height="218px"
        />
        <div class="px-4 py-2">
          <div
            class="d-flex justify-space-between flex-column align-start
                       flex-sm-row align-sm-center mb-0"
          >
            <h2 class="fs-20">
              {{ title }}
            </h2>

            <span
              class="primary--text font-weight-bold text-capitalize body-2"
            >
              {{ category }}
            </span>
          </div>

          <div
            class="font-weight-medium body-2"
          >
            by
            <span class="font-weight-bold primary--text">{{ proposer }}</span>
          </div>

          <v-row>
            <v-col
              cols="12"
              sm="6"
              class="pb-0 pb-sm-3"
            >
              <div
                v-if="!isDraft"
                class="font-weight-bold body-2"
              >
                {{ $t('proposalItem.availableBudget') }}:
                <span class="font-weight-medium">{{ availableBudget }}</span>
              </div>

              <div
                v-if="!isDraft"
                class="font-weight-bold body-2"
              >
                {{ $t('proposalItem.status') }}:
                <span
                  :class="{'red--text': statusByVotes === $t('proposalItem.notPassing'),
                           'primary--text': statusByVotes === $t('proposalItem.passing')}"
                >
                  {{ statusByVotes }}
                </span>
              </div>

              <div class="font-weight-bold body-2">
                {{ $t('common.requested') }}:
                <span class="font-weight-medium">{{ budget }}</span>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              class="pt-0 pt-sm-3"
            >
              <div
                v-if="!isDraft"
                class="font-weight-bold body-2"
              >
                {{ $t('common.payments') }}:
                <span class="font-weight-medium">{{ payments }}</span>
              </div>

              <div class="font-weight-bold body-2">
                {{ $t('common.paymentsDuration') }}:
                <span class="font-weight-medium">
                  {{ duration }}
                  {{ $t('common.months') }}
                </span>
              </div>

              <div
                v-if="!isDraft"
                class="font-weight-bold body-2"
              >
                {{ $t('common.votes') }}:
                <span
                  :class="{ 'primary--text': votes > 0,
                            'red--text': votes < 0,
                  }"
                >
                  {{ votes }}
                </span>
              </div>
            </v-col>
          </v-row>

          <div
            v-if="!isList"
            class=" font-weight-medium my-2 body-2"
          >
            {{ summary }}
          </div>
        </div>
      </div>
    </v-card>
  </router-link>

  <router-link
    v-else
    class="proposal-link proposal-link--list d-block"
    :to="{ path: isDraft
      ? `/proposal/draft/${proposalName}`
      : `/proposal/active/${proposalName}` }"
  >
    <td>{{ title }}</td>
    <!--      <td>{{ proposer }}</td>-->
    <td v-if="!isDraft">
      {{ availableBudget }}
    </td>
    <td v-if="!isDraft">
      <span
        v-if="!isDraft"
        :class="{'red--text': statusByVotes === $t('proposalItem.notPassing'),
                 'primary--text': statusByVotes === $t('proposalItem.passing')}"
      >
        {{ statusByVotes }}
      </span>
    </td>
    <td>
      {{ budget }}
    </td>
    <td v-if="!isDraft">
      {{ payments }}
    </td>
    <td>
      {{ duration }}
      {{ $t('common.months') }}
    </td>
    <td v-if="!isDraft">
      <span
        :class="{ 'primary--text': votes > 0,
                  'red--text': votes < 0,
        }"
      >
        {{ votes }}
      </span>
    </td>
  </router-link>
</template>

<script>
  export default {
    name: 'ProposalItem',
    props: {
      proposalName: {
        type: String,
        default: 'No data',
        required: true,
      },
      title: {
        type: String,
        default: 'No data',
      },
      img: {
        type: String,
        default() {
          return this.$constants.PROPOSAL_IMAGE_STUB_URL;
        },
      },
      availableBudget: {
        type: String,
        default: 'No data',
      },
      proposer: {
        type: String,
        default: 'No data',
      },
      category: {
        type: String,
        default: 'No category',
      },
      summary: {
        type: String,
        default() {
          return this.$t('noDataTexts.noSummary');
        },
      },
      budget: {
        type: String,
        default: '0.0000 EOS',
      },
      duration: {
        type: Number,
        default: 3,
      },
      payments: {
        type: String,
        default: '0.0000 EOS',
      },
      statusByVotes: {
        type: String,
        default: 'No data',
      },
      votes: {
        type: Number,
        default: 0,
      },
      isDraft: {
        type: Boolean,
        default: false,
      },
      isList: {
        type: Boolean,
        default: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .proposal-link {
    position: relative;
    transition: all 0.2s;
    text-decoration: none;
    color: initial;
    height: 100%;

    &--list {
      display: table-row !important;
      &:before {
        display: none;
      }
    }

    &:before {
    content: '';
    background-color: $primary;
    bottom: 0;
    left: 0;
    width: 0;
    z-index: 1;
    transition: all 0.15s;
    position: absolute;
    height: 4px;
    }

    &:hover:before {
      width: 100%;
    }

    &:hover {
      transform: translateY(-1%);

      background-color: #eee;
    }
  }

  .h-100 {
    height: 100%;
  }
</style>
