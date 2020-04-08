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
        :disabled="isCreateProposalCommentLoading"
        @click="postComment"
      >
        {{ $t('comments.post') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import createProposalComment from '@/mixins/createProposalComment';

export default {
  name: 'CommentsEditor',
  mixins: [
    validationMixin,
    createProposalComment,
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
    proposalName: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
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
    commentRestructured() {
      if (!this.comment) return [];

      return [
        { key: 'text', value: this.comment },
      ];
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
    async postComment() {
      if (!this.validateAll()) return;

      try {
        this.$emit('is-scatter-active', true);

        await this.$_createProposalComment({
          account: this.account,
          proposalName: this.proposalName,
          comment: this.commentRestructured,
        });

        this.$emit('comment-posted', true);
      } finally {
        this.$emit('is-scatter-active', false);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.comments__editor {
  margin-bottom: 20px;
}
</style>
