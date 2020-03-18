<template>
  <v-container class="pb-12 container--custom">
    <h1 class="fs-50">
      {{ $t('userGuide.submittingProposal') }}
    </h1>
    <h3 class="fs-30 font-weight-semi-bold mb-8">
      {{ $t('userGuide.eosWpsUserGuide') }}
    </h3>

    <v-divider class="v-divider--custom mt-8 mb-12" />

    <v-card
      flat
      class="secondary--text py-7 px-4 px-sm-9 py-xm-12 mb-12"
    >
      <div class="sections-wrapper">
        <section class="mb-12">
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.signInSection.title') }}
          </h2>

          <ol class="body-2 font-weight-medium">
            <li class="ol-block">
              <i18n path="userGuide.signInSection.li1">
                <template #url>
                  <a
                    href="http://eoswps.io"
                    target="_blank"
                  >
                    https://eoswps.io
                  </a>
                </template>
              </i18n>
            </li>

            <li class="ol-block">
              {{ $t('userGuide.signInSection.li2.title') }}
              <ol type="a">
                <li>{{ $t('userGuide.signInSection.li2.a') }}</li>
                <li>{{ $t('userGuide.signInSection.li2.b') }}</li>
              </ol>
            </li>

            <li class="ol-block">
              {{ $t('userGuide.signInSection.li3') }}
            </li>
          </ol>
        </section>

        <section class="mb-12">
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.setupProposalSection.title') }}
          </h2>

          <div class="mb-9">
            <h3 class="fs-30 font-weight-semi-bold mb-6">
              {{ $t('userGuide.setupProposalSection.subSection1.title') }}
            </h3>

            <ol class="body-2 font-weight-medium">
              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection1.li1.title">
                  <template #proposalName>
                    <span class="font-weight-bold">
                      {{ $t('proposalCreationPage.proposalName') }}
                    </span>
                  </template>
                </i18n>

                <ul>
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li1.subLi1') }}
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.containMin', { num: 3 }) }}
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.containMax', { num: 12 }) }}
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li1.subLi4') }}
                  </li>
                </ul>
              </li>

              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection1.li2.title">
                  <template #proposalTitle>
                    <span class="font-weight-bold">
                      {{ $t('proposalCreationPage.proposalTitle') }}
                    </span>
                  </template>
                </i18n>

                <ul>
                  <li>
                    {{ $t('userGuide.setupProposalSection.containMin', { num: 3 }) }}
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.containMax', { num: 60 }) }}
                  </li>
                </ul>
              </li>

              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection1.li3.title">
                  <template #proposalSummary>
                    <span class="font-weight-bold">
                      {{ $t('proposalCreationPage.proposalSummary') }}
                    </span>
                  </template>
                </i18n>

                <ul>
                  <li>
                    {{ $t('userGuide.setupProposalSection.containMin', { num: 3 }) }}
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.containMax', { num: 150 }) }}
                  </li>
                </ul>
              </li>

              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection1.li4.title">
                  <template #proposalCategory>
                    <span class="font-weight-bold">
                      {{ $t('proposalCreationPage.proposalCategory') }}
                    </span>
                  </template>
                </i18n>


                <ol type="a">
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li4.a') }}
                    <ul>
                      <li
                        v-for="(item, index) in $constants.PROPOSAL_CATEGORIES"
                        :key="index"
                        class="text-capitalize"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>

              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection1.li5.title">
                  <template #proposalBudget>
                    <span class="font-weight-bold">
                      {{ $t('userGuide.proposalBudget') }}
                    </span>
                  </template>
                </i18n>

                <ol
                  type="a"
                  class="mb-6"
                >
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li5.a') }}
                  </li>
                  <li>
                    <i18n path="userGuide.setupProposalSection.subSection1.li5.b">
                      <template #title>
                        <span class="font-weight-bold text-lowercase">
                          {{ $t('common.title') }}
                        </span>
                      </template>
                    </i18n>
                  </li>
                  <li>
                    <i18n path="userGuide.setupProposalSection.subSection1.li5.c">
                      <template #cost>
                        <span class="font-weight-bold text-lowercase">
                          {{ $t('common.cost') }}
                        </span>
                      </template>
                    </i18n>
                  </li>
                  <li>
                    <i18n path="userGuide.setupProposalSection.subSection1.li5.d.title">
                      <template #amount>
                        <span class="font-weight-bold text-lowercase">
                          {{ $t('common.amount') }}
                        </span>
                      </template>
                    </i18n>
                    <ul>
                      <li>
                        <i18n path="userGuide.setupProposalSection.subSection1.li5.d.subLi1">
                          <template #subtotal>
                            <span class="font-weight-bold text-lowercase">
                              {{ $t('common.subtotal') }}
                            </span>
                          </template>
                          <template #cost>
                            <span class="font-weight-bold text-lowercase">
                              {{ $t('common.cost') }}
                            </span>
                          </template>
                          <template #amount>
                            <span class="font-weight-bold text-lowercase">
                              {{ $t('common.amount') }}
                            </span>
                          </template>
                        </i18n>
                      </li>
                    </ul>
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li5.e') }}
                    <ul>
                      <li
                        v-for="(item, index) in $constants.UNITS"
                        :key="index"
                        class="text-capitalize"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li5.f') }}
                  </li>
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection1.li5.g') }}
                  </li>
                  <li>
                    <i18n path="userGuide.setupProposalSection.subSection1.li5.h.title">
                      <template #durationOfPayments>
                        <span class="font-weight-bold text-lowercase">
                          {{ $t('common.paymentsDuration') }}
                        </span>
                      </template>
                    </i18n>

                    <ul>
                      <li>
                        {{ $t('userGuide.setupProposalSection.subSection1.li5.h.subLi1') }}
                      </li>
                      <li>
                        {{ $t('userGuide.setupProposalSection.subSection1.li5.h.subLi2') }}
                      </li>
                    </ul>
                  </li>
                </ol>

                <p>
                  {{ $t('userGuide.setupProposalSection.subSection1.li5.sampleBudget') }}
                </p>
                <div>
                  <img
                    src="~@/assets/img/sample-budget.png"
                    alt="Sample budget table"
                    width="100%"
                  >
                </div>
              </li>
            </ol>
          </div>

          <div class="mb-9">
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('userGuide.setupProposalSection.subSection2.title') }}
            </h3>

            <ol class="body-2 font-weight-medium">
              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection2.li1.title">
                  <template #heroImage>
                    <span class="font-weight-bold">
                      {{ $t('proposalCreationPage.heroImg') }}
                    </span>
                  </template>
                </i18n>

                <ol type="a">
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection2.li1.a') }}
                    <ul>
                      <li>
                        {{ $t('userGuide.setupProposalSection.subSection2.li1.subLi1') }}
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>

              <li class="ol-block">
                <i18n path="userGuide.setupProposalSection.subSection2.li2.title">
                  <template #videoLink>
                    <span class="font-weight-bold">
                      {{ $t('proposalCreationPage.videoLink') }}
                    </span>
                  </template>
                </i18n>

                <ol type="a">
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection2.li2.a') }}
                    <ul>
                      <li>
                        {{ $t('userGuide.setupProposalSection.subSection2.li2.subLi1') }}
                      </li>
                    </ul>
                  </li>
                </ol>
              </li>
            </ol>
          </div>

          <div class="mb-9">
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('userGuide.setupProposalSection.subSection3.title') }}
            </h3>

            <ol class="body-2 font-weight-medium">
              <li class="ol-block">
                {{ $t('userGuide.setupProposalSection.subSection3.li1.title') }}
                <ol type="a">
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection3.li1.a') }}
                  </li>
                </ol>
              </li>

              <li class="ol-block">
                {{ $t('userGuide.setupProposalSection.subSection3.li2.title') }}
                <ul>
                  <li>
                    {{ $t('userGuide.setupProposalSection.subSection3.li2.subLi1') }}
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.descriptionSection.title') }}
          </h2>

          <ol class="body-2 font-weight-medium">
            <li class="ol-block">
              <i18n path="userGuide.descriptionSection.li1">
                <template #description>
                  <span class="font-weight-bold text-lowercase">
                    {{ $t('proposalCreationPage.description') }}
                  </span>
                </template>
              </i18n>
            </li>
            <li class="ol-block">
              {{ $t('userGuide.descriptionSection.li2') }}
            </li>
            <li class="ol-block">
              {{ $t('userGuide.descriptionSection.li3') }}
            </li>
          </ol>
        </section>

        <section class="mb-12">
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.timelineSection.title') }}
          </h2>

          <ol class="body-2 font-weight-medium">
            <li class="ol-block">
              <i18n path="userGuide.timelineSection.li1.title">
                <template #timeline>
                  <span class="font-weight-bold text-lowercase">
                    {{ $t('common.timeline') }}
                  </span>
                </template>
              </i18n>

              <ol type="a">
                <li>
                  {{ $t(
                    'userGuide.clickButton',
                    { buttonName: $t('proposalCreationPage.addNewItem')})
                  }}
                </li>
                <li>
                  <i18n path="userGuide.timelineSection.li1.b">
                    <template #title>
                      <span class="font-weight-bold text-lowercase">
                        {{ $t('common.title') }}
                      </span>
                    </template>
                  </i18n>
                </li>
                <li>
                  <i18n path="userGuide.timelineSection.li1.c">
                    <template #startDate>
                      <span class="font-weight-bold text-lowercase">
                        {{ $t('userGuide.startDate') }}
                      </span>
                    </template>
                  </i18n>

                  <ol type="i">
                    <li>{{ $t('userGuide.selectDate') }}</li>
                    <li>{{ $t('userGuide.clickButton', { buttonName: $t('common.ok') }) }}</li>
                  </ol>
                </li>
                <li>
                  <i18n path="userGuide.timelineSection.li1.d">
                    <template #endDate>
                      <span class="font-weight-bold text-lowercase">
                        {{ $t('userGuide.endDate') }}
                      </span>
                    </template>
                  </i18n>

                  <ol type="i">
                    <li>{{ $t('userGuide.selectDate') }}</li>
                    <li>{{ $t('userGuide.clickButton', { buttonName: $t('common.ok') }) }}</li>
                  </ol>
                </li>
                <li>
                  {{ $t('userGuide.clickButton', { buttonName: $t('proposalCreationPage.save') }) }}
                </li>
                <li>
                  {{ $t('userGuide.timelineSection.li1.f') }}
                </li>
                <li>
                  {{ $t('userGuide.clickButton', { buttonName: $t('proposalCreationPage.saveDraft')
                  }) }}
                </li>
              </ol>
            </li>
          </ol>
        </section>

        <section>
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.publishProposalSection.title') }}
          </h2>

          <p class="body-2 font-weight-medium">
            {{ $t('userGuide.publishProposalSection.preface') }}
          </p>


          <div class="mb-9">
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('userGuide.publishProposalSection.subSection1.title') }}
            </h3>


            <ol class="body-2 font-weight-medium mb-6">
              <li class="ol-block">
                {{ $t('userGuide.clickButton', { buttonName: $t('proposalPage.payFeeShort') }) }}
              </li>
              <li class="ol-block">
                {{ $t('userGuide.publishProposalSection.subSection1.li2') }}
              </li>
            </ol>

            <p class="body-2 font-weight-medium">
              {{ $t('userGuide.publishProposalSection.subSection1.p1') }}
            </p>
          </div>

          <div>
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('userGuide.publishProposalSection.subSection2.title') }}
            </h3>

            <ol class="body-2 font-weight-medium mb-6">
              <li class="ol-block">
                {{ $t('userGuide.clickButton', { buttonName: $t('proposalPage.activate') }) }}
              </li>
              <li class="ol-block">
                {{ $t('userGuide.publishProposalSection.subSection2.li2') }}
              </li>
              <li class="ol-block">
                {{ $t('userGuide.publishProposalSection.subSection2.li3.title') }}

                <ol type="a">
                  <li>
                    {{ $t('userGuide.publishProposalSection.subSection2.li3.a.title') }}

                    <ol type="i">
                      <li>
                        {{ $t('userGuide.publishProposalSection.subSection2.li3.a.subLi1') }}
                      </li>
                    </ol>
                  </li>
                  <li>
                    {{ $t('userGuide.publishProposalSection.subSection2.li3.b') }}
                  </li>
                </ol>
              </li>
              <li>
                {{ $t('userGuide.publishProposalSection.subSection2.li4') }}
              </li>
            </ol>

            <p class="body-2 font-weight-medium mb-0">
              {{ $t('userGuide.publishProposalSection.subSection2.p1') }}
            </p>
          </div>
        </section>
      </div>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'UserGuide',
  };
</script>

<style lang="scss" scoped>
  .ol-block {
    margin-bottom: 10px;
  }
</style>
