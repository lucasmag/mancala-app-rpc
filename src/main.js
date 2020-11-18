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
import { store } from './vuex'

const { ipcRenderer, remote } = window.require('electron');

const clientStub = remote.require('../stubs/clientStub')
let server = ipcRenderer

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
  routes // short for `routes: routes`
})


const vue = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

window.require('electron').ipcRenderer.on('messages', (event, message) => {
    console.log("mensagenss");

    vue.$emit("teste", "Só umteste boy hehehe")
    store.commit("setMessages", message)
})

window.require('electron').ipcRenderer.on('gameState', (event, message) => {
    store.commit("setGameState", message)
})

window.require('electron').ipcRenderer.on('startGame', (event, message) => {
    store.commit("startGame", message)
})