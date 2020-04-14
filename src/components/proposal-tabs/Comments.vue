<template>
  <div class="comments">
    <v-container>
      <v-row class="mt-6">
        <v-progress-circular
          v-if="isProposalCommentsLoading"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        />
        <v-col v-else>
          <CommentsEditor
            v-if="!userHasComment && getAccountNameWithAuthority"
            :proposal-name="proposalName"
            :account="account"
            @comment-posted="callAction"
          />
          <CommentsItem
            v-for="(commentObj, index) in proposalComments"
            :key="index"
            :proposal-name="proposalName"
            :account="commentObj.account"
            :timestamp="commentObj.timestamp"
            :comment="commentObj.comment_json[0].value"
            @comment-posted="callAction"
            @comment-deleted="callAction"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';
import CommentsEditor from '@/components/comments/CommentsEditor.vue';
import CommentsItem from '@/components/comments/CommentsItem.vue';

export default {
  name: 'Comments',
  components: {
    CommentsEditor,
    CommentsItem,
  },
  props: {
    proposalName: {
      type: String,
      required: true,
    },
    account: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      proposalComments: state => state.userService.proposalComments,
      isProposalCommentsLoading: state => state.userService.isProposalCommentsLoading,
    }),
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
      getAccountNameWithAuthority: 'getAccountNameWithAuthority',
    }),
    userHasComment() {
      return this.proposalComments.some(comment => comment.account === this.getAccountName);
    },
  },
  created() {
    this.callAction();
  },
  methods: {
    ...mapActions('userService', [
      ActionType.REQUEST_PROPOSAL_COMMENTS_BY_PROPOSAL_NAME,
    ]),
    // the method is needed to call it in the template
    // without it ActionType is unreachable in the template
    callAction() {
      this[ActionType.REQUEST_PROPOSAL_COMMENTS_BY_PROPOSAL_NAME](this.proposalName);
    },
  },
};
</script>

<style scoped>

</style>
