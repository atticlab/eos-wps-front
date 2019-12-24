<template>
  <router-link
    class="proposal-link mb-6 d-block"
    :to="{ path: isDraft
      ? `/proposal/draft/${proposalName}`
      : `/proposal/active/${proposalName}` }"
  >
    <v-card>
      <div class="proposal-item d-flex">
        <div
          class="proposal-item__left"
          :style="{'background-image': `url(${img})`}"
        >
          <!--  bg-image        -->
        </div>
        <div class="proposal-item__right px-6 py-4">
          <h2 class="title text-center text-sm-left mb-3">
            {{ title }}
          </h2>
          <div class="proposal-item__content body-2">
            <div class="proposal-item__content-left mb-6 mb-md-0 mr-md-2">
              <div class="mb-3">
                <span class="teal--darken-4--bold text-capitalize">{{ category }}</span>
                <v-divider
                  vertical
                  class="mx-2"
                />
                <span class="cyan--darken-2--bold">{{ proposer }}</span>
              </div>
              <p class="proposal-item__desc mb-0">
                {{ summary }}
              </p>
            </div>
            <div
              class="proposal-item__content-right text-center"
            >
              <div
                v-if="!isDraft"
                class="mb-3 mr-sm-2"
              >
                <div class="font-weight-bold mb-3">
                  {{ $t('proposalItem.availableBudget') }}:
                </div>
                <div>{{ availableBudget }}</div>
              </div>
              <div
                v-if="!isDraft"
                class="mb-3 mr-sm-2"
              >
                <div class="mb-3 font-weight-bold">
                  {{ $t('proposalItem.status') }}:
                </div>
                <div
                  :class="{'font-weight-bold text-capitalize': true,
                           'red--text': statusByVotes === $t('proposalStatuses.notPassing'),
                           'green--text': statusByVotes === $t('proposalStatuses.passing')
                  }"
                >
                  {{ statusByVotes }}
                </div>
              </div>
              <div
                class="mb-3 mr-sm-2"
              >
                <div class="mb-3 font-weight-bold">
                  {{ $t('common.requested') }}:
                </div>
                <div>
                  {{ budget }}
                </div>
              </div>
              <div
                v-if="isDraft"
                class="mb-3 mr-sm-2"
              >
                <div class="mb-3 font-weight-bold">
                  {{ $t('common.paymentsDuration') }}:
                </div>
                <div>
                  {{ duration }}
                  {{ $t('common.months') }}
                </div>
              </div>
              <div
                v-if="!isDraft"
                class="mb-3 mr-sm-2"
              >
                <div class="mb-3 font-weight-bold">
                  {{ $t('common.payments') }}:
                </div>
                <div>
                  {{ payments }}
                </div>
              </div>
              <div v-if="!isDraft">
                <div class="mb-3 font-weight-bold">
                  {{ $t('common.votes') }}:
                </div>
                <div
                  class="font-weight-bold indigo--text"
                >
                  {{ votes }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </router-link>
</template>

<script>
  import Vue from 'vue';

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
        default: Vue.prototype.$constants.PROPOSAL_IMAGE_STUB_URL,
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
        default: '',
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
    },
  };
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  .proposal-link {
    position: relative;
    transition: all 0.2s;
    text-decoration: none;

    &:before {
      content: '';
      background-color: $dark-blue;
      top: 0;
      left: 0;
      width: 4px;
      z-index: 1;
      transition: all 0.15s;
      position: absolute;
      height: 0;
    }

    &:hover:before {
      height: 100%;
    }

    &:hover {
      transform: translateX(-1%);
    }
  }

  .proposal-item {
    min-height: 150px;

    &__left {
      min-width: 240px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }

    &__right {
      width: 100%;
    }

    &__content {
      display: flex;
      justify-content: space-between;
    }

    &__content-left {
      flex: 1 0 35%;
    }

    &__content-right {
      display: flex;
      justify-content: space-between;
      flex: 1 0 auto;
    }

    &__desc {
      max-height: 40px;
      overflow: hidden;
      line-height: 1.45;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  @media (max-width: 1263px) {
    .proposal-item {
      flex-direction: column;

      &__left {
        min-height: 150px;
      }
    }
  }

  @media (max-width: 959px) {
    .proposal-item__content {
      flex-direction: column;
    }
  }

  @media (max-width: 599px) {
    .proposal-item__content-left {
      text-align: center;
    }

    .proposal-item__content-right{
      flex-direction: column;
    }
  }
</style>
