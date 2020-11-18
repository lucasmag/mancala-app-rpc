import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        gameData: [],
        messages: []
    },
    mutations: {
        setGameState(state, payload) {
            state.gameData = payload
        },
        setMessages(state, payload) {
            state.messages = payload
        }
    }
})

export { store }