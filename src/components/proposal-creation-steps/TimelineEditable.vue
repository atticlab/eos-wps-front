<template>
  <div>
    <v-card
      flat
      class="border-bottom mb-12"
    >
      <div class="mb-12">
        <h2 class="body-1 font-weight-bold mb-3">
          {{ $t('proposalCreationPage.setupTimeline') }}
        </h2>
        <p class="font-weight-medium accent--text timeline-subtitle body-2">
          {{ $t('proposalCreationPage.setupTimelineP') }}
        </p>
      </div>

      <v-data-table
        :headers="headers"
        :items="milestones"
        :hide-default-footer="true"
        :items-per-page="$constants.MAX_TABLE_ITEMS"
        :hide-default-header="$vuetify.breakpoint.xs"
        disable-sort
      >
        <template v-slot:top>
          <v-toolbar
            flat
            color="white"
          >
            <v-dialog
              v-model="dialogEdit"
              max-width="500px"
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  v-if="milestones.length < $constants.MAX_TABLE_ITEMS"
                  class="btn--alt ml-auto mb-2"
                  :elevation="0"
                  :ripple="false"
                  v-on="on"
                >
                  {{ $t('proposalCreationPage.addNewItem') }}
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="font-weight-bold">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.title"
                          :label="$t('common.title')"
                          required
                          :counter="30"
                          :error-messages="titleErrors"
                          @input="validateSingleField('title')"
                          @blur="validateSingleField('title')"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="startsAtMenu"
                          v-model="startsAtMenu"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.startsAt"
                          transition="scale-transition"
                          offset-y
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.startsAt"
                              label="Start"
                              readonly
                              class="mr-3"
                              required
                              :error-messages="startsAtErrors"
                              @input="validateSingleField('startsAt')"
                              @blur="validateSingleField('startsAt')"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.startsAt"
                            no-title
                            scrollable
                            first-day-of-week="1"
                            color="primary"
                            :max="editedItem.endsAt"
                          >
                            <v-spacer />
                            <v-btn
                              :elevation="0"
                              color="primary"
                              class="text-transform-none mb-2"
                              @click="$refs.startsAtMenu.save(editedItem.startsAt)"
                            >
                              {{ $t('common.ok') }}
                            </v-btn>
                            <v-btn
                              :elevation="0"
                              color="error"
                              class="text-transform-none mb-2"
                              @click="startsAtMenu = false"
                            >
                              {{ $t('proposalCreationPage.cancel') }}
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="endsAtMenu"
                          v-model="endsAtMenu"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.endsAt"
                          transition="scale-transition"
                          offset-y
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.endsAt"
                              label="End"
                              readonly
                              required
                              :error-messages="endsAtErrors"
                              @input="validateSingleField('endsAt')"
                              @blur="validateSingleField('endsAt')"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.endsAt"
                            no-title
                            scrollable
                            first-day-of-week="1"
                            color="primary"
                            :min="editedItem.startsAt"
                          >
                            <v-spacer />
                            <v-btn
                              :elevation="0"
                              color="primary"
                              class="text-transform-none mb-2"
                              @click="$refs.endsAtMenu.save(editedItem.endsAt)"
                            >
                              {{ $t('common.ok') }}
                            </v-btn>
                            <v-btn
                              :elevation="0"
                              color="error"
                              class="text-transform-none mb-2"
                              @click="endsAtMenu = false"
                            >
                              {{ $t('proposalCreationPage.cancel') }}
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    class="text-transform-none mb-2"
                    :elevation="0"
                    @click="save"
                  >
                    {{ $t('proposalCreationPage.save') }}
                  </v-btn>
                  <v-btn
                    color="error"
                    class="text-transform-none mb-2"
                    :elevation="0"
                    @click="closeDialogEdit"
                  >
                    {{ $t('proposalCreationPage.cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="font-weight-bold">
                    {{ $t('proposalCreationPage.deleteItem') }}
                  </span>
                </v-card-title>

                <v-card-text>
                  <p class="font-weight-medium">
                    {{ $t('proposalCreationPage.deleteConfirm') }}
                  </p>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="error"
                    class="text-transform-none mb-2"
                    :elevation="0"
                    @click="deleteItem"
                  >
                    {{ $t('proposalCreationPage.delete') }}
                  </v-btn>
                  <v-btn
                    color="error"
                    class="text-transform-none mb-2"
                    :elevation="0"
                    @click="closeDialogDelete"
                  >
                    {{ $t('proposalCreationPage.cancel') }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.title="{ item }">
          <span class="d-block body-1 font-weight-medium">
            {{ item.title }}
          </span>
        </template>
        <template v-slot:item.startsAt="{ item }">
          <span class="body-1 font-weight-medium">
            {{ $moment(item.startsAt).format($constants.DATE_FORMAT) }}
          </span>
        </template>
        <template v-slot:item.endsAt="{ item }">
          <span class="body-1 font-weight-medium">
            {{ $moment(item.endsAt).format($constants.DATE_FORMAT) }}
          </span>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn
            icon
            color="primary"
          >
            <v-icon
              :size="18"
              @click="editItem(item)"
            >
              fas fa-edit
            </v-icon>
          </v-btn>
          <v-btn
            icon
            color="error"
          >
            <v-icon
              :size="18"
              @click="openDeleteDialog(item)"
            >
              far fa-trash-alt
            </v-icon>
          </v-btn>
        </template>
        <template v-slot:no-data>
          <div>
            {{ $t('common.noData') }}
          </div>
        </template>
      </v-data-table>
    </v-card>

    <div class="d-flex justify-center">
      <v-btn
        class="text-transform-none"
        color="primary"
        large
        height="50"
        :disabled="isModifyProposalDraftLoading"
        @click="modify"
      >
        {{ $t('proposalCreationPage.saveDraft') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import { validationMixin } from 'vuelidate';
  import {
 required, minLength, maxLength, helpers,
} from 'vuelidate/lib/validators';
  import modifyProposalDraft from '@/mixins/modifyProposalDraft';
  import notification from '@/mixins/notification';
  import ActionType from '@/store/constants';

  export default {
    name: 'TimelineEditable',
    mixins: [validationMixin, modifyProposalDraft, notification],
    validations: {
      editedItem: {
        title: {
          required,
          minLength: minLength(3),
          maxLength: maxLength(30),
          latinNoSpecials: helpers.regex('latin',
            /^[A-Za-z0-9\s]+$/),
          notOnlySpaces: helpers.regex('notOnlySpaces',
            /^(?!\s+$).+/),
        },
        startsAt: {
          required,
        },
        endsAt: {
          required,
        },
      },
    },
    // props: {
    //   proposalInitial: {
    //     type: Object,
    //     default: () => {},
    //   },
    // },
    data() {
      return {
        startsAtMenu: false,
        endsAtMenu: false,
        dialogEdit: false,
        dialogDelete: false,
        headers: this.$constants.MILESTONES_HEADERS,
        milestones: [],
        editedIndex: -1,
        // proposal: {},
        editedItem: {
          title: '',
          startsAt: '',
          endsAt: '',
        },
        defaultItem: {
          title: '',
          startsAt: '',
          endsAt: '',
        },
      };
    },
    computed: {
      ...mapGetters('userService', {
        getProposalParsed: 'getProposalParsed',
      }),
      proposalId() {
        return this.$route.params.slug ? this.$route.params.slug : '';
      },
      formTitle() {
        return this.editedIndex === -1
               ? this.$t('proposalCreationPage.addNewItem')
               : this.$t('proposalCreationPage.editItem');
      },
      titleErrors() {
        const errors = [];
        if (!this.$v.editedItem.title.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.title.required
        && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.title.minLength
        && errors.push(this.$t('validationMessages.minLength', { numberOfChars: 3 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.title.maxLength
        && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 30 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.title.latinNoSpecials
        && errors.push(this.$t('validationMessages.latinNoSpecialsRegex'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.title.notOnlySpaces
        && errors.push(this.$t('validationMessages.notOnlySpaces'));

        return errors;
      },
      startsAtErrors() {
        const errors = [];
        if (!this.$v.editedItem.startsAt.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.startsAt.required
        && errors.push(this.$t('validationMessages.required'));

        return errors;
      },
      endsAtErrors() {
        const errors = [];
        if (!this.$v.editedItem.endsAt.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.endsAt.required
        && errors.push(this.$t('validationMessages.required'));

        return errors;
      },
    },
    watch: {
      // needed to clear editedIndex on an outside click
      dialogEdit(val) {
        // eslint-disable-next-line no-unused-expressions
        val || this.closeDialogEdit();
      },
      // needed to clear editedIndex on an outside click
      dialogDelete(val) {
        // eslint-disable-next-line no-unused-expressions
        val || this.closeDialogDelete();
      },
      // proposalInitial: {
      //   immediate: true,
      //   handler(val) {
      //     if (this.proposalId) {
      //       this.proposal = this.$helpers.copyDeep(val);
      //     }
      //   },
      // },
      // $route: {
      //   immediate: true,
      //   handler() {
      //     if (this.proposalId) {
      //       this.proposal = this.$helpers.copyDeep(this.proposalInitial);
      //     }
      //   },
      // },
      // proposal: {
      //   immediate: true,
      //   deep: true,
      //   handler(val) {
      //     if (!val || Object.keys(val).length === 0) return;
      //     this.milestones = val.proposal_json.milestones
      //                       ? JSON.parse(val.proposal_json.milestones)
      //                       : [];
      //   },
      // },
      getProposalParsed: {
        immediate: true,
        deep: true,
        handler(val) {
          if (!val || Object.keys(val).length === 0) return;
          this.milestones = val.proposal_json.milestones
                            ? JSON.parse(val.proposal_json.milestones)
                            : [];
        },
      },
    },
    methods: {
      ...mapMutations('userService', [
        ActionType.SET_DRAFT_BY_PROPOSAL_NAME,
      ]),
      validateSingleField(val) {
        this.$v.editedItem[val].$touch();
      },
      validateAll() {
        this.$v.$touch();
        return !this.$v.editedItem.$anyError;
      },
      editItem(item) {
        const itemCopy = item;
        itemCopy.startsAt = this.$moment(item.startsAt).format(this.$constants.DATE_FORMAT);
        itemCopy.endsAt = this.$moment(item.endsAt).format(this.$constants.DATE_FORMAT);
        this.editedIndex = this.milestones.indexOf(itemCopy);
        this.editedItem = Object.assign({}, itemCopy);
        this.dialogEdit = true;
      },
      openDeleteDialog(item) {
        this.editedIndex = this.milestones.indexOf(item);
        this.dialogDelete = true;
      },
      closeDialogDelete() {
        this.editedIndex = -1;
        this.dialogDelete = false;
      },
      deleteItem() {
        this.milestones.splice(this.editedIndex, 1);
        this.closeDialogDelete();
      },
      closeDialogEdit() {
        this.dialogEdit = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },
      save() {
        if (!this.validateAll()) return;
        if (this.editedIndex > -1) {
          Object.assign(this.milestones[this.editedIndex], this.editedItem);
        } else {
          this.milestones.push(this.editedItem);
        }
        this.closeDialogEdit();
      },
      async modify() {
        if (this.milestones.length === 0) {
          this.showErrorMsg(this.$t('notifications.milestonesEmpty'));
          return;
        }

        if (this.milestones.length > this.$constants.MAX_TABLE_ITEMS) {
          this.showErrorMsg(this.$t('notifications.tooManyItems'));
          return;
        }

        const proposalAdditionalInfo = this.$helpers.copyDeep(this.getProposalParsed.proposal_json);

        proposalAdditionalInfo.milestones = JSON.stringify(this.$helpers.copyDeep(this.milestones));
        const proposalAdditionalInfoRestructured = this.$helpers.restructureProposalAdditionalInfo(
          proposalAdditionalInfo,
        );

        const payload = {
          proposal_name: this.getProposalParsed.proposal_name,
          title: this.getProposalParsed.title,
          proposal_json: proposalAdditionalInfoRestructured,
        };

        if (await this.$_modifyProposalDraft(payload)) {
          this.$emit('is-draft-modified', true);
          this.$router.push('/proposals/drafts');
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
  .timeline-subtitle {
    max-width: 728px;
  }
</style>
