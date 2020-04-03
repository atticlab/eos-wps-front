<template>
  <div class="comments__editor">
    <v-textarea
      v-model.trim="comment"
      name="comment"
      filled
      :label="$t('comments.typeComment')"
      :counter="maxStringSize"
      required
      :error-messages="commentErrors"
      @input="validateSingleField"
      @blur="validateSingleField"
    />
    <div class="text-right">
      <v-btn
        small
        :elevation="0"
        class="text-transform-none"
        color="primary"
      >
        {{ $t('comments.post') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  name: 'CommentsEditor',
  mixins: [
    validationMixin,
  ],
  validations() {
    return {
      comment: {
        required,
        maxLength: maxLength(this.maxStringSize),
      },
    };
  },
  props: {
    initialComment: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      comment: '',
      maxStringSize: 20000,
    };
  },
  computed: {
    commentErrors() {
      const errors = [];
      if (!this.$v.comment.$dirty) return errors;

      // eslint-disable-next-line no-unused-expressions
      !this.$v.comment.required && errors.push(this.$t('validationMessages.required'));
      // eslint-disable-next-line no-unused-expressions
      !this.$v.comment.maxLength
      && errors.push(this.$t('validationMessages.maxLength', { numberOfChars: this.maxStringSize }));

      return errors;
    },
  },
  created() {
    this.comment = this.initialComment;
  },
  methods: {
    validateSingleField() {
      this.$v.comment.$touch();
    },
    validateAll() {
      this.$v.$touch();
      return !this.$v.$anyError;
    },
    postComment() {
      if (!this.validateAll()) return;
      console.log('Comment posted');
    },
  },
};
</script>

<style lang="scss" scoped>
.comments__editor {
  margin-bottom: 20px;
}
</style>
