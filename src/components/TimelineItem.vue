<template>
  <div class="timeline-item">
    <h4 class="font-weight-semi-bold text-uppercase mb-2">
      {{ title }}
    </h4>
    <div class="fs-12 accent--text">
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
        type: Date,
        required: true,
      },
      endsAt: {
        type: Date,
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
</style>
