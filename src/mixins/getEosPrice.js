export default {
  data() {
    return {
      isEosPriceLoading: false,
      eosPrice: null,
    };
  },
  methods: {
    async $_getEosPrice() {
      const table = 'orarates';
      const indexPosition = 1;

      try {
        this.isSettingsLoading = true;
        const response = await this.$independentEosApi
                                .getTableRows(
                                  table,
                                  this.$constants.EOS_ORACLE,
                                  this.$constants.EOS_ORACLE,
                                  null,
                                  null,
                                  indexPosition,
                                );
        const result = response.rows;
        if (!result || !result.length) {
          return {};
        }

        const eosPriceObj = result.filter(e => e.rate.search('USD') !== -1);
        if (!eosPriceObj || !eosPriceObj.length) throw new Error('can\'t find eos/usd rate');
        const parsedRate = parseFloat(eosPriceObj[0].rate);
        if (!parsedRate) throw new Error('can\'t parse eos/usd rate');

        this.eosPrice = parsedRate;
        return this.eosPrice;
      } catch (e) {
        console.error('$_getEosPrice', e);
        this.$errorsHandler.handleError(e);
        return {};
      } finally {
        this.isSettingsLoading = false;
      }
    },
  },
};
