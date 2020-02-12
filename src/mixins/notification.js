export default {
  notifications: {
    showError: {
      type: 'error',
    },
    showSuccess: {
      type: 'success',
    },
  },
  methods: {
    showSuccessMsg(message) {
      this.showSuccess({
        title: this.$t('notifications.success'),
        message,
        timeout: 8000,
      });
    },
    showErrorMsg(message) {
      this.showError({
        title: this.$t('notifications.error'),
        message,
        timeout: 8000,
      });
    },
  },
};
