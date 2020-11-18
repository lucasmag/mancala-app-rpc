import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Game from './pages/Game'
import Home from './pages/Home'
import * as io from "socket.io-client";
import VueSocketIO from "vue-socket.io";
import { MdDialog, MdButton, MdField, MdSwitch } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import Toasted from 'vue-toasted';

const { ipcRenderer, remote } = window.require('electron');

const clientStub = remote.require('../stubs/clientStub')
const server = ipcRenderer

var tcpPortUsed =  window.require("electron").remote.require('tcp-port-used');

Vue.prototype.$clientStub = clientStub
Vue.prototype.$server = server
Vue.prototype.$tcpPortUsed = tcpPortUsed

Vue.use(Toasted)
Vue.use(MdButton)
Vue.use(MdDialog)
Vue.use(MdField)
Vue.use(MdSwitch)
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: io('http://localhost:4113'), //options object is Optional
  })
);

Vue.use(VueRouter)
Vue.config.productionTip = false


const routes = [
  { path: '/', component: Home },
  { name: 'game', path: '/game', component: Game, props: true},
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router,
  render: h => h(App),
})