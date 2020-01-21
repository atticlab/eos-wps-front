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
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-app-bar-nav-icon
          class="d-flex d-md-none"
          @click.stop="drawer = !drawer"
        />
        <v-app-bar-nav-icon :to="{ name: 'ProposalsActive' }">
          <img
            src="@/assets/img/eos.svg"
            alt="EOS WPS"
            width="40"
          >
        </v-app-bar-nav-icon>
        <v-toolbar-title
          class="ml-2"
        >
          EOS WPS
        </v-toolbar-title>
      </div>

      <v-spacer />

      <v-toolbar-items class="d-none d-md-flex mr-n4">
        <v-btn
          v-if="!getAccountNameWithAuthority"
          text
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
              v-on="on"
            >
              {{ getAccountNameWithAuthority }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              @click="SCATTER_LOGOUT($route.name)"
            >
              <v-list-item-title>
                {{ $t('common.signOut') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-divider vertical />

        <v-btn
          text
          :to="{ name: 'ProposalsActive' }"
        >
          {{ $t('common.activeProposals') }}
        </v-btn>

        <v-divider vertical />

        <v-btn
          v-if="getAccountNameWithAuthority
            && proposals
            && proposals.length !== 0"
          text
          :to="{ name: 'ProposalsDrafts' }"
        >
          {{ $t('common.drafts') }}
        </v-btn>

        <v-divider vertical />

        <v-btn
          v-if="getAccountNameWithAuthority"
          :to="{ name: 'Proposal editor' }"
          text
        >
          {{ $t('common.createProposal') }}
        </v-btn>
      </v-toolbar-items>
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
      color="primary"
    >
      <span class="white--text">&copy; 2019</span>
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
  import getProducers from '@/mixins/getProducers';

  export default {
    name: 'App',
    mixins: [
      getProducers,
    ],
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
        proposals: state => state.userService.proposals,
      }),
      ...mapGetters('userService', {
        getAccountNameWithAuthority: 'getAccountNameWithAuthority',
      }),
    },
    watch: {
      getAccountNameWithAuthority: {
        immediate: true,
        handler(val) {
          if (!val) return;
          this[ActionType.GET_DRAFTS_BY_ACCOUNT_NAME]();
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
        this[ActionType.GET_DRAFTS_BY_ACCOUNT_NAME]();
      });
      this.$eventBus.$on('proposal-deleted', async (val) => {
        if (!val) return;
        await this[ActionType.GET_DRAFTS_BY_ACCOUNT_NAME]();
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
        ActionType.GET_PRODUCERS,
        ActionType.GET_DRAFTS_BY_ACCOUNT_NAME,
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
</style>
