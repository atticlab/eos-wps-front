import Vue from 'vue';
import VueRouter from 'vue-router';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Proposals = () => import('../views/Proposals.vue');
const Proposal = () => import('../views/Proposal.vue');
const ProposalCreation = () => import('../views/ProposalCreation.vue');
const NotFound = () => import('../views/NotFound.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/proposals/active',
  },
  {
    path: '/proposals',
    redirect: '/proposals/active',
  },
  {
    path: '/proposals/active',
    name: 'ProposalsActive',
    component: Proposals,
  },
  {
    path: '/proposals/drafts',
    name: 'ProposalsDrafts',
    component: Proposals,
  },
  {
    path: '/proposal/active/:slug',
    name: 'ProposalActive',
    component: Proposal,
  },
  {
    path: '/proposal/draft/:slug',
    name: 'ProposalDraft',
    component: Proposal,
  },
  {
    path: '/proposal-editor/:slug?',
    name: 'Proposal editor',
    component: ProposalCreation,
  },
  {
    path: '/404',
    name: 'Not found',
    component: NotFound,
  },
  {
    path: '*',
    redirect: '/404',
  },
];

// const routesForbiddenBeforeSignIn = [
//   'Proposal editor',
//   'ProposalsDrafts',
//   'ProposalDraft',
// ];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // Makes a page go to the top when a route is visited
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

export default router;
