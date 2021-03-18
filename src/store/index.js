import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import localization from './localization'
import sounds from './sounds'
import optionsMenu from './optionsMenu'
import gameMetal from './gameMetal'

export default new Vuex.Store({
    namespaced: true,
    state: {
        currentPage: undefined,
        loadScreen: true,
        devPage: "GameMetal",
        showDevTool: false,
        isSmartphone: false,
        inventoryEnable: false,
        background: 1,
        family: {
            isRequest: true,
            name: "",
            money: 500
        }
    },
    mutations: {
        setPage(state, page) {
            state.currentPage = page;
        },
        inventoryEnabled(state, val){
            state.inventoryEnable = val;
        },
        setFamilyData(state, data) {
            state.family = data
            state.currentPage = "Family"
        },
        setPhoneActive(state, isActive) {
            state.isSmartphone = isActive;
        },
        setBackground(state, val){
            state.background = val;
        },
        setLoadScreen(state, toggle){
            state.loadScreen = toggle == true;
        }
    },
    actions: {},
    modules: {
        localization,
        sounds,
        optionsMenu,
        gameMetal
    }
})