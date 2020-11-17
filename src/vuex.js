import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        gameState: [],
        messages: []
    },
    mutations: {
        setGameState(state, payload) {
            state.gameState = payload.gameState
        },
        setMessages(state, payload) {
            state.messages = payload.messages
        }
    }
})

export { store }