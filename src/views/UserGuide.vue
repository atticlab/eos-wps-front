<template>
  <v-container class="py-12 container--custom">
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
        <section class="mb-9">
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.signInSection.title') }}
          </h2>

          <ol>
            <li>
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

            <li>
              {{ $t('userGuide.signInSection.li2.title') }}
              <ol type="a">
                <li>{{ $t('userGuide.signInSection.li2.a') }}</li>
                <li>{{ $t('userGuide.signInSection.li2.b') }}</li>
              </ol>
            </li>

            <li>{{ $t('userGuide.signInSection.li3') }}</li>
          </ol>
        </section>

        <section class="mb-9">
          <h2 class="fs-40 mb-2">
            {{ $t('userGuide.setupProposalSection.title') }}
          </h2>

          <div>
            <h3 class="fs-30 font-weight-semi-bold mb-8">
              {{ $t('userGuide.setupProposalSection.subSection1.title') }}
            </h3>

            <ol>
              <li>
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

              <li>
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

              <li>
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

              <li>
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
            </ol>
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
</style>
