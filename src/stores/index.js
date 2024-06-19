import {createPinia} from "pinia";
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// import {userUserStore} from "@/stores/modules/user.js";
// export {userUserStore}
export * from './modules/user.js'
export * from './modules/counter.ts'