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
        // primary: '#192867',
        primary: '#309282',
        // secondary: '#2196f3',
        secondary: '#2d2e2c',
        // accent: '#673ab7',
        // error: '#f44336',
        // warning: '#ff9800',
        // info: '#009688',
        // success: '#4caf50',
      },
    },
  },
});
