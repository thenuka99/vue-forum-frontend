import { createStore, createLogger } from 'vuex'
import userModule from './modules/user.module'

const debug = process.env.NODE_ENV !== 'production'


export default createStore({
  modules: {
    userModule
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
