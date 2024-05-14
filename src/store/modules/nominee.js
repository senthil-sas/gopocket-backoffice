import service from "../modules/services/profile.ts";
import Nomineeservice from "../modules/services/Nominee.ts";

import errorHandle from '../../handleError/errorHandling'
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();

const state = {
    nomineeStage: 'initialList',
    nomineeList: [],
    showNomineeDetails: [],
    isMinor: false,
    NomineeDetails: [],
    guardianDateErrMsg: '',
    // password PDF
    isPasswordPDF: false,
    nomineePassword: '',
    guardianPassord: '',
    isNomineepass: false,
    isGuardianPass: false,
    deletenomineeId: '',
    nomineedialog: false,
    //
    setNomineeID: [],
    getOldDeleteNominee: '',


}
const actions = {


    async getupdateNomineeDetails({ commit, rootGetters, dispatch }) {
        commit('setNomineeList', []);
        commit('setNomineeID', []);

        commit('setLoader', true, { root: true });
        let userId = rootGetters['auth/getUserId']

        service.getupdateNomineeDetails(userId)
            .then(async resp => {
                if (resp.data?.message?.data?.fsl_nominee_details) {
                    await dispatch("getOldDeleteNominee")
                    // commit('setNomineeID', resp.data.message.data?.fsl_nominee_details.nominee_number);
                    const result = [];

                    if (resp.data.message.data?.fsl_nominee_details && resp.data.message.data?.fsl_nominee_details.length > 0) {
                        // Loop through array2
                        resp.data.message.data?.fsl_nominee_details.forEach(item2 => {
                            // Check if the ID is not present in array1
                            if (!state.getOldDeleteNominee.some(item1 => item1.nomineeId == item2.nominee_number)) {
                                result.push({ ...item2, allocation: item2.percentage_allocation });
                            }
                        });
                    }

                    if (result.length > 0) {
                        commit('setNomineeStage', 'nomineeSummary');
                    } else {
                        dispatch('NomineeDetails')
                        commit('setNomineeStage', 'initialList');
                    }

                    commit('setNomineeList', result);
                } else {
                }
            },
                (err) => {
                    console.log(err);
                    errorHandle.handleError(err)
                })
            .finally(() => {
                commit('setLoader', false, { root: true });
            });
    },

    async addNomineeDetails({ commit }, payload) {
        try {
            service.addNomineeDetails(payload).then(resp => {
                if (resp.status == 200) {
                    commit('setNomineeStage', 'nomineeSummary')
                } else {
                    //  commit('setNomineeList', [])
                }
            })
        } catch (error) {

        }
    },

    async saveNomineeDetails(
        { state, commit, dispatch, rootState },
        payload
    ) {
        commit('reekyc/setloginloader', true, { root: true });
        commit('setIsPasswordPDF', false)
        commit('setIsNomineepass', false)
        commit('setIsGuardianPass', false)
        try {
            let fd = new FormData();
            fd.append("uccCode", rootState.auth.userId);
            fd.append("nomFile", payload[1]);
            fd.append("nomineeDetails", JSON.stringify(payload[0]));
            fd.append("guardFile", payload[2])
            fd.append("nomineepassword", state.nomineePassword)
            fd.append("gurpassword", state.guardianPassord)
            let response = await Nomineeservice.saveNomineeDetails(fd);
            if (response.status == 200 && response.data.message == "Success") {
                await dispatch("NomineeDetails")
                commit('setNomineeStage', 'nomineeSummary');
            } else if (response.data && response.data.reason && (response.data.reason == 'Cannot decrypt PDF of Nominee, the password is incorrect' || response.data.reason == 'Cannot decrypt PDF of Guardian, the password is incorrect')) {
                if (response.data.reason == 'Cannot decrypt PDF of Nominee, the password is incorrect') {
                    commit('setIsNomineepass', true)
                    notify({
                        group: "auth",
                        type: "success",
                        title: "Please Enter Valid Password",
                    })
                    // commit('Notification/setNotificationMsg', { show: true, header: '', subHeader: 'Please Enter Valid Password', status: 'info' }, { root: true })
                } else if (

                    response.data.reason == 'Cannot decrypt PDF of Guardian, the password is incorrect') {
                    commit('setIsGuardianPass', true)
                    notify({
                        group: "auth",
                        type: "success",
                        title: "Please Enter Valid Password",
                    });
                    // commit('Notification/setNotificationMsg', { show: true, header: '', subHeader: 'Please Enter Valid Password', status: 'info' }, { root: true })
                }
                commit('setIsPasswordPDF', true)
            } else {
                // commit('Notification/setNotificationMsg', { show: true, header: 'Error', subHeader: response.data.reason, status: 'failed' }, { root: true })
                notify({
                    group: "auth",
                    type: "success",
                    title: response.data.reason,
                })
            }

        } catch (error) {
            errorHandle.handleError(error)
        }
        finally {
            commit('reekyc/setloginloader', false, { root: true });
        }
    },

    async NomineeDetails({ rootState, commit },) {
        commit('setNomineeDetails', []);

        await Nomineeservice.NomineeDetails(rootState.auth.userId,)
            .then(resp => {
                if (resp.status == 200 && resp?.data?.stat === 1) {
                    commit('setNomineeDetails', resp.data.result);
                    state.showNomineeDetails = resp?.data?.result;
                    commit("setNomineeStage", "nomineeSummary")
                } else {
                    state.showNomineeDetails = []
                    state.nomineeList = []

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },

    async deleteNominee({ state, commit, dispatch, rootState, rootGetters }, payload) {
        // commit("setDeleteLoader", true);
        try {
            let json = {
                id: state.deletenomineeId,
                uccCode: rootGetters['auth/getUserId']
            }
            let response = await Nomineeservice.deleteNominee(json);

            if (response.status == 200 && response.data.message == "Success") {

                await dispatch("getupdateNomineeDetails")
                dispatch("NomineeDetails")

            }
        } catch (error) {
            errorHandle.handleError(error)
            // commit("setDeleteLoader", false);
        }
        // commit("setDeleteLoader", false);
    },
    async saveSharePercent({ state, commit, dispatch, rootState, rootGetters }, payload) {
        commit("setLoader", true, { root: true });
        try {
            let json = {
                "uccCode": rootGetters['auth/getUserId'],
                "nomOneAllocation": payload.nominee1,
                "nomTwoAllocation": payload.nominee2,
                "nomThreeAllocation": payload.nominee3,
            }
            let response = await Nomineeservice.saveSharePercent(json);
            if (response.status == 200 && response?.data?.stat === 1) {
            } else {
                notify({
                    group: "auth",
                    type: "success",
                    title: response.data.reason,
                })
                // commit('Notification/setNotificationMsg', { show: true, header: 'Error', subHeader: response?.data?.reason, status: 'failed' }, { root: true })
            }
        } catch (error) {
            errorHandle.handleError(error)
        }
        commit("setLoader", false, { root: true });
    },

    async deleteOldNominee({ state, commit, dispatch, rootState, rootGetters }, payload) {
        // commit("setDeleteLoader", true);
        try {
            let json = {
                id: payload,
                uccCode: rootGetters['auth/getUserId']
            }
            let response = await Nomineeservice.deleteOldNominee(json);

            if (response.status == 200 && response.data.message == "Success") {

                await dispatch("getupdateNomineeDetails")
            }
        } catch (error) {
            errorHandle.handleError(error)
            // commit("setDeleteLoader", false);
        }
        // commit("setDeleteLoader", false);
    },

    async getOldDeleteNominee({ state, commit, dispatch, rootState, rootGetters }, payload) {
        commit('setolddeletenomniee', []);
        try {
            let uccCode = rootGetters['auth/getUserId']
            let response = await Nomineeservice.getOldDeleteNominee(uccCode);

            if (response.status == 200 && response.data.message == "Success") {
                commit('setolddeletenomniee', response.data.result);

            }
        } catch (error) {
            errorHandle.handleError(error)
            // commit("setDeleteLoader", false);
        }
        // commit("setDeleteLoader", false);
    },
};

const mutations = {
    setNomineeStage(state, payload) {
        state.nomineeStage = payload
    },

    setNomineeList(state, payload) {
        state.nomineeList = payload;
        this.commit('nominee/setNomineeDetails', state.nomineeList)
    },
    setNomineeID(state, payload) {
        state.setNomineeID = payload;
    },
    setNomineeDetails(state, payload) {
        state.nomineeList = payload
        sessionStorage.setItem('nomineeList', JSON.stringify(state.nomineeList))
        if (state.nomineeList.length > 0) {
            this.commit('nominee/setNomineeStage', 'nomineeSummary')
        }
    },

    deleteNominee(state, id) {
        // state.nomineeList.splice(id, 1);
        // if (state.nomineeList?.length == 0) {
        //     this.commit('nominee/setNomineeStage', 'initialList')
        // }
        state.deletenomineeId = id
        // this.commit('nominee/setNomineeDetails', state.nomineeList)
    },
    setolddeletenomniee(state, payload) {
        state.getOldDeleteNominee = payload
    },
    setIsMinor(state, payload) {
        state.isMinor = payload
    },
    setNomineeDetails(state, payload) {
        state.NomineeDetails = payload
    },
    setGuardianDateErrMsg(state, payload) {
        state.guardianDateErrMsg = payload
    },
    setIsPasswordPDF(state, payload) {
        state.isPasswordPDF = payload
    },
    setNomineepassword(state, payload) {
        state.nomineePassword = payload
    },
    setGuardianpassword(state, payload) {
        state.guardianPassord = payload
    },
    setIsNomineepass(state, payload) {
        state.isNomineepass = payload
    },
    setIsGuardianPass(state, payload) {
        state.isGuardianPass = payload
    },

    setnomineedialog(state, payload) {
        state.nomineedialog = payload
    },
    // setLoader(state, payload) {
    //     state.loader = payload
    // }
};

const getters = {
    getNomineeStage: state => state.nomineeStage,
    getNomineeList: state => state.nomineeList,
    getIsMinor: state => state.isMinor,
    getNomineeDetails: state => state.NomineeDetails,
    getGuardianDateErrMsg: (state) => state.guardianDateErrMsg,


    getIsPasswordPDF: (state) => state.isPasswordPDF,
    getNomineePassword: (state) => state.nomineePassword,
    getGuardianpassword: (state) => state.guardianPassord,
    getnomineedialog: (state) => state.nomineedialog,
    getshowNomineeDetails: (state) => state.showNomineeDetails,

};

const nominee = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default nominee

