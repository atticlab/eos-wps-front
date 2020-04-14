<template>
  <div class="comments__editor">
    <quill-editor
      ref="commentEditor"
      v-model.trim="comment"
      :options="editorOptions"
      class="editor"
      @change="onEditorChange($event)"
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
import Vue from 'vue';
import VueQuillEditor from 'vue-quill-editor';
import createProposalComment from '@/mixins/createProposalComment';
import notification from '@/mixins/notification';

// require styles
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.core.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.snow.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import 'quill/dist/quill.bubble.css';

// mount with global
Vue.use(VueQuillEditor);

export default {
  name: 'CommentsEditor',
  mixins: [
    validationMixin,
    createProposalComment,
    notification,
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
      editorOptions: {
        theme: 'snow',
        placeholder: this.$t('comments.typeComment'),
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],

            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],

            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['link'],
            ['clean'],
          ],
        },
      },
      isCommentEditorEmpty: true,
    };
  },
  computed: {
    commentRestructured() {
      if (!this.comment) return [];

      return [
        { key: 'text', value: this.comment },
      ];
    },
  },
  created() {
    this.comment = this.initialComment;
    this.onEditorChange({ text: this.comment });
  },
  methods: {
    onEditorChange({ text }) {
      this.isCommentEditorEmpty = !text.trim() || text.trim() === '/n';
    },
    validateAll() {
      this.$v.$touch();
      return !this.$v.$anyError;
    },
    async postComment() {
      if (!this.validateAll() || this.isCommentEditorEmpty) {
        this.showErrorMsg(this.$t('notifications.commentRules'));
        return;
      }

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
