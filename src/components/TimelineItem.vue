<template>
  <div
    :class="{
      'timeline-item pa-3 mb-3': true,
      'timeline-item--completed': isCompleted,
      'timeline-item--in-progress': isInProgress,
      'timeline-item--scheduled': isScheduled,
    }"
  >
    <h4>{{ title }}</h4>
    <div class="body-2">
      {{ $moment(startsAt).format($constants.DATE_FORMAT) }} -
      {{ $moment(endsAt).format($constants.DATE_FORMAT) }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TimelineItem',
    props: {
      title: {
        type: String,
        required: true,
      },
      startsAt: {
        type: Number,
        required: true,
      },
      endsAt: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        today: this.$moment().valueOf(),
      };
    },
    computed: {
      isCompleted() {
        return this.endsAt < this.today;
      },
      isInProgress() {
        return this.startsAt < this.today && this.endsAt > this.today;
      },
      isScheduled() {
        return this.startsAt > this.today && this.endsAt > this.today;
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import '~@/assets/scss/variables';

  .timeline-item {
    background-color: $blue-grey--lighten-5;
    border-left: 3px solid $blue-grey;

    &--in-progress {
      background-color: $indigo--lighten-5;
      border-left-color: $dark-blue;
    }

    &--completed {
      background-color: $green--lighten-5;
      border-left-color: $green;
    }
  }
</style>
