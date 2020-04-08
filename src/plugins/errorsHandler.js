import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import i18n from '../i18n';

const getUserFriendlyErrorMsg = (msg) => {
  if (msg === 'notifications.mustLogin') return i18n.t(msg);

  // Scatter errors
  if (msg === 'signature_rejected') return i18n.t('notifications.cancelledAction');
  // End Scatter errors

  // EOS errors
  if (msg === 'tx_net_usage_exceeded') return i18n.t('notifications.txNetUsage');
  if (msg === 'block_net_usage_exceeded') return i18n.t('notifications.blockNetUsage');
  if (msg === 'tx_cpu_usage_exceeded') return i18n.t('notifications.txCpuExceeded');
  if (msg.includes('exceeded the current CPU')) return i18n.t('notifications.cpuExceeded');
  if (msg === 'block_cpu_usage_exceeded') return i18n.t('notifications.blockCpuExceeded');
  if (msg === 'deadline_exception') return i18n.t('notifications.deadlineException');
  if (msg === 'expired_tx_exception') return i18n.t('notifications.expiredTx');
  if (msg === 'ram_usage_exceeded') return i18n.t('notifications.ramUsage');
  if (msg.includes('insufficient ram')) return i18n.t('notifications.insufficientRam');
  if (msg === 'tx_duplicate') return i18n.t('notifications.txDuplicate');
  if (msg === 'greylist_net_usage_exceeded') return i18n.t('notifications.greyListNetUsage');
  if (msg === 'greylist_cpu_usage_exceeded') return i18n.t('notifications.greyListCpuUsage');
  if (msg === 'unsatisfied_authorization') return i18n.t('notifications.unsatisfiedAuthorization');
  if (msg === 'missing_auth_exception') return i18n.t('notifications.missingAuth');
  if (msg === 'irrelevant_auth_exception') return i18n.t('notifications.irrelevantAuth');
  if (msg === 'insufficient_delay_exception') return i18n.t('notifications.irrelevantAuth');
  if (msg === 'invalid_permission') return i18n.t('notifications.invalidPermission');
  if (msg.includes('overdrawn balance')) return i18n.t('notifications.overdrawnBalance');
  // End EOS errors

  // WPS smart contract errors
  if (msg.includes('[vote] has not been modified')) return i18n.t('notifications.yourVoteHasNotChanged');
  if (msg.includes('draft already exists')) return i18n.t('notifications.proposalNameExists');
  if (msg.includes('invalid symbol name')) return i18n.t('notifications.invalidSymbolName');
  if (msg.includes('cannot transfer to self')) return i18n.t('notifications.transferToSelf');
  if (msg.includes('invalid supply')) return i18n.t('notifications.invalidSupply');
  if (msg.includes('invalid quantity')) return i18n.t('notifications.invalidQuantity');
  if (msg.includes('must retire positive quantity')) return i18n.t('notifications.retirePositiveQuantity');
  if (msg.includes('account does not exist')) return i18n.t('notifications.accountDoesntExist');
  if (msg.includes('must transfer positive quantity')) return i18n.t('notifications.transferPositiveQuantity');
  if (msg.includes('memo has more than 256 bytes')) return i18n.t('notifications.largeMemo');
  if (msg.includes('overdrawn balance')) return i18n.t('notifications.overdrawnBalance');
  if (msg.includes('owner account does not exist')) return i18n.t('notifications.ownerAccountDoesntExist');
  if (msg.includes('symbol precision mismatch')) return i18n.t('notifications.symbolPrecisionMismatch');
  if (msg.includes('invalid CORE_SYMBOL')) return i18n.t('notifications.invalidSymbol');
  if (msg.includes('contract not yet initialized')) return i18n.t('notifications.contractNotInitialized');
  if (msg.includes('settings are missing')) return i18n.t('notifications.settingsAreMissing');
  if (msg.includes('no claimable amount')) return i18n.t('notifications.noClaimableAmount');
  if (msg.includes('already activated')) return i18n.t('notifications.alreadyActivated');
  if (msg.includes('has not been modified')) return i18n.t('notifications.notModified');
  if (msg.includes('already exists')) return i18n.t('notifications.alreadyExists');
  if (msg.includes('deposit account does not exist')) return i18n.t('notifications.depositAccountDoesntExist');
  if (msg.includes('[current_voting_period] is not completed')) return i18n.t('notifications.votingPeriodIsNotCompleted');
  if (msg.includes('insufficient `available_funding`')) return i18n.t('notifications.insufficientAvailableFunding');
  if (msg.includes('should be at least 3 characters in length`')) return i18n.t('notifications.smallName');
  if (msg.includes('cannot exceed 12 characters in length')) return i18n.t('notifications.largeName');
  if (msg.includes('draft does not exists')) return i18n.t('notifications.draftDoesntExists');
  if (msg.includes('cannot `modifybudget` for an active proposal')) return i18n.t('notifications.cannotModifyActiveProposal');
  if (msg.includes('[title] should be less than 1024 characters long')) return i18n.t('notifications.largeTitle');
  if (msg.includes('[title] should be at least 3 characters long')) return i18n.t('notifications.smallTitle');
  if (msg.includes('[duration] must be a minimum of 1 monthly period')) return i18n.t('notifications.smallDuration');
  if (msg.includes('[duration] must not exceed 6 monthly periods')) return i18n.t('notifications.largeDuration');
  if (msg.includes('settings must first be initialized')) return i18n.t('notifications.SettingsNotInitialized');
  if (msg.includes('[monthly_budget] must be a minimum of')) return i18n.t('notifications.tooSmallBudget');
  if (msg.includes('[monthly_budget] cannot be greater than [max_monthly_budget]')) return i18n.t('notifications.tooBigBudget');
  if (msg.includes('[next_voting_period] must be in the past')) return i18n.t('notifications.votingPeriodMustBeInPast');
  if (msg.includes('[current_voting_period] was not modified')) return i18n.t('notifications.votingPeriodWasNotModified');
  if (msg.includes('[voting_interval] must be equal or above 24 hours (86400)')) return i18n.t('notifications.smallVotingPeriod');
  if (msg.includes('[voter] must be registered as a producer')) return i18n.t('notifications.voterMustBeProducer');
  if (msg.includes('must have claimed producer rewards within the last')) return i18n.t('notifications.voterMustHaveClaimedProducerRewards');
  if (msg.includes('[proposal_name] does not exists')) return i18n.t('notifications.proposalNameDoesntExists');
  if (msg.includes('[proposal_name] has not yet started')) return i18n.t('notifications.proposalNameHasNotYetStarted');
  if (msg.includes('[proposal_name] has ended')) return i18n.t('notifications.proposalNameHasEnded');
  if (msg.includes('cannot exceed 100 proposals per single voting period')) return i18n.t('notifications.tooMushProposals');
  if (msg.includes('proposer\'s deposit balance does not meet minimum required amount of')) return i18n.t('notifications.overdrawnDepositBalance');
  if (msg.includes('[start_voting_period] must equal to [current_voting_period] or [next_voting_period]')) return i18n.t('notifications.votingPeriodNotEqualTo');
  if (msg.includes('[account] does not exists')) return i18n.t('notifications.accountDoesntExists');
  if (msg.includes('account has no amount to refund')) return i18n.t('notifications.accountHasntAmountToRefund');
  if (msg.includes('[account] does not contain a balance')) return i18n.t('notifications.accountHasntBalance');
  if (msg.includes('post-balance cannot be less than 0')) return i18n.t('notifications.smallBalance');
  if (msg.includes('[proposal_name] votes does not exist')) return i18n.t('notifications.votesDoesntExist');
  if (msg.includes('[vote] invalid')) return i18n.t('notifications.invalidVote');
  if (msg.includes('[current_voting_period] is completed, any account must execute [complete] ACTION to continue')) return i18n.t('notifications.completeActionRequired');
  if (msg.includes('[voter] must have votes')) return i18n.t('notifications.mustHaveVotes');
  if (msg.includes('cannot activate within')) return i18n.t('notifications.cannotActivateWithin');
  if (msg === 'notifications.forbiddenForBp') return i18n.t(msg);
  if (msg === 'notifications.cannotComment') return i18n.t(msg);
  if (msg.includes('not eligible to comment on')) return i18n.t('notifications.notEligibleCommentator');
  if (msg.includes('cannot be a registered producer')) return i18n.t('notifications.cannotBeRegisteredBp');

  // End WPS smart contract errors

  return i18n.t('notifications.unexpectedError');
};

const errorsHandler = {
  handleError: (err) => {
    const errTitle = i18n.t('notifications.error');
    let errMsg;

    if (typeof err === 'string') {
      try {
        const errParsed = JSON.parse(err);
        errMsg = errParsed.error.details[0].message;
      } catch {} // eslint-disable-line no-empty
    }
    if (typeof err.message === 'string') {
      errMsg = err.message;
    }
    if (err && err.cause && err.cause.json && err.cause.json.error && err.cause.json.error.details
      && err.cause.json.error.details[0] && err.cause.json.error.details[0].message) {
      errMsg = err.cause.json.error.details[0].message;
    }
    if (err.cause && err.cause.type === 'signature_rejected') {
      errMsg = err.cause.type;
    }

    console.log('errMsg', err.cause);
    return VueNotifications.error({ title: errTitle, message: getUserFriendlyErrorMsg(errMsg) });
  },
};

// Use the errors handler as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$errorsHandler = errorsHandler;
  },
});
