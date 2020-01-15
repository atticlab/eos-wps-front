<template>
  <div>
    <v-container fluid>
      <template
        v-if="votesByGroups"
      >
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
                {{ $t('common.yes') }}:
              </v-card-title>
              <v-card-text
                class="white pt-4
                   text-center
                   text-uppercase
                   word-break
                   font-weight-bold
                   green--text"
              >
                {{ votesByGroups.forVotes }}
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
                {{ $t('common.no') }}:
              </v-card-title>
              <v-card-text
                class="white pt-4
                   text-center
                   text-uppercase
                   word-break
                   font-weight-bold
                   red--text"
              >
                {{ votesByGroups.againstVotes }}
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
                {{ $t('proposalPage.abstain') }}:
              </v-card-title>
              <v-card-text
                class="white pt-4
                   text-center
                   text-uppercase
                   word-break
                   font-weight-bold
                   indigo--text"
              >
                {{ votesByGroups.abstainVotes }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font-weight-bold body-1">
                      {{ $t('proposalPage.voter') }}
                    </th>
                    <th class="text-left font-weight-bold body-1">
                      {{ $t('proposalPage.vote') }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in votesInitial[0].votes"
                    :key="item.name"
                  >
                    <td>
                      <span class="cyan--darken-2--bold body-1">
                        {{ item.key }}
                      </span>
                    </td>
                    <td>
                      <v-icon
                        v-if="item.value === 'yes'"
                        small
                        color="green"
                      >
                        mdi-thumb-up
                      </v-icon>
                      <v-icon
                        v-else-if="item.value === 'no'"
                        small
                        color="red"
                      >
                        mdi-thumb-down
                      </v-icon>
                      <v-icon
                        v-else
                        small
                        color="indigo"
                      >
                        mdi-thumbs-up-down
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </template>

      <div
        v-else
        class="text-center"
      >
        {{ $t('noDataTexts.noVoters') }}
      </div>
    </v-container>
  </div>
</template>

<script>
  export default {
    name: 'Voters',
    props: {
      votesInitial: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    computed: {
      votesByGroups() {
        if ((!this.votesInitial || this.votesInitial.length === 0)
          || (!this.votesInitial[0].votes || this.votesInitial[0].votes.length === 0)) return null;

        const votesObj = {
          forVotes: 0,
          againstVotes: 0,
          abstainVotes: 0,
        };

        this.votesInitial[0].votes.forEach((item) => {
          // eslint-disable-next-line no-plusplus
          if (item.value === 'yes') ++votesObj.forVotes;
          // eslint-disable-next-line no-plusplus
          if (item.value === 'no') ++votesObj.againstVotes;
          // eslint-disable-next-line no-plusplus
          if (item.value === 'abstain') ++votesObj.abstainVotes;
        });

        return votesObj;
      },
    },
  };
</script>

<style scoped>

</style>
