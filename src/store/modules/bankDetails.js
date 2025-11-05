import service from "../modules/services/Bank_Details.ts"
import errorHandle from '../../handleError/errorHandling'
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const state = {
    IFSCDetails: [],
    isAddBank: false,
    errormsg: '',
    saveBankDetails: [],

}

const actions = {

    async IFSCDetails({ commit, rootState }, ifscCode) {
        commit('setIFSCDetails', []);

        await service.getIFSCDetails(rootState.auth.userId, ifscCode)
            .then(resp => {
                if (resp.status == 200 && resp?.data?.stat === 1) {
                    commit('setIFSCDetails', resp.data.result);
                } else {
                    commit('seterrormsg', resp.data.reason)

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },
    
    async saveBankDetails({ commit }, payload) {
        commit('setLoader', true, { root: true });
        service.saveBankDetails(payload).then(resp => {
            if (resp.status == 200 && resp.data.message.Success == 1) {
                commit('setsaveBankDetails', resp.data.result);

            }
            else {
                commmit("setIsAddBank", false)
                notify({
                    group: "auth",
                    type: "error",
                    title: resp.data.message,
                });
            }
        }).catch((error) => {
            errorHandle.handleError(error)
            notify({
                group: "auth",
                type: "error",
                title: error.response.data.message,
            });
        }).finally(() => {
            commit('setLoader', false, { root: true });
        })
    },

};

const mutations = {
    setIFSCDetails(state, payload) {
        state.IFSCDetails = payload
    },
    setIsAddBank(state, payload) {
        state.isAddBank = payload
    },
    seterrormsg(state, payload) {
        state.errormsg = payload
    },
    setsaveBankDetails(state, payload) {
        state.saveBankDetails = payload
    }
};

const getters = {
    getIFSCDetails: state => state.IFSCDetails,
    getIsAddBank: state => state.isAddBank,
    getsaveBankDetails: state => state.saveBankDetails,
    geterrormsg: state => state.errormsg,


};

const bankDetails = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default bankDetails

