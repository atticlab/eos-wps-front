<template>
  <v-container fluid>
    <v-row
      v-if="true"
      class="mt-6"
    >
      <div
        v-if="false"
        class="d-flex justify-center w-100"
      >
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        />
      </div>

      <v-col v-else>
        <div>
          <div class="mb-6">
            <h4 class="body-1 font-weight-bold">
              Name:
            </h4>

            <div>
              John Doe
            </div>
          </div>

          <div class="mb-6">
            <div class="body-1 font-weight-bold">
              About proposer:
            </div>

            <div>
              John Doe is a very nice man
            </div>
          </div>

          <div class="mb-6">
            <div class="body-1 font-weight-bold">
              Website:
            </div>

            <div class="mb-6">
              <a
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Website
              </a>
            </div>
          </div>

          <div>
            <div class="body-1 font-weight-bold">
              Contacts:
            </div>

            <div>
              <a
                href="#"
                rel="noopener noreferrer"
                target="_blank"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        {{ $t('noDataTexts.noProposeInfo') }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'ProposerInfo',
};
</script>

<style lang="scss" scoped>
  /*.w-100 {*/
  /*  width: 100%;*/
  /*}*/
</style>
