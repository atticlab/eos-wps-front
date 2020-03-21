<template>
  <div>
    <v-container fluid>
      <template
        v-if="votesByGroups"
      >
        <v-row class="mb-10 mt-6 px-3">
          <v-col
            cols="12"
            sm="3"
          >
            <div>
              <div class="accent--text font-weight-semi-bold text-uppercase mb-1">
                {{ $t('common.yes') }}
              </div>
              <div class="primary--text font-weight-semi-bold word-break fs-20">
                {{ votesByGroups.yes }}
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <div>
              <div class="accent--text font-weight-semi-bold text-uppercase mb-1">
                {{ $t('proposalPage.abstain') }}
              </div>
              <div class="font-weight-semi-bold word-break fs-20">
                {{ votesByGroups.abstain }}
              </div>
            </div>
          </v-col>
          <v-col
            cols="12"
            sm="3"
          >
            <div>
              <div class="accent--text font-weight-semi-bold text-uppercase mb-1">
                {{ $t('common.no') }}
              </div>
              <div class="red--text font-weight-semi-bold word-break fs-20">
                {{ votesByGroups.no }}
              </div>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left font-weight-bold body-1 secondary--text">
                      {{ $t('proposalPage.voter') }}
                    </th>
                    <th class="text-left font-weight-bold body-1 secondary--text">
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
                      <span class="body-1 font-weight-semi-bold">
                        {{ item.key }}
                      </span>
                    </td>
                    <td>
                      <v-icon
                        v-if="item.value === 'yes'"
                        size="20"
                        color="primary"
                      >
                        far fa-thumbs-up
                      </v-icon>
                      <v-icon
                        v-else-if="item.value === 'no'"
                        size="20"
                        color="red"
                      >
                        far fa-thumbs-down
                      </v-icon>
                      <v-icon
                        v-else
                        size="20"
                      >
                        fas fa-minus
                      </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </template>

      <v-row v-else>
        <v-col>
          {{ $t('noDataTexts.noVoters') }}
        </v-col>
      </v-row>
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
          yes: 0,
          no: 0,
          abstain: 0,
        };

        this.votesInitial[0].votes.forEach((item) => {
          // eslint-disable-next-line no-plusplus
          if (item.value === 'yes') ++votesObj.yes;
          // eslint-disable-next-line no-plusplus
          if (item.value === 'no') ++votesObj.no;
          // eslint-disable-next-line no-plusplus
          if (item.value === 'abstain') ++votesObj.abstain;
        });

        return votesObj;
      },
    },
  };
</script>

<style scoped>

</style>
