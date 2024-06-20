import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from "@/components/HomeComponent.vue";
import InformationComponent from "@/views/MembershipInformationComponent.vue";
import LoginComponent from "/src/components/LoginComponent.vue";
import RegisterComponent from "@/views/RegisterComponent.vue";
import CourseManagementComponent from "@/views/CourseManagementComponent.vue";
import HomePageComponent from "@/views/HomePageComponent.vue";
import FitnessDataComponent from "@/views/FitnessDataComponent.vue";
import MembershipConsumptionComponent from "@/views/MembershipConsumptionComponent.vue";
import MembershipManagementComponent from "@/views/MembershipManagementComponent.vue";
import VenueReservationsComponent from "@/views/VenueReservationsComponent.vue";
import CoachManagementComponent from "@/views/CoachManagementComponent.vue";
import TeachCourseComponent from "@/views/TeachCourseComponent.vue";
import bookCourseInformationComponent from "@/views/bookCourseInformationComponent.vue";
import WellMaterialManagementComponent from "@/views/WellMaterialManagementComponent.vue";
import BadMaterialManagementComponent from "@/views/BadMaterialManagementComponent.vue";
import SignInComponent from "@/views/SignInComponent.vue";
import signInInformation from "@/views/signInInformation.vue";
import {userUserStore} from "@/stores/index.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent,
      children:[
        {
          path:'information',
          component:InformationComponent
        },{
          path:'courseManagement',
          component:CourseManagementComponent
        },{
          path:'homePage',
          component:HomePageComponent
        },{
          path:'fitnessData',
          component:FitnessDataComponent
        },{
          path:'membershipManagement',
          component:MembershipManagementComponent,
        },{
          path:'membershipConsumption',
          component:MembershipConsumptionComponent
        },{
          path:'venueReservations',
          component:VenueReservationsComponent,
        },{
          path:'coachManagement',
          component:CoachManagementComponent
        },{
          path:'teachCourse',
          component:TeachCourseComponent
        },{
          path:'bookCourseInformation',
          component:bookCourseInformationComponent
        },{
          path:'bedMaterialManagement',
          component:BadMaterialManagementComponent
        },{
          path:'wellMaterialManagement',
          component:WellMaterialManagementComponent
        },{
          path:'signIn',
          component:SignInComponent
        }, {
          path: 'signInInformation',
          name: 'signInInformation',
          component: signInInformation,
          props:true
        }
      ]
    },
    {
      path:'/',
      name:'Login',
      component:LoginComponent
    },
    {
      path:'/register',
      name:'register',
      component:RegisterComponent
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from, next)=>{
  const userStore=userUserStore()
  if(!userStore.token && to.path!=='/'){
    next('/')
  }else {
    next()
  }
})

export default router
