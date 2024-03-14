import service from '../httpService';
import router from '@/router';
const auth = {
    namespaced: true,
    state: {
        error_message: null,
        loader:false,
        userId: '',
        setSessionId:''
    },
    mutations: {
        setErrorMessage(state, payload){
            state.error_message = payload
        },
        setLoader(state, payload){
            state.loader = payload
        },
        setUserId (state, payload) {
            state.userId = payload
        },
        setSessionId (state, payload) {
          state.sessionId = payload
        }
    },
    actions: {
        async getData({ commit, rootState}, payload) {
            commit('setLoader', true)
            commit('setErrorMessage', null)
            try {
                let json = {
                    vendor: rootState['myAppCode'],
                    authCode: payload,
                }
                const response = await service.ssoLogin(json)
                if (response.data.stat === "Ok") {
                    localStorage.setItem('clientId', response.data.clientId);
                    localStorage.setItem('sessionId', response.data.userSession);
                    commit("setUserId", response.data.clientId);
                    commit("setSessionId", response.data.userSession);
                    router.push({ name: 'dashboard' }).catch(() => { })
                } else if(response.data.message) {
                    commit('setErrorMessage', response.data.message)
                }
                commit('setLoader', false)
            } catch (error) {
                commit('setLoader', false)
                console.log(error);
                // dispatch('unAuthorized', error, {root: true})
            }
        },
        async logout({ commit }) {
            service.logout("").then((response) => {
                if (response.status == 200) {
                    localStorage.clear();
                    router.push({path: "/", query: {logout: "true"}}).catch(() => {});
                }
            },
            (err) => {}).finally(() => { state.logoutLoader = false; })
        }
    },
    getters: {
        getLoader: (state) => state.loader,
        getUserId: (state) => state.userId
    },

}
export default auth