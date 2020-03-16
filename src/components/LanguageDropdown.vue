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
        <span class="icon-circle">
          {{ currentLanguage }}
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
          {{ langObj.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  export default {
    name: 'LanguageDropdown',
    data() {
      return {
        languageOptions: {
          en: {
            value: 'en',
            text: 'EN',
          },
          zh: {
            value: 'zh',
            text: 'ZH',
          },
          ko: {
            value: 'ko',
            text: 'KO',
          },
        },
        currentLanguage: '',
      };
    },
    created() {
      this.currentLanguage = this.isLocalStorageAvailable()
                             ? localStorage.getItem('language')
                             : 'en';
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

<style scoped>

</style>
