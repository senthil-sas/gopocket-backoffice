import service from '../httpService';
import router from '@/router';
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
} 

const auth = {
    namespaced: true,
    state: {
        error_message: null,
        loader: false,
        userId: '',
        setSessionId: '',
        isAuthorizeDialog: false,
        authLoader: false
    },
    mutations: {
        setErrorMessage(state, payload) {
            state.error_message = payload
        },
        setLoader(state, payload) {
            state.loader = payload
        },
        setUserId(state, payload) {
            state.userId = payload
            localStorage.setItem("clientId", payload)
        },
        setSessionId(state, payload) {
            state.sessionId = payload
        },
        setIsAuthorizeDialog(state, payload) {
            state.isAuthorizeDialog = payload
        },
        setAuthLoader(state, payload) {
            state.authLoader = payload
        }
    },
    actions: {
        async getData({ commit, rootState }, payload) {
            commit('setLoader', true)
            commit('setErrorMessage', null)
            try {
                const response = await service.ssoLogin(payload)
                if (response.data.stat === "Ok") {
                    localStorage.setItem('clientId', response.data.clientId);
                    localStorage.setItem('sessionId', response.data.userSession);
                    commit("setUserId", response.data.clientId);
                    commit("setSessionId", response.data.userSession);
                    router.push({ name: 'dashboard' }).catch(() => { })
                } else if (response.data.emsg) {
                    commit('setErrorMessage', response.data.emsg)
                }
                commit('setLoader', false)
            } catch (error) {
                commit('setLoader', false)
                console.log(error);
            }
        },
        async logout({ commit }) {
            service.logout("").then((response) => {
                if (response.status == 200) {
                    localStorage.clear();
                    router.push({ path: "/", query: { logout: "true" } }).catch(() => { });
                }
            },
                (err) => { }).finally(() => { state.logoutLoader = false; })
        },

        async ssoRedirection({ commit }, payload) {
            service.ssoRedirection(payload).then((resp) => {
                if(resp.status == 200 && resp.data.status != "Not ok" && Array.isArray(resp.data.result) && resp.data.result[0].hasOwnProperty("authorized") && !resp.data.result[0].authorized) {
                    commit("setIsAuthorizeDialog", true)
                } else if (resp.status == 200 && resp.data.status != "Not ok" && Array.isArray(resp.data.result) && resp.data.result[0].hasOwnProperty("redirectUrl")) {
                    let redirectUrl = `${resp.data.result[0].redirectUrl}`
                    if(payload?.action) {
                        redirectUrl += `&action=${payload.action}`
                    }
                    window.open(redirectUrl, "_blank")
                } else {
                    notify({ group: 'auth', type: 'error', title: resp.data.message })
                }
            })
        },

        async authorize({commit}, payload) {
            commit("setAuthLoader", true)
            service.ssoAuthorize(payload).then((resp) => {
                if (resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0].hasOwnProperty("redirectUrl")) {
                    const redirectUrl = resp.data.result[0].redirectUrl
                    window.open(redirectUrl, "_blank")
                    commit("setIsAuthorizeDialog", false)
                } else {
                    notify({ group: 'auth', type: 'error', title: resp.data.message })
                }
            }).finally(() => {
                commit("setAuthLoader", false)
            })
        }
    },
    getters: {
        getLoader: (state) => state.loader,
        getUserId: (state) => state.userId,
        getErrorMessage: (state) => state.error_message,
        getIsAuthorizeDialog: (state) => state.isAuthorizeDialog,
        getAuthLoader: (state) => state.authLoader
    },

}
export default auth