<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :temporary="true"
      app
    >
      <v-list dense>
        <v-list-item button>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                v-if="!getAccountNameWithAuthority"
                color="primary"
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
                    color="primary"
                    v-on="on"
                  >
                    {{ getAccountNameWithAuthority }}
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item
                    @click="SCATTER_LOGOUT"
                  >
                    <v-list-item-title>
                      {{ $t('common.signOut') }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{ name: 'ProposalsActive' }">
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('common.activeProposals') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="getAccountNameWithAuthority && proposals && proposals.length !== 0"
          :to="{ name: 'ProposalsDrafts' }"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('common.drafts') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-if="getAccountNameWithAuthority"
          :to="{ name: 'Proposal editor' }"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('common.createProposal') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      height="80"
      class="border"
      :elevate-on-scroll="true"
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          class="d-flex d-md-none"
          @click.stop="drawer = !drawer"
        />
        <v-app-bar-nav-icon
          :to="{ name: 'ProposalsActive' }"
          color="primary"
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
          :to="{ name: 'ProposalsActive' }"
          class="font-weight-bold fs-13 text-transform-none"
        >
          {{ $t('common.activeProposals') }}
        </v-btn>

        <v-btn
          v-if="getAccountNameWithAuthority
            && proposals
            && proposals.length !== 0"
          text
          :to="{ name: 'ProposalsDrafts' }"
          class="font-weight-bold fs-13 text-transform-none"
        >
          {{ $t('common.drafts') }}
        </v-btn>

        <v-divider vertical />

        <v-btn
          v-if="!getAccountNameWithAuthority"
          text
          class="font-weight-bold fs-13 text-transform-none"
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
              class="font-weight-bold fs-13 text-transform-none"
              v-on="on"
            >
              {{ getAccountNameWithAuthority }}

              <span class="icon-circle">
                {{ getAccountNameWithAuthority.split('')[0] }}
              </span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="SCATTER_LOGOUT($route.name)"
            >
              <v-list-item-title class="fs-13 font-weight-medium">
                {{ $t('common.signOut') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>

      <v-btn
        v-if="getAccountNameWithAuthority"
        :to="{ name: 'Proposal editor' }"
        color="primary"
        class="d-none d-md-flex font-weight-bold fs-13 text-transform-none"
        :large="true"
        height="50"
      >
        {{ $t('common.createProposal') }}
      </v-btn>
    </v-app-bar>

    <v-overlay v-if="isScatterLoginLoading">
      <v-alert
        transition="scale-transition"
        border-top
        type="info"
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

    <v-content v-else>
      <router-view />
    </v-content>

    <v-footer
      color="white secondary--text"
      height="80"
    >
      <span class="font-weight-bold">© {{ thisYear }} EOS WPS. All Rights Reserved</span>
    </v-footer>

    <v-snackbar
      v-if="!isScatterLoginLoading"
      v-model="isScatterNotConnected"
      color="info"
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
  import getDraftsByAccountName from '@/mixins/getDraftsByAccountName';
  import getProducers from '@/mixins/getProducers';

  export default {
    name: 'App',
    mixins: [getDraftsByAccountName, getProducers],
    data() {
      return {
        drawer: false,
      };
    },
    computed: {
      ...mapState({
        isScatterLoginLoading: state => state.userService.isScatterLoginLoading,
        isScatterNotConnected: state => state.userService.isScatterNotConnected,
        routeTo: state => state.userService.routeTo,
      }),
      ...mapGetters('userService', {
        getAccountNameWithAuthority: 'getAccountNameWithAuthority',
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
          this.$_getDraftProposalByAccountName();
          if (this.routeTo && this.routeTo.meta.requiresAuth) {
            this.$router.push({ path: this.routeTo.path });
          }
        },
      },
    },
    created() {
      this[ActionType.SCATTER_INIT]();
      this.$_getProducers();
      this.$eventBus.$on('proposal-created', (val) => {
        if (!val) return;
        this.$_getDraftProposalByAccountName();
      });
      this.$eventBus.$on('proposal-deleted', async (val) => {
        if (!val) return;
        await this.$_getDraftProposalByAccountName();
        if (!this.proposals || this.proposals.length === 0) {
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
    /*margin-top: 64px;*/
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
</style>
