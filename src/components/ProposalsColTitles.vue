<template>
  <thead>
    <tr>
      <th class="text-left">
        {{ $t('proposalCreationPage.proposalName') }}
      </th>
      <th class="text-left">
        {{ $t('proposalPage.proposedBy') }}
      </th>
      <th
        v-if="!isDraft"
        class="text-left"
      >
        {{ $t('proposalItem.availableBudget') }}
      </th>
      <th
        v-if="!isDraft"
        class="text-left"
      >
        {{ $t('proposalItem.status') }}
      </th>
      <th class="text-left">
        {{ $t('common.requested') }}
      </th>
      <th
        v-if="!isDraft"
        class="text-left"
      >
        {{ $t('common.payments') }}
      </th>
      <th class="text-left">
        {{ $t('common.duration') }}
      </th>
      <th
        v-if="!isDraft"
        class="text-left"
      >
        {{ $t('common.votes') }}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  name: 'ProposalsColTitles',
  props: {
    isDraft: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import "~@/assets/scss/variables";

  th {
    color: $black !important;
    font-weight: 700;
    font-size: 14px;
  }
</style>
