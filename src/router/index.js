import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'

export default defineRouter(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })

  Router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    const publicPages = ['login', 'register']
    const authRequired = !publicPages.includes(to.name)

    if (authRequired && !token) {
      return next({ name: 'login' })
    }

    if ((to.name === 'login' || to.name === 'register') && token) {
      return next({ name: 'main' })
    }

    return next()
  })

  return Router
})