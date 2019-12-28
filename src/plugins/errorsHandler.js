import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import i18n from '../i18n';

const getUserFriendlyErrorMsg = (msg) => {
  // Scatter errors
  if (msg === 'signature_rejected') {
    return i18n.t('notifications.cancelledAction');
  }
  // End Scatter errors

  // EOS errors
  if (msg === 'tx_net_usage_exceeded') {
    return i18n.t('notifications.txNetUsage');
  }
  if (msg === 'block_net_usage_exceeded') {
    return i18n.t('notifications.blockNetUsage');
  }
  if (msg === 'tx_cpu_usage_exceeded') {
    return i18n.t('notifications.txCpuExceeded');
  }
  if (msg === 'block_cpu_usage_exceeded') {
    return i18n.t('notifications.blockCpuExceeded');
  }
  if (msg === 'deadline_exception') {
    return i18n.t('notifications.deadlineException');
  }
  if (msg === 'expired_tx_exception') {
    return i18n.t('notifications.expiredTx');
  }
  if (msg === 'ram_usage_exceeded') {
    return i18n.t('notifications.ramUsage');
  }
  if (msg === 'tx_duplicate') {
    return i18n.t('notifications.txDuplicate');
  }
  if (msg === 'greylist_net_usage_exceeded') {
    return i18n.t('notifications.greyListNetUsage');
  }
  if (msg === 'greylist_cpu_usage_exceeded') {
    return i18n.t('notifications.greyListCpuUsage');
  }
  if (msg === 'unsatisfied_authorization') {
    return i18n.t('notifications.unsatisfiedAuthorization');
  }
  if (msg === 'missing_auth_exception') {
    return i18n.t('notifications.missingAuth');
  }
  if (msg === 'irrelevant_auth_exception') {
    return i18n.t('notifications.irrelevantAuth');
  }
  if (msg === 'insufficient_delay_exception') {
    return i18n.t('notifications.irrelevantAuth');
  }
  if (msg === 'invalid_permission') {
    return i18n.t('notifications.invalidPermission');
  }
  // End EOS errors

  // WPS smart contract errors
  if (msg.includes('insufficient ram')) {
    return i18n.t('notifications.insufficientRam');
  }
  if (msg.includes('draft already exists')) {
    return i18n.t('notifications.proposalNameExists');
  }
  if (msg.includes('overdrawn balance')) {
    return i18n.t('notifications.overdrawnBalance');
  }
  if (msg === 'notifications.mustLogin') {
    return i18n.t(msg);
  }
  if (msg.includes('exceeded the current CPU')) {
    return i18n.t('notifications.cpuExceeded');
  }
  // End WPS smart contract errors

  return i18n.t('notifications.unexpectedError');
};

const errorsHandler = {
  handleError: (err) => {
    const errTitle = i18n.t('notifications.error');
    let errMsg;

    if (typeof err === 'string') {
      const errParsed = JSON.parse(err);
      errMsg = errParsed.error.details[0].message;
    }
    if (err.type) {
      errMsg = err.type;
    }
    if (err.name) {
      errMsg = err.name;
    }
    if (err.message === 'notifications.mustLogin') {
      errMsg = err.message;
    }

    return VueNotifications.error({ title: errTitle, message: getUserFriendlyErrorMsg(errMsg) });
  },
};

// Use the errors handler as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$errorsHandler = errorsHandler;
  },
});
