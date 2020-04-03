<template>
  <div class="comments">
    <v-container>
      <v-row class="mt-6">
        <v-col>
          <CommentsEditor />
          <CommentsItem />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CommentsEditor from '@/components/comments/CommentsEditor.vue';
import CommentsItem from '@/components/comments/CommentsItem.vue';

export default {
  name: 'Comments',
  components: {
    CommentsEditor,
    CommentsItem,
  },
};
</script>

<style scoped>

</style>
