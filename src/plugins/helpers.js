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
    const proposalCopy = proposal;
    let obj = {};

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
  },
  mergeVoteWithProposal(vote, proposal) {
    const proposalCopy = proposal;

    // Each vote object has the total_net_votes field
    // For now only one field is added.
    // Maybe in the future more fields will be needed
    if (vote.proposal_name === proposalCopy.proposal_name) {
      proposalCopy.total_net_votes = vote.total_net_votes;
    }

    return proposalCopy;
  },
  // Build a payload for actions with the smart contract
  buildBaseTransactionPayload(actionName, data) {
    if (!actionName) throw new Error('empty actionName');
    if (!data) throw new Error('empty data');

    return {
      actions: [
        {
          account: Vue.prototype.$constants.CONTRACT_NAME,
          name: actionName,
          authorization: [{
            actor: Vue.prototype.$store.getters['userService/getAccountName'],
            permission: Vue.prototype.$store.getters['userService/getAccountPermission'],
          }],
          data,
        },
      ],
    };
  },
};

// Use the helpers as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$helpers = helpers;
  },
});
