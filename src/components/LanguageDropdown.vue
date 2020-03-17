<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on }">
      <v-btn
        text
        class="font-weight-bold text-transform-none px-lg-6"
        v-on="on"
      >
        <v-icon
          size="12"
          left
          class="mt-1"
        >
          fas fa-chevron-down
        </v-icon>
        <span
          class="icon-circle"
          :style="{ 'background-image': `url(${languageOptions[currentLanguage].flag})`}"
        >
          <!--flag-->
        </span>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(langObj, index) in languageOptions"
        :key="index"
        @click="setCurrentLanguage(langObj.value)"
      >
        <v-list-item-title
          class="body-2 font-weight-medium"
        >
          <span class="d-flex align-center">
            <img
              class="mr-1"
              width="18px"
              :src="langObj.flag"
              :alt="langObj.text"
            >
            {{ langObj.text }}
          </span>
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import en from '@/assets/img/flags/en.svg';
import zh from '@/assets/img/flags/zh.svg';
import ko from '@/assets/img/flags/ko.svg';

export default {
  name: 'LanguageDropdown',
  data() {
    return {
      languageOptions: {
        en: {
          value: 'en',
          text: 'EN',
          flag: en,
        },
        zh: {
          value: 'zh',
          text: 'ZH',
          flag: zh,
        },
        ko: {
          value: 'ko',
          text: 'KO',
          flag: ko,
        },
      },
      currentLanguage: '',
      clientLanguage: navigator.language || 'en',
    };
  },
  computed: {
    clientLanguageCode() {
      return this.clientLanguage.split('-')[0];
    },
  },
  created() {
    if (this.isLocalStorageAvailable()
        && localStorage.getItem('language') !== null) {
      this.currentLanguage = localStorage.getItem('language');
    } else {
      this.currentLanguage = Object.keys(this.languageOptions).includes(this.clientLanguageCode)
        ? this.clientLanguageCode : 'en';
    }

    localStorage.setItem('language', this.currentLanguage);
    this.$root.$i18n.locale = this.currentLanguage;
  },
  methods: {
    isLocalStorageAvailable() {
      try {
          // eslint-disable-next-line no-unused-expressions
        localStorage;
        return true;
      } catch (e) {
        return false;
      }
    },
    setCurrentLanguage(languageCode = 'en') {
      this.currentLanguage = languageCode;
      if (this.isLocalStorageAvailable()) {
        localStorage.setItem('language', languageCode);
      }
      this.$root.$i18n.locale = languageCode;
    },
  },
};
</script>
