<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="true"
      app
      width="100%"
    >
      <v-list-item class="drawer-header">
        <v-list-item-content>
          <v-list-item-title class="title">
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex align-center">
                <v-app-bar-nav-icon
                  :to="{ name: 'ProposalsActive' }"
                  color="primary"
                  class="w-100"
                  height="48"
                  width="48"
                  large
                >
                  <img
                    src="@/assets/img/eos.svg"
                    alt="EOS WPS"
                    width="40"
                  >
                </v-app-bar-nav-icon>

                <v-toolbar-title
                  class="ml-2 font-weight-bold"
                >
                  EOS
                  <span class="primary--text">
                    WPS
                  </span>
                </v-toolbar-title>
              </div>

              <v-btn
                color="error"
                text
                icon
                @click.stop="drawer = false"
              >
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </div>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <div class="list-wrapper">
        <v-list
          nav
          class="text-center"
          dense
        >
          <v-list-item :to="{ name: 'About' }">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold body-2">
                {{ $t('common.about') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'User guide' }">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold body-2">
                {{ $t('userGuide.guide') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="{ name: 'ProposalsActive' }">
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold body-2">
                {{ $t('common.activeProposals') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="getAccountNameWithAuthority && draftProposals && draftProposals.length !== 0"
            :to="{ name: 'ProposalsDrafts' }"
          >
            <v-list-item-content>
              <v-list-item-title class="font-weight-bold body-2">
                {{ $t('common.drafts') }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <LanguageDropdown />
            </v-list-item-content>
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content class="pt-0">
              <v-list-item-title class="text-center">
                <v-btn
                  v-if="!getAccountNameWithAuthority"
                  large
                  height="50"
                  color="primary"
                  class="text-transform-none mt-8"
                  :disabled="isScatterLoginLoading"
                  @click="SCATTER_LOGIN"
                >
                  {{ $t('common.signInWithScatter') }}
                </v-btn>
                <v-menu
                  v-else
                  offset-y
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      text
                      height="40"
                      block
                      class="font-weight-bold text-transform-none body-2 acc"
                      v-on="on"
                    >
                      <v-icon
                        size="12"
                        left
                        class="mt-1"
                      >
                        fas fa-chevron-down
                      </v-icon>

                      {{ getAccountNameWithAuthority }}
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item
                      @click="SCATTER_LOGOUT"
                    >
                      <v-list-item-title class="body-2 font-weight-medium">
                        {{ $t('common.signOut') }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-if="getAccountNameWithAuthority"
            class="mt-8"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-btn
                  color="primary"
                  class="text-transform-none"
                  height="50"
                  :to="{ name: 'Proposal editor' }"
                >
                  {{ $t('common.createProposal') }}
                </v-btn>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <v-app-bar
      app
      height="80"
      class="border fs-14"
      :elevate-on-scroll="true"
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          :to="{ name: 'ProposalsActive' }"
          color="primary"
          class="w-100"
        >
          <img
            src="@/assets/img/eos.svg"
            alt="EOS WPS"
            width="40"
          >
        </v-app-bar-nav-icon>
        <v-toolbar-title
          class="ml-2 font-weight-bold"
        >
          EOS
          <span class="primary--text">
            WPS
          </span>
        </v-toolbar-title>
      </div>

      <v-spacer />

      <v-toolbar-items class="d-none d-md-flex">
        <v-btn
          text
          :to="{ name: 'About' }"
          class="font-weight-bold text-transform-none px-lg-6"
          exact-active-class="custom-before-underline"
        >
          {{ $t('common.about') }}
        </v-btn>

        <v-btn
          text
          :to="{ name: 'User guide' }"
          class="font-weight-bold text-transform-none px-lg-6"
          exact-active-class="custom-before-underline"
        >
          {{ $t('userGuide.guide') }}
        </v-btn>

        <v-btn
          text
          :to="{ name: 'ProposalsActive' }"
          class="font-weight-bold text-transform-none px-lg-6"
          exact-active-class="custom-before-underline"
        >
          {{ $t('common.activeProposals') }}
        </v-btn>

        <v-btn
          v-if="getAccountNameWithAuthority
            && draftProposals
            && draftProposals.length !== 0"
          text
          :to="{ name: 'ProposalsDrafts' }"
          class="font-weight-bold text-transform-none px-lg-6"
          exact-active-class="custom-before-underline"
        >
          {{ $t('common.drafts') }}
        </v-btn>

        <v-divider vertical />

        <v-menu
          v-if="getAccountNameWithAuthority"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              text
              class="font-weight-bold text-transform-none px-lg-6"
              v-on="on"
            >
              <v-icon
                size="12"
                left
                class="mt-1"
              >
                fas fa-chevron-down
              </v-icon>

              <span class="d-none d-lg-block">
                {{ getAccountNameWithAuthority }}
              </span>

              <span class="icon-circle">
                {{ getAccountNameWithAuthority.split('')[0] }}
              </span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="SCATTER_LOGOUT()"
            >
              <v-list-item-title class="font-weight-medium">
                {{ $t('common.signOut') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <LanguageDropdown />
      </v-toolbar-items>

      <v-btn
        v-if="!getAccountNameWithAuthority"
        color="primary"
        class="d-none d-md-flex ml-4 text-transform-none"
        :elevation="0"
        :disabled="isScatterLoginLoading"
        :large="true"
        height="50"
        @click="SCATTER_LOGIN"
      >
        {{ $t('common.signInWithScatter') }}
      </v-btn>

      <v-btn
        v-else
        :to="{ name: 'Proposal editor' }"
        color="primary"
        :elevation="0"
        class="d-none d-md-flex text-transform-none"
        :large="true"
        height="50"
      >
        {{ $t('common.createProposal') }}
      </v-btn>

      <v-app-bar-nav-icon
        class="d-flex d-md-none flex-stretch"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>

    <v-content>
      <div class="d-flex justify-end pa-4 voting-period-counter">
        <i18n
          path="proposalPage.currentVotingPeriodEndsIn"
          tag="p"
          class="red--text font-weight-medium mb-0"
        >
          <template #daysTillEnd>
            {{ getDaysBeforeCurrentVotingPeriodExpires }}
          </template>
        </i18n>
      </div>

      <v-overlay v-if="isScatterLoginLoading">
        <v-alert
          transition="scale-transition"
          border-top
          color="primary"
          :class="{ 'alert-scatter': true }"
        >
          {{ $t('notifications.scatterInit') }}
        </v-alert>

        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        />
      </v-overlay>

      <router-view v-else />
    </v-content>

    <v-footer
      color="white secondary--text body-2"
      height="160"
      padless
    >
      <v-card
        width="100%"
        tile
        flat
        class="text-center"
      >
        <v-card-text>
          <div class="font-weight-bold mb-2">
            {{ $t('footer.visitRepos') }}
          </div>
          <div class="d-flex justify-center">
            <div class="mr-4">
              <a
                href="https://github.com/EOS-Nation/eosio-wps"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('footer.smartContractRepo') }}
              </a>
            </div>
            <div>
              <a
                href="https://github.com/atticlab/eos-wps-front"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('footer.uiRepo') }}
              </a>
            </div>
          </div>
        </v-card-text>

        <v-divider class="v-divider--custom" />

        <v-card-text>
          <span class="font-weight-bold">© {{ thisYear }} EOS WPS. All Rights Reserved</span>
        </v-card-text>
      </v-card>
    </v-footer>

    <v-snackbar
      v-if="!isScatterLoginLoading"
      v-model="isSnackbarOpen"
      color="primary"
      :timeout="30000"
      :top="true"
      :multi-line="true"
      class="text-center"
    >
      {{ $t('notifications.scatterIsNotConnected') }}
      <v-btn
        color="red"
        text
        @click="SET_IS_SCATTER_NOT_CONNECTED(false)"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  import {
 mapState, mapActions, mapGetters, mapMutations,
} from 'vuex';
  import ActionType from '@/store/constants';
  import getProducers from '@/mixins/getProducers';
  import LanguageDropdown from '@/components/LanguageDropdown.vue';

  export default {
    name: 'App',
    components: { LanguageDropdown },
    mixins: [
      getProducers,
    ],
    data() {
      return {
        drawer: false,
        isSnackbarOpen: true,
      };
    },
    computed: {
      ...mapState({
        isScatterLoginLoading: state => state.userService.isScatterLoginLoading,
        isScatterNotConnected: state => state.userService.isScatterNotConnected,
        routeTo: state => state.userService.routeTo,
        draftProposals: state => state.userService.draftProposals,
        proposalState: state => state.userService.proposalState,
      }),
      ...mapGetters('userService', {
        getAccountNameWithAuthority: 'getAccountNameWithAuthority',
        getDaysBeforeCurrentVotingPeriodExpires: 'getDaysBeforeCurrentVotingPeriodExpires',
      }),
      thisYear() {
        const now = new Date();
        return now.getFullYear();
      },
    },
    watch: {
      getAccountNameWithAuthority: {
        immediate: true,
        handler(val) {
          if (!val) return;
          this[ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME]();
          if (this.routeTo && this.routeTo.meta.requiresAuth) {
            this.$router.push({ path: this.routeTo.path });
          }
        },
      },
      isScatterNotConnected: {
        immediate: true,
        handler(val) {
          this.isSnackbarOpen = val;
        },
      },
    },
    async created() {
      this[ActionType.SCATTER_INIT]();
      await this[ActionType.REQUEST_STATE]();
      this.$_getProducers();
      this.$eventBus.$on('proposal-created', (val) => {
        if (!val) return;
        this[ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME]();
      });
      this.$eventBus.$on('proposal-deleted', async (val) => {
        if (!val) return;
        await this[ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME]();
        if (!this.draftProposals || this.draftProposals.length === 0) {
          this.$router.push({ name: 'ProposalsActive' });
        }
      });
    },
    methods: {
      ...mapMutations('userService', [
        ActionType.SET_IS_SCATTER_NOT_CONNECTED,
      ]),
      ...mapActions('userService', [
        ActionType.SCATTER_INIT,
        ActionType.SCATTER_LOGOUT,
        ActionType.SCATTER_LOGIN,
        ActionType.DEFINE_ROUTE_TO,
        ActionType.REQUEST_PRODUCERS,
        ActionType.REQUEST_DRAFTS_BY_ACCOUNT_NAME,
        ActionType.REQUEST_STATE,
      ]),
    },
  };
</script>

<!--<style src='vuetify/dist/vuetify.min.css'>-->
<!--  /* global styles */-->
<!--</style>-->

<style lang="scss">
  @import '~@/assets/scss/main';

  .alert-scatter {
    width: 100%;
    text-align: center;
    position: fixed !important;
    z-index: 2;
    left: 0;
    top: 0;
  }

  .v-app-bar {
    border-bottom: 1px solid $grey-white !important;
  }

  .icon-circle {
    background-color: $primary;
    border-radius: 50%;
    color: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 5px;
    text-transform: uppercase;
    font-weight: 500;
    height: 34px;
    width: 34px;
  }

  .drawer-header {
    height: 80px;

    .v-list-item__content {
      height: 80px;
    }
  }

  .list-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100vh - 80px);
    min-height: 266px;
  }

  .voting-period-counter {
    background-color: $white;
    border-bottom: 1px solid $grey-white !important;
  }
</style>
