// eslint-disable-next-line import/no-extraneous-dependencies
import '@fortawesome/fontawesome-free/css/all.css'; // Ensure you are using css-loader
import Vue from 'vue';
import Vuetify, {
 VIcon, VBtn, VSlider, VSpacer,
} from 'vuetify/lib';
// import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify, {
  components: {
    VIcon, VBtn, VSlider, VSpacer,
  },
});

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#208A78',
        secondary: '#2d2e2c',
        accent: '#9ea0a5',
        error: '#d35847',
        red: '#d35847',
        green: '#208A78',
        // warning: '#ff9800',
        // info: '#009688',
        // success: '#4caf50',
      },
    },
  },
});
