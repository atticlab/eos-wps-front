import Vue from 'vue';
import VueRouter from 'vue-router';
import ActionType from '../store/constants';

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
const Proposals = () => import('../views/Proposals.vue');
const Proposal = () => import('../views/Proposal.vue');
const ProposalCreation = () => import('../views/ProposalCreation.vue');
const About = () => import('../views/About.vue');
const UserGuide = () => import('../views/UserGuide.vue');
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/proposal/active/:slug',
    name: 'ProposalActive',
    component: Proposal,
  },
  {
    path: '/proposal/pending/:slug',
    name: 'ProposalPending',
    component: Proposal,
  },
  {
    path: '/proposal/draft/:proposer/:slug',
    name: 'ProposalDraft',
    component: Proposal,
  },
  {
    path: '/proposal-editor/:slug?',
    name: 'Proposal editor',
    component: ProposalCreation,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/user-guide',
    name: 'User guide',
    component: UserGuide,
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // Makes a page go to the top when a route is visited
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

// Guard routes which require auth
// eslint-disable-next-line consistent-return
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Vue.prototype.$store.getters['userService/getAccountNameWithAuthority']) {
      await Vue.prototype.$store.dispatch(`userService/${ActionType.DEFINE_ROUTE_TO}`, to);
      return next({
        path: '/',
      });
    }
    return next();
  }
  next();
});

export default router;
