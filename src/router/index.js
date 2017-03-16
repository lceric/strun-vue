import Vue from 'vue'
import Router from 'vue-router'
import routes from 'router/router.config'
import NProgress from 'nprogress'// 页面顶部加载进度条
import 'nprogress/nprogress.css'// 页面顶部加载进度条css

Vue.use(Router)

const router = new Router({
  routes
})

// 监听路由跳转前变化
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    // 清除session
    sessionStorage.clear()
    // 加载条启动
    NProgress.start()
    // 路由跳转
    next()
  } else {
    // console.log(JSON.parse(sessionStorage.getItem('user')).accessToken)
    if (!sessionStorage.getItem('user')) {
      console.log(from)
      // 发表文章需要登录
      if (to.path === '/add') {
        next({
          path: '/',
          query: {
            redirect: from.fullPath
          }
        })
      } else {
        NProgress.start()
        next()
      }
    } else {
      NProgress.start()
      next()
    }
  }
})

// 监听路由跳转完成变化
router.afterEach(transition => {
  NProgress.done()
  global.tabslength = 0
})

export default router
