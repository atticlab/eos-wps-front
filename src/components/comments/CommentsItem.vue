<template>
  <div class="comments__item">
    <div class="font-weight-semi-bold primary-text mb-3">
      {{ author }}
    </div>

    <div
      v-if="!isEditing"
      class="mb-6"
    >
      {{ comment }}
    </div>

    <CommentsEditor
      v-else
      :initial-comment="comment"
    />

    <div>
      <v-btn
        v-if="!isEditing"
        small
        :elevation="0"
        class="text-transform-none mr-3"
        color="primary"
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
        @click="closeEditor"
      >
        {{ $t('proposalCreationPage.cancel') }}
      </v-btn>
      <v-dialog
        v-model="deleteCommentDialog"
        width="400px"
      >
        <template v-slot:activator="{ on }">
          <v-btn
            small
            :elevation="0"
            class="text-transform-none mr-3"
            color="error"
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
              @click="deleteCommentDialog = false"
            >
              {{ $t('proposalCreationPage.delete') }}
            </v-btn>
            <v-btn
              class="text-transform-none"
              color="error"
              @click="deleteCommentDialog = false"
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
import CommentsEditor from '@/components/comments/CommentsEditor.vue';

export default {
  name: 'CommentItem',
  components: {
    CommentsEditor,
  },
  props: {
    author: {
      type: String,
      default() {
        return this.$t('comments.guest');
      },
    },
    comment: {
      type: String,
      default: 'Comment comment comment comment comment comment.',
    },
  },
  data() {
    return {
      isEditing: false,
      deleteCommentDialog: false,
    };
  },
  methods: {
    openEditor() {
      this.isEditing = true;
    },
    closeEditor() {
      this.isEditing = false;
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
