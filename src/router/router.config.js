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
    name: 'Home',
    component: resolve => require(['pages/Home'], resolve),
    children: [
      {
        path: 'home',
        component: resolve => require(['pages/Tabsmenutest'], resolve)
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
