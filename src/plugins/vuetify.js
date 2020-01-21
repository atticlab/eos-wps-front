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
        primary: '#1b7466',
        secondary: '#2d2e2c',
        accent: '#9ea0a5',
        // error: '#f44336',
        // warning: '#ff9800',
        // info: '#009688',
        // success: '#4caf50',
      },
    },
  },
});
