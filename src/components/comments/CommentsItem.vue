<template>
  <div class="comments__item">
    <div class="mb-3 d-flex justify-space-between flex-wrap">
      <span class="font-weight-semi-bold primary--text">
        {{ account }}
      </span>
      <span class="ml-2">
        {{ $moment(timestamp).format('YYYY-MM-DD') }}
      </span>
    </div>

    <div
      v-if="!isEditing"
      class="mb-6"
    >
      {{ comment }}
    </div>

    <CommentsEditor
      v-else
      :proposal-name="proposalName"
      :account="account"
      :initial-comment="comment"
      @comment-posted="commentPosted"
      @is-scatter-active="setIsScatterActive"
    />

    <div v-if="isUserOwnerOfComment">
      <v-btn
        v-if="!isEditing"
        small
        :elevation="0"
        class="text-transform-none mr-3"
        color="primary"
        :disabled="isCreateProposalCommentLoading || deleteCommentDialog"
        @click="openEditor"
      >
        {{ $t('proposalPage.edit') }}
      </v-btn>
      <v-btn
        v-else
        small
        :elevation="0"
        class="text-transform-none mr-3"
        color="error"
        :disabled="isScatterActive"
        @click="closeEditor"
      >
        {{ $t('proposalCreationPage.cancel') }}
      </v-btn>
      <v-dialog
        v-model="deleteCommentDialog"
        persistent
        width="400px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :elevation="0"
            class="text-transform-none mr-3"
            color="error"
            :disabled="isEditing || deleteCommentDialog"
            v-on="on"
          >
            {{ $t('proposalCreationPage.delete') }}
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <span class="font-weight-bold">
              {{ $t('comments.sureToDeleteComment') }}
            </span>
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              class="text-transform-none"
              color="error"
              :disabled="isCreateProposalCommentLoading"
              @click="deleteComment"
            >
              {{ $t('proposalCreationPage.delete') }}
            </v-btn>
            <v-btn
              class="text-transform-none"
              color="error"
              :disabled="isCreateProposalCommentLoading"
              @click="closeDeleteDialog"
            >
              {{ $t('proposalCreationPage.cancel') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CommentsEditor from '@/components/comments/CommentsEditor.vue';
import createProposalComment from '@/mixins/createProposalComment';

export default {
  name: 'CommentItem',
  components: {
    CommentsEditor,
  },
  mixins: [createProposalComment],
  props: {
    proposalName: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      default() {
        return this.$t('comments.guest');
      },
    },
    timestamp: {
      type: String,
      default: '',
    },
    comment: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isEditing: false,
      deleteCommentDialog: false,
      isScatterActive: false,
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
    isUserOwnerOfComment() {
      return this.getAccountName === this.account;
    },
  },
  methods: {
    openEditor() {
      this.isEditing = true;
    },
    closeEditor() {
      this.isEditing = false;
    },
    closeDeleteDialog() {
      this.deleteCommentDialog = false;
    },
    setIsScatterActive(val) {
      this.isScatterActive = val;
    },
    commentPosted() {
      this.$emit('comment-posted', true);
      this.closeEditor();
    },
    async deleteComment() {
      try {
        await this.$_createProposalComment({
          account: this.account,
          proposalName: this.proposalName,
          comment: [],
        });

        this.$emit('comment-deleted', true);
      } finally {
        this.closeDeleteDialog();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variables";

.comments__item {
  padding: 20px;
  border-bottom: 1px solid $green;
  transition: background-color 0.3s;

  &:hover {
    background-color: $grey-white;
  }
}
</style>
