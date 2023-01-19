import { createStore, createLogger } from 'vuex'
import userModule from './modules/user.module'
import categoryModule from './modules/category.module'

const debug = process.env.NODE_ENV !== 'production'


export default createStore({
  modules: {
    userModule,
    categoryModule
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
