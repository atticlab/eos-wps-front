<template>
  <v-data-table
    :headers="budgetHeaders"
    :items="budgetData"
    :hide-default-footer="true"
    class="table"
    :items-per-page="$constants.MAX_TABLE_ITEMS"
  >
    <template v-slot:top>
      <v-toolbar
        v-if="isEditable"
        flat
        color="white"
      >
        <v-dialog
          v-model="dialogEdit"
          max-width="500px"
        >
          <template v-slot:activator="{ on }">
            <v-btn
              v-if="budgetData.length < $constants.MAX_TABLE_ITEMS"
              color="primary"
              dark
              class="ml-auto mb-2"
              v-on="on"
            >
              {{ $t('proposalCreationPage.addNewItem') }}
            </v-btn>
          </template>
          <v-card>
            <!--            <form @submit.prevent="save">-->
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
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
                    <v-text-field
                      v-model.number="editedItem.cost"
                      :label="$t('common.cost')"
                      required
                      type="number"
                      :counter="5"
                      prefix="$"
                      :error-messages="costErrors"
                      @input="validateSingleField('cost')"
                      @blur="validateSingleField('cost')"
                      @keypress="$helpers.isNumberOnly($event)"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model.number="editedItem.amount"
                      :label="$t('common.amount')"
                      required
                      type="number"
                      :counter="4"
                      :error-messages="amountErrors"
                      @input="validateSingleField('amount')"
                      @blur="validateSingleField('amount')"
                      @keypress="$helpers.isNumberDecimalOnly($event)"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-select
                      v-model="editedItem.unit"
                      :label="$t('common.unit')"
                      required
                      :items="$constants.UNITS"
                      :error-messages="unitErrors"
                      @input="validateSingleField('unit')"
                      @blur="validateSingleField('unit')"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <div>
                      <div>{{ $t('common.subtotal') }}</div>
                      <div class="black--text body-1">
                        {{ `$${subtotal}` }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                text
                @click="closeDialogEdit"
              >
                {{ $t('proposalCreationPage.cancel') }}
              </v-btn>
              <v-btn
                color="success"
                text
                type="submit"
                @click="save"
              >
                {{ $t('proposalCreationPage.save') }}
              </v-btn>
            </v-card-actions>
            <!--            </form>-->
          </v-card>
        </v-dialog>

        <v-dialog
          v-model="dialogDelete"
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">
                {{ $t('proposalCreationPage.deleteItem') }}
              </span>
            </v-card-title>

            <v-card-text>
              <p>
                {{ $t('proposalCreationPage.deleteConfirm') }}
              </p>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                color="error"
                text
                @click="closeDialogDelete"
              >
                {{ $t('proposalCreationPage.cancel') }}
              </v-btn>
              <v-btn
                color="error"
                text
                @click="deleteItem"
              >
                {{ $t('proposalCreationPage.delete') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.title="{ item }">
      <span class="body-1">
        {{ item.title }}
      </span>
    </template>
    <template v-slot:item.cost="{ item }">
      <span class="body-1">
        {{ `$${item.cost}` }}
      </span>
    </template>
    <template v-slot:item.amount="{ item }">
      <span class="body-1">
        {{ item.amount }}
      </span>
    </template>
    <template v-slot:item.unit="{ item }">
      <span class="body-1">
        {{ item.unit }}
      </span>
    </template>
    <template v-slot:item.subtotal="{ item }">
      <div class="body-1">
        {{ `$${item.subtotal}` }}
      </div>
      <div class="body-2 font-weight-bold indigo--text">
        {{ `${(item.subtotal / eosPrice).toFixed($constants.EOS_MAX_DIGITS)} EOS` }}
      </div>
    </template>
    <template
      v-slot:item.action="{ item }"
    >
      <v-btn
        text
        icon
        color="primary"
      >
        <v-icon
          small
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        text
        icon
        color="error"
      >
        <v-icon
          small
          @click="openDeleteDialog(item)"
        >
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:footer>
      <div class="d-flex d-sm-none justify-space-between pa-4">
        <div class="title">
          <div>
            {{ $t('proposalPage.total') }}:
          </div>
          <div class="body-1 font-weight-bold indigo--text">
            {{ $t('proposalPage.eosConversionRate') }}:
            {{ `$${eosPrice}` }}
          </div>
        </div>

        <div class="title">
          <div>{{ `$${totalBudget}` }}</div>
          <div class="font-weight-bold indigo--text">
            {{ `${(totalBudgetEos).toFixed($constants.EOS_MAX_DIGITS)} EOS` }}
          </div>
        </div>
      </div>
    </template>

    <template v-slot:body.append>
      <tr class="d-none d-sm-table-row">
        <td class="title">
          <div>
            {{ $t('proposalPage.total') }}:
          </div>
          <div class="body-1 font-weight-bold indigo--text">
            {{ $t('proposalPage.eosConversionRate') }}:
            {{ `$${eosPrice}` }}
          </div>
        </td>
        <td />
        <td />
        <td />
        <td class="title">
          <div>{{ `$${totalBudget}` }}</div>
          <div class="font-weight-bold indigo--text">
            {{ `${(totalBudgetEos).toFixed($constants.EOS_MAX_DIGITS)} EOS` }}
          </div>
        </td>
        <td />
      </tr>
    </template>
    <template v-slot:no-data>
      <div>
        {{ $t('common.noData') }}
      </div>
    </template>
  </v-data-table>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import {
    required, minLength, maxLength, helpers, decimal, minValue, maxValue, numeric,
  } from 'vuelidate/lib/validators';

  export default {
    name: 'BudgetTable',
    mixins: [validationMixin],
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
        cost: {
          required,
          numeric,
          minValue: minValue(0),
          minLength: minLength(1),
          maxLength: maxLength(5),
        },
        amount: {
          required,
          decimal,
          minValue: minValue(0),
          maxValue: maxValue(99.99),
          maxLength: maxLength(4),
        },
        unit: {
          required,
        },
        subtotal: {
          required,
        },
      },
    },
    props: {
      isEditable: {
        type: Boolean,
        default: false,
      },
      budgetDataInit: {
        type: String,
        default: '',
      },
      eosPrice: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        budgetData: [],
        dialogEdit: false,
        dialogDelete: false,
        headers: this.$constants.BUDGET_HEADERS,
        editedIndex: -1,
        editedItem: {
          title: '',
          cost: 100,
          amount: 1,
          unit: 'unit',
          subtotal: 0,
        },
        defaultItem: {
          title: '',
          cost: 100,
          amount: 1,
          unit: 'unit',
          subtotal: 0,
        },
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1
               ? this.$t('proposalCreationPage.addNewItem')
               : this.$t('proposalCreationPage.editItem');
      },
      totalBudget() {
        if (!this.budgetData || this.budgetData.length === 0) return 0;

        return this.budgetData.reduce((acc, budgetItem) => {
          let localAcc = acc;
          localAcc += budgetItem.subtotal;
          return localAcc;
        }, 0);
      },
      totalBudgetEos() {
        return this.totalBudget / this.eosPrice;
      },
      budgetHeaders() {
        if (this.isEditable) return this.headers;
        return this.headers.filter(headerObj => headerObj.text !== 'Actions');
      },
      subtotal() {
        if (!this.editedItem.cost || !this.editedItem.amount) return 0;
        return this.$helpers.roundWithPrecision(this.editedItem.cost * this.editedItem.amount,
          10000);
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
        !this.$v.editedItem.title.latinNoSpecials && errors.push(this.$t('validationMessages.latinNoSpecialsRegex'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.title.notOnlySpaces
        && errors.push(this.$t('validationMessages.notOnlySpaces'));

        return errors;
      },
      costErrors() {
        const errors = [];
        if (!this.$v.editedItem.cost.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.cost.required
        && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.cost.numeric
        && errors.push(this.$t('validationMessages.onlyNumbers'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.cost.minLength
        && errors.push(this.$t('validationMessages.minLength', { numberOfChars: 1 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.cost.maxLength
        && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: 5 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.cost.minValue
        && errors.push(this.$t('validationMessages.minValue', { value: 0 }));

        return errors;
      },
      amountErrors() {
        const errors = [];
        if (!this.$v.editedItem.amount.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.amount.required
        && errors.push(this.$t('validationMessages.required'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.amount.decimal
        && errors.push(this.$t('validationMessages.onlyNumbersDecimals'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.amount.maxValue
        && errors.push(this.$t('validationMessages.twoDigitsOnly'));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.amount.maxLength
        && errors.push(this.$t('validationMessages.minLength', { numberOfChars: 4 }));
        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.amount.minValue
        && errors.push(this.$t('validationMessages.minValue', { value: 0 }));

        return errors;
      },
      unitErrors() {
        const errors = [];
        if (!this.$v.editedItem.unit.$dirty) return errors;

        // eslint-disable-next-line no-unused-expressions
        !this.$v.editedItem.unit.required
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
      // Update budgetData
      budgetData: {
        immediate: true,
        handler(val) {
          this.$emit('budget-data-new', val);
        },
      },
      budgetDataInit: {
        immediate: true,
        handler(val) {
          if (val) {
            this.budgetData = this.$helpers.copyDeep(JSON.parse(val));
          } else {
            this.budgetData = [];
          }
        },
      },
      totalBudget: {
        immediate: true,
        handler(val) {
          this.$emit('total-budget', val);
        },
      },
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.budgetData.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialogEdit = true;
      },
      openDeleteDialog(item) {
        this.editedIndex = this.budgetData.indexOf(item);
        this.dialogDelete = true;
      },
      closeDialogDelete() {
        this.editedIndex = -1;
        this.dialogDelete = false;
      },
      deleteItem() {
        this.budgetData.splice(this.editedIndex, 1);
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
        this.editedItem.subtotal = this.subtotal;
        if (this.editedIndex > -1) {
          Object.assign(this.budgetData[this.editedIndex], this.editedItem);
        } else {
          this.budgetData.push(this.editedItem);
        }
        this.closeDialogEdit();
      },
      validateSingleField(val) {
        this.$v.editedItem[val].$touch();
      },
      validateAll() {
        this.$v.$touch();
        return !this.$v.editedItem.$anyError;
      },
    },
  };
</script>

<style lang="scss" scoped>
</style>
