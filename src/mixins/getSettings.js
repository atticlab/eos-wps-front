export default {
  data() {
    return {
      isSettingsLoading: false,
      proposalsSettings: {},
    };
  },
  methods: {
    async $_getSettings() {
      const settingsTable = 'settings';

      try {
        this.isSettingsLoading = true;
        const response = await this.$independentEosApi
                                .getTableRows(
                                  settingsTable,
                                  this.$constants.CONTRACT_NAME,
                                  null,
                                  null,
                                );
        const result = response.rows;
        if (!result || !result.length) {
          return {};
        }

        this.proposalsSettings = this.$helpers.copyDeep(result[0]);
        return this.proposalsSettings;
      } catch (e) {
        console.error('$_getSettings', e);
        return [];
      } finally {
        this.isSettingsLoading = false;
      }
    },
  },
};
