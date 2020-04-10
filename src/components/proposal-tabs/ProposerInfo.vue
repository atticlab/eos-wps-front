<template>
  <v-container fluid>
    <v-row :class="{ 'mt-6': proposerDataParsed }">
      <div
        v-if="isProposerLoading"
        class="d-flex justify-center w-100"
      >
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        />
      </div>

      <v-col v-else-if="!proposerDataParsed">
        {{ $t('noDataTexts.noProposeInfo') }}
      </v-col>

      <v-col v-else>
        <div>
          <div
            v-if="proposerDataParsed.name"
            class="mb-6"
          >
            <h4 class="body-1 font-weight-bold">
              {{ $t('personalInfo.name') }}:
            </h4>

            <div>
              {{ proposerDataParsed.name }}
            </div>
          </div>

          <div
            v-if="proposerDataParsed.description"
            class="mb-6"
          >
            <div class="body-1 font-weight-bold">
              {{ $t('personalInfo.description') }}:
            </div>

            <div>
              {{ proposerDataParsed.description }}
            </div>
          </div>

          <div
            v-if="proposerDataParsed.site"
            class="mb-6"
          >
            <div class="body-1 font-weight-bold">
              {{ $t('personalInfo.website') }}:
            </div>

            <div class="mb-6">
              <a
                :href="proposerDataParsed.site"
                rel="noopener noreferrer"
                target="_blank"
              >
                {{ proposerDataParsed.site }}
              </a>
            </div>
          </div>

          <div
            v-if="proposerDataParsed.media"
          >
            <div class="body-1 font-weight-bold">
              {{ $t('personalInfo.socialMedia') }}:
            </div>

            <div>
              <a
                :href="proposerDataParsed.media"
                rel="noopener noreferrer"
                target="_blank"
              >
                {{ proposerDataParsed.media }}
              </a>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  name: 'ProposerInfo',
  props: {
    proposerName: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState('userService', {
      proposer: state => state.proposer,
      isProposerLoading: state => state.isProposerLoading,
    }),
    proposerDataParsed() {
      if (!this.proposer
          || !this.proposer.proposer_json
          || this.proposer.proposer_json.length === 0) return null;

      const result = {};

      this.proposer.proposer_json.forEach((proposerDataObj) => {
        // eslint-disable-next-line no-undef
        result[proposerDataObj.key] = proposerDataObj.value;
      });

      return result;
    },
  },
  created() {
    this[ActionType.REQUEST_PROPOSER](this.proposerName);
  },
  methods: {
    ...mapActions('userService', [
      ActionType.REQUEST_PROPOSER,
    ]),
  },
};
</script>

<style lang="scss" scoped>
  .w-100 {
    width: 100%;
  }
</style>
