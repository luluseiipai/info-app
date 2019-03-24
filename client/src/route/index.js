/* jshint esversion:6 */
import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/profile/Profile.vue';
import Profiles from '../views/Profiles.vue';
import Forum from '../views/Forum/Forum.vue';


Vue.use(Router);

const route = new Router({
  mode:'history',
  linkActiveClass:'active',
  routes:[
    {path:'*',redirect:'/'},
    {path:'/',name:'Home',component:Home},
    {path:'/login',name:'Login',component:() => import('../views/Login.vue')},
    {path:'/register',name:'Register',component:() => import('../views/Register.vue')},
    {
      path:'/dashboard',name:'Dashboard',component:Dashboard,
      children:[
        {path:'/',name:'Dashboard_Index',component:() => import('../views/dashboard/Index.vue')},
        {path:'createprofile',name:'CreateProfile',component:() => import('../views/dashboard/CreateProfile.vue')},
        {path:'editprofile',name:'EditProfile',component:() => import('../views/dashboard/EditProfile.vue')},
        {path:'addeducation',name:'AddEducation',component:() => import('../views/dashboard/AddEducation.vue')},
        {path:'addexperience',name:'AddExperience',component:() => import('../views/dashboard/AddExperience.vue')},
        {path:'addskill',name:'AddSkill',component:() => import('../views/dashboard/AddSkill.vue')},
        {path:'addreward',name:'AddReward',component:() => import('../views/dashboard/AddReward.vue')},
        {path:'setting',name:'Setting',component:() => import('../views/dashboard/Setting.vue')},
        {path:'introduce',name:'Introduce',component:() => import('../views/dashboard/Introduce.vue')},
        {path:'contactus',name:'ContactUs',component:() => import('../views/dashboard/ContactUs.vue')}
      ]
    },
    {path:'/profile/:handle',name:'Profile',component:Profile},
    {path:'/profiles',name:'Profiles',component:Profiles},
    {path:'/forum',name:'Forum',component:Forum},
    {path:'/forum/:id',name:'Post',component:() => import('../views/Forum/Post.vue')}
  ]
});

route.beforeEach((to,from,next) => {
  let isLogin = localStorage.eleToken ? true : false;
  if(to.path == '/' || to.path == '/login' || '/register'){
    next();
  }else{
    isLogin ? next() : next('/login');
  }
});

export default route;