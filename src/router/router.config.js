// import Login from 'pages/Login'
// import Home from 'pages/Home'
// import Notfound from 'pages/Notfound'
// import Vuextest from 'pages/Vuextest'

const routers = [
  {
    path: '/Login',
    name: 'Login',
    component: resolve => require(['pages/Login'], resolve)
  },
  {
    path: '/',
    component: resolve => require(['pages/Home'], resolve),
    children: [
      {
        path: '*',
        component: resolve => require(['pages/Index.vue'], resolve)
      }
    ]
  },
  {
    path: '*',
    name: 'Notfound',
    component: resolve => require(['pages/Notfound'], resolve)
  }
]

export default routers
