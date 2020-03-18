import Vue from 'vue';

const helpers = {
  roundWithPrecision(amount, precision) {
    return Math.round(+amount * +precision) / +precision;
  },
  // The function doesn't allow typing anything except numbers
  isNumberOnly(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    // && charCode !== 46 - allows one dot
    if (charCode !== 118 && (charCode > 31 && (charCode < 48 || charCode > 57))) {
      e.preventDefault();
    } else if ((charCode === 46) && (e.target.value.indexOf('.') >= 0 || e.target.value === '')) {
      e.preventDefault();
    } else {
      return true;
    }
    return false;
  },
  isNumberDecimalOnly(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode !== 118
      && (charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
      e.preventDefault();
    } else if ((charCode === 46) && (e.target.value.indexOf('.') >= 0 || e.target.value === '')) {
      e.preventDefault();
    } else {
      return true;
    }
    return false;
  },
  // The function for transforming the array of additional data
  // in a proposal object ot an object
  parseProposal(proposal) {
    const proposalCopy = this.copyDeep(proposal);
    let obj = {};

    if (!(proposal && proposal.proposal_json)) return proposal;

    // proposal_json is an array of objects for additional data in a proposal object
    // Each object has fields "key" and "value"
    proposalCopy.proposal_json.forEach((record) => {
      obj[record.key] = record.value;
    });
    proposalCopy.proposal_json = obj;
    obj = {};
    return proposalCopy;
  },
  // The function deep copying objects or arrays
  copyDeep(iterable) {
    // Make a deep copy
    // as otherwise internal arrays refrence to the original data
    // Only for simple values. no Date, Blob, images or files!!!
    // May be changed to a more universal custom function in the future
    return JSON.parse(JSON.stringify(iterable));
    // return iterable ? JSON.parse(JSON.stringify(iterable)) : '';
  },
  // Build a payload for actions with the smart contract
  buildBaseTransactionPayload(payloadArr) {
    if (!payloadArr || !Array.isArray(payloadArr) || !payloadArr.length) throw new Error('empty payload');
    const actions = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const p of payloadArr) {
      if (!p.actionName) throw new Error('empty actionName');
      if (!p.data) throw new Error('empty data');
      actions.push({
        account: p.account || Vue.prototype.$constants.CONTRACT_NAME,
        name: p.actionName,
        authorization: [{
          actor: Vue.prototype.$store.getters['userService/getAccountName'],
          permission: Vue.prototype.$store.getters['userService/getAccountPermission'],
        }],
        data: p.data,
      });
    }
    return {
      actions,
    };
  },
  restructureProposalAdditionalInfo(additionalInfo) {
    const additionalInfoCopy = this.copyDeep(additionalInfo);

    return Object.entries(additionalInfoCopy)
                 .map(entry => ({ key: entry[0], value: entry[1] }));
  },
};

// Use the helpers as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$helpers = helpers;
  },
});
