// import Login from 'pages/Login'
// import Home from 'pages/Home'
// import Notfound from 'pages/Notfound'
// import Vuextest from 'pages/Vuextest'

const routers = [{
  path: '/sign',
  name: 'sign',
  component: resolve => require(['pages/Sign'], resolve)
    // children: [{
    //   path: '/login',
    //   name: 'login',
    //   component: resolve => require(['pages/Login'], resolve)
    // }, {
    //   path: '/regist',
    //   name: 'regist',
    //   component: resolve => require(['pages/Regist'], resolve)
    // }]
}, {
  path: '/',
  component: resolve => require(['pages/Home'], resolve),
  children: [{
    path: '',
    component: resolve => require(['pages/Index.vue'], resolve)
  }, {
    path: '/edit',
    component: resolve => require(['pages/Edit.vue'], resolve)
  }, {
    path: '/redit',
    component: resolve => require(['pages/Edit.vue'], resolve)
  }, {
    path: '/article',
    name: 'article',
    component: resolve => require(['pages/Article'], resolve)
  }, {
    path: '/myarticlelist',
    name: 'myarticlelist',
    component: resolve => require(['pages/MyArticleList'], resolve)
  }, {
    path: '/about',
    name: 'about',
    component: resolve => require(['pages/About'], resolve)
  }]
}, {
  path: '*',
  name: 'Notfound',
  component: resolve => require(['pages/Notfound'], resolve)
}]

export default routers
