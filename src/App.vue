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
                @click="SCATTER_INIT"
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
          v-if="getAccountNameWithAuthority"
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
          @click="SCATTER_INIT"
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
              @click="SCATTER_LOGOUT"
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
          v-if="getAccountNameWithAuthority"
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

    <v-content>
      <router-view />
    </v-content>

    <v-footer
      color="primary"
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import ActionType from '@/store/constants';

  export default {
    name: 'App',
    data() {
      return {
        drawer: false,
      };
    },
    computed: {
      ...mapGetters('userService', {
        getAccountNameWithAuthority: 'getAccountNameWithAuthority',
      }),
    },
    mounted() {
      this[ActionType.SCATTER_INIT]();
    },
    methods: {
      ...mapActions('userService', [
        ActionType.SCATTER_INIT,
        ActionType.SCATTER_LOGOUT,
      ]),
    },
  };
</script>

<!--<style src='vuetify/dist/vuetify.min.css'>-->
<!--  /* global styles */-->
<!--</style>-->

<style lang="scss">
  @import '~@/assets/scss/main';
</style>
