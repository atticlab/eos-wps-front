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
        // primary: colors.indigo.darken4,
        primary: '#192867',
        // primary: '#3f51b5',
        // secondary: '#2196f3',
        // accent: '#673ab7',
        // error: '#f44336',
        // warning: '#ff9800',
        // info: '#009688',
        // success: '#4caf50',
      },
    },
  },
});
