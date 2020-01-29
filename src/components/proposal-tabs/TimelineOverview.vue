<template>
  <v-container fluid>
    <template
      v-if="milestonesRaw !== $t('noDataTexts.noTimeline')"
    >
      <v-row class="mt-6">
        <v-col
          cols="12"
          sm="4"
        >
          <h4 class="accent--text text-uppercase mb-8 font-weight-semi-bold body-2">
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
          sm="4"
        >
          <h4 class="accent--text text-uppercase mb-8 font-weight-semi-bold">
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
          sm="4"
        >
          <h4 class="accent--text text-uppercase mb-8 font-weight-semi-bold">
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
    </template>
    <v-row v-else>
      <v-col>
        {{ milestonesRaw }}
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
      milestonesRaw: {
        type: String,
        default() {
          return this.$t('noDataTexts.noTimeline');
        },
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
      milestones() {
        let parsed = [];
        try {
          parsed = JSON.parse(this.milestonesRaw);
        } catch (e) {
          // TODO: handle err
          console.error('cant parse milestonesRaw');
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const p of parsed) {
          p.endsAt = new Date(p.endsAt);
          p.startsAt = new Date(p.startsAt);
        }
        return parsed;
      },
    },
  };
</script>

<style scoped>

</style>
