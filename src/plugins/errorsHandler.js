import Vue from 'vue';
import VueNotifications from 'vue-notifications';
import i18n from '../i18n';

const errors = {
  '"assertion failure with message: [proposal_name] draft already exists, try using `modifydraft` or `canceldraft` or `modifybudget`"': i18n.t('notifications.proposalNameExists'),
  signature_rejected: i18n.t('notifications.cancelledAction'),
  unexpected: i18n.t('notifications.unexpectedError'),
};

const errorsHandler = {
  handleError: (err) => {
    const errTitle = i18n.t('notifications.error');
    let errMsg;

    if (err.response) {
      errMsg = err.response.details[0].message;
    }
    if (err.type) {
      errMsg = err.type;
    }

    if (errMsg in errors) {
      return VueNotifications.error({ title: errTitle, message: errors[errMsg] });
    }
    return VueNotifications.error({ title: errTitle, message: errors.unexpected });
  },
};

// Use the errors handler as a plugin globally
Vue.use({
  install() {
    Vue.prototype.$errorsHandler = errorsHandler;
  },
});
