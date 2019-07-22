import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Login from '../components/pages/Login'
import Home from '../components/pages/Home'
import Manage from '../components/pages/Manage'
import User from '../components/pages/User'
import News from '../components/pages/News'
import Device from '../components/pages/Device'

import ManageCreate from '../components/pages/ManageCreate'
import ManageList from '../components/pages/ManageList'

import UserList from '../components/pages/UserList'
import UserCreate from '../components/pages/UserCreate'

import NewsList from '../components/pages/NewsList'
import NewsCreate from '../components/pages/NewsCreate'

import DeviceList from '../components/pages/DeviceList'
import DeviceCreate from '../components/pages/DeviceCreate'

import Welcome from '../components/pages/Welcome'
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: 'manage',
          component: Manage,
          children: [
            {
              path: 'managelist',
              component: ManageList,
              name: "管理员列表页"
            },
            {
              path: 'managecreate',
              component: ManageCreate,
              name: "添加/修改管理员"
            }, 
            {
              path:"",
              redirect:"managelist"
            }
          ]
        },
        {
          path: 'user',
          component: User,
          children:[
            {
              path:'userlist',
              component:UserList,
              name:"用户列表页"
            },
            {
              path:'usercreate',
              component:UserCreate,
              name:"添加/修改用户"
            },
            {
              path:'',
              redirect:'userlist'
            }
          ]
        },
        {
          path: 'news',
          component: News,
          children:[
            {
              path:'newslist',
              component:NewsList,
              name: "通知列表页",
            },
            {
              path:'newscreate',
              component:NewsCreate,
              name: "添加/修改通知",
            },
            {
              path:'',
              redirect:'newslist'
            },
          ]
        },
        {
          path: 'device',
          component: Device,
          children:[
            {
              path:'devicelist',
              component:DeviceList,
              name:'设备列表页'
            },
            {
              path:'devicecreate',
              component:DeviceCreate,
              name:'添加/修改设备'
            },
            {
              path:'',
              redirect:'devicelist'
            },
          ]
        },
        {
          path: '',
          component:Welcome
        },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
