import service from "../modules/services/Bank_Details.ts"
import errorHandle from '../../handleError/errorHandling'

const state = {
    IFSCDetails: [],
    isAddBank: false,
    errormsg: '',
    branchDeatils: [],

}

const actions = {

    async IFSCDetails({ commit, rootState }, ifscCode) {
        commit('setIFSCDetails', []);

        // const requestData = {
        //     ucc: rootState.auth.userId,
        // };
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

    async saveBankDetails({ commit, dispatch, rootGetters }, payload) {
        commit("setLoader", true, { root: true });
        try {
            let json = {
                "applicationId": rootGetters['login/getUserId'],
                "micr": payload.MICR,
                "address": payload.address,
                "ifsc": payload.ifsc,
                "accountNo": payload.accountNo,
                "branchName": payload.branchName,
                "pincode": payload.pincode,
                "verifyAccNumber": payload.verifyAccNumber
            }
            let response = await service.saveBankDetails(json);
            if (response.status == 200 && response?.data?.stat === 1) {
                console.log(response.status)
                commit('common/setcurrentTab', '3', { root: true })
                commit('common/setIsPenny', true, { root: true })
            } else {
            }
        } catch (error) {
            commit("setLoader", false, { root: true });
        }
        commit("setLoader", false, { root: true });
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
    setBranchdeatails(state, payload) {
        state.branchDeatils = payload
    }
};

const getters = {
    getIFSCDetails: state => state.IFSCDetails,
    getIsAddBank: state => state.isAddBank,
    getBankDetails: state => state.bankDetails,
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

