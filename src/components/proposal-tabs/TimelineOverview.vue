<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        lg="4"
        class="border-right-divider"
      >
        <h4 class="mb-6">
          {{ $t('proposalPage.scheduled') }}
        </h4>
        <TimelineItem
          v-for="(milestone, index) in milestonesScheduled"
          :key="index"
          :title="milestone.title"
          :starts-at="milestone.startsAt"
          :ends-at="milestone.endsAt"
        />
      </v-col>
      <v-col
        cols="12"
        lg="4"
        class="border-right-divider"
      >
        <h4 class="mb-6">
          {{ $t('proposalPage.inProgress') }}
        </h4>
        <TimelineItem
          v-for="(milestone, index) in milestonesInProgress"
          :key="index"
          :title="milestone.title"
          :starts-at="milestone.startsAt"
          :ends-at="milestone.endsAt"
        />
      </v-col>
      <v-col
        cols="12"
        lg="4"
      >
        <h4 class="mb-6">
          {{ $t('proposalPage.completed') }}
        </h4>
        <TimelineItem
          v-for="(milestone, index) in milestonesCompleted"
          :key="index"
          :title="milestone.title"
          :starts-at="milestone.startsAt"
          :ends-at="milestone.endsAt"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import TimelineItem from '@/components/TimelineItem.vue';

  export default {
    name: 'TimelineOverview',
    components: {
      TimelineItem,
    },
    props: {
      milestones: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        today: this.$moment().valueOf(),
      };
    },
    computed: {
      milestonesCompleted() {
        return this.milestones.filter(milestone => milestone.endsAt < this.today);
      },
      milestonesInProgress() {
        return this.milestones.filter(milestone => milestone.startsAt < this.today
          && milestone.endsAt > this.today);
      },
      milestonesScheduled() {
        return this.milestones.filter(milestone => milestone.startsAt > this.today
          && milestone.endsAt > this.today);
      },
    },
  };
</script>

<style scoped>

</style>
