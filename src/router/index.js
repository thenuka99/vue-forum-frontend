import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{auth:true}
  },
  {
    path: '/category/:categoryId',
    name: 'categorypage',
    component: () => import('../views/PostsByCategoryView.vue'),
    meta:{auth:true}
  },
  {
    path: '/search/:searchTerm',
    name: 'searchpage',
    component: () => import('../views/SearchResults.vue'),
    meta:{auth:true}
  },
  {
    path: '/post/:postId',
    name: 'postPage',
    component: () => import('../views/PostView.vue'),
    meta:{auth:true}
  },
  {
    path: '/editProfile',
    name: 'editProfile',
    component: () => import('../views/ProfileEditView.vue'),
    meta:{auth:true}
  },
  {
    path: '/user',
    name: 'userAdmin',
    component: () => import('../views/UserAdminView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta:{auth:true}
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    meta:{auth:true}
  },
  {
    path: '/addforum',
    name: 'addforum',
    component: () => import('../views/AddPostView.vue'),
    meta:{auth:true}
  },
  {
    path: '/editforum/:forumId',
    name: 'editforum',
    component: () => import('../views/AddPostView.vue'),
    meta:{auth:true}
  },
  {
    path: '/category',
    name: 'category',
    component: () => import('../views/CategoryView.vue'),
    meta:{auth:true,admin:true}
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta:{auth:false}
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/SigninView.vue'),
    meta:{auth:false}
  },
  {
    path: '/loading',
    name: 'loading',
    component: () => import('../components/LoaderComponent.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to,from,next)=>{
  if(to.meta.auth && !store.getters.getUserState.token){
    next('/signin')
  }else if(!to.meta.auth && store.getters.getUserState.token){
    next('/')
  }else if(to.meta.admin && !store.getters.getUserState.user.isAdmin){
    next('/')
  }else{
    next();
  }
});
export default router
