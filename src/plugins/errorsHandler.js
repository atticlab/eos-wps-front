import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import i18n from '../i18n';

const getUserFriendlyErrorMsg = (msg) => {
  if (msg.includes('insufficient ram')) {
    return i18n.t('notifications.insufficientRam');
  }
  if (msg.includes('insufficient ram')) {
    return i18n.t('notifications.proposalNameExists');
  }
  if (msg === 'signature_rejected') {
    return i18n.t('notifications.cancelledAction');
  }
  if (msg === 'notifications.mustLogin') {
    return i18n.t(msg);
  }

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
