import service from "../modules/services/Bank_Details.ts"
import errorHandle from '../../handleError/errorHandling'
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const state = {
    IFSCDetails: [],
    isAddBank: false,
    errormsg: '',
    saveBankDetails: [],
    updatebankdetails: [],
    deleteoldbank: [],


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

    // async saveBankDetails({ commit, dispatch, rootGetters }, payload) {
    //     commit("setLoader", true, { root: true });
    //     try {
    //         // let json = {
    //         //     "applicationId": rootGetters['auth/getUserId'],
    //         //     "micr": payload.MICR,
    //         //     "address": payload.address,
    //         //     "ifsc": payload.ifsc,
    //         //     "accountNo": payload.accountNo,
    //         //     "branchName": payload.branchName,
    //         //     "pincode": payload.pincode,
    //         //     "verifyAccNumber": payload.verifyAccNumber
    //         // }
    //         let response = await service.saveBankDetails(json);
    //         if (response.status == 200 && response?.data?.stat === 1) {
    //             console.log(response.status)
    //             commit('common/setcurrentTab', '3', { root: true })
    //             commit('common/setIsPenny', true, { root: true })
    //         } else {
    //         }
    //     } catch (error) {
    //         commit("setLoader", false, { root: true });
    //     }
    //     commit("setLoader", false, { root: true });
    // },


    async saveBankDetails({ commit, dispatch }, payload) {
        commit('setLoader', true, { root: true });

        service.saveBankDetails(payload).then(resp => {
            if (resp.status == 200 && resp.data.message == 'Success') {
                dispatch('updatebankdetails',)
                commit('setIsAddBank', false)
                commit('setsaveBankDetails', resp.data.result);
                notify({
                    group: "auth",
                    type: "success",
                    title: resp.data.message,
                });
            }
            else {
                notify({
                    group: "auth",
                    type: "error",
                    title: resp.data.message,
                });
            }
        }).catch((error) => {
            errorHandle.handleError(error)
            console.log(error)

            notify({
                group: "auth",
                type: "error",
                title: error.resp.data.message,

            });
        }).finally(() => {
            commit('setLoader', false, { root: true });
        })
    },
    async updatebankdetails({ commit, rootState },) {
        commit('setupdatebankdetails', []);

        await service.getBankDetails(rootState.auth.userId,)
            .then(resp => {
                if (resp.status == 200 && resp?.data?.stat === 1) {
                    commit('setupdatebankdetails', resp.data.result);
                } else {

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },

    async deletenewbank({ dispatch }, bankId) {
        // commit("setdeleteloader", true);
        try {

            let response = await service.deletenewbank(bankId);

            if (response.status == 200 && response.data.message == "Success") {

                // await dispatch("getupdateNomineeDetails")
                dispatch('updatebankdetails');
            }
        } catch (error) {
            errorHandle.handleError(error)
            // commit("setdeleteloader", false);
        }
        // commit("setdeleteloader", false);
    },


    async deleteoldbank({ commit, rootGetters }, accountNo) {
        // commit("setdeleteloader", true);
        try {
            let response = await service.deleteoldbank(accountNo, rootGetters['auth/getUserId']);

            if (response.status == 200 && response.data.message == "Success") {
                commit('setolddeletebank', response.data.result);

            }
        } catch (error) {
            errorHandle.handleError(error)
            // commit("setDeleteLoader", false);
        }
        // commit("setdeleteloader", false);
    },

};

const mutations = {
    setIFSCDetails(state, payload) {
        state.IFSCDetails = payload
    },
    setIsAddBank(state, payload) {
        state.isAddBank = payload
        console.log(payload)
    },
    seterrormsg(state, payload) {
        state.errormsg = payload
    },
    setsaveBankDetails(state, payload) {
        state.saveBankDetails = payload
    },
    setsaveBankDetails(state, payload) {
        state.saveBankDetails = payload
    },
    setupdatebankdetails(state, payload) {
        state.updatebankdetails = payload
    },
    setolddeletebank(state, payload) {
        state.deleteoldbank = payload
    },

};

const getters = {
    getIFSCDetails: state => state.IFSCDetails,
    getIsAddBank: state => state.isAddBank,
    getsaveBankDetails: state => state.saveBankDetails,
    geterrormsg: state => state.errormsg,
    getupdatebankdetails: state => state.updatebankdetails,


};

const bankDetails = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default bankDetails

