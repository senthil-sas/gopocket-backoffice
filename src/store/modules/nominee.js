import service from "../modules/services/profile.ts";
import Nomineeservice from "../modules/services/Nominee.ts";

import errorHandle from '../../handleError/errorHandling'

const state = {
    nomineeStage: 'initialList',
    nomineeList: [],
    isMinor: false,
    NomineeDetails: [],
    guardianDateErrMsg: '',
    // password PDF
    isPasswordPDF: false,
    nomineePassword: '',
    guardianPassord: '',
    isNomineepass: false,
    isGuardianPass: false,


}
const actions = {


    async getupdateNomineeDetails({ commit, rootGetters }) {
        commit('setNomineeList', []);
        commit('setLoader', true, { root: true });
        let userId = rootGetters['auth/getUserId']

        service.getupdateNomineeDetails(userId)
            .then(resp => {
                console.log(resp)
                if (resp.data?.message?.data?.fsl_nominee_details) {
                    commit('setNomineeList', resp.data.message.data?.fsl_nominee_details);
                    if (resp.data.message.data?.fsl_nominee_details.length) {
                        commit('setNomineeStage', 'nomineeSummary');
                    } else {
                        commit('setNomineeStage', 'initialList');
                    }
                } else {
                }
            },
                (err) => {
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
        // commit('setIsNomineepass', f/alse)
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
                    // commit('Notification/setNotificationMsg', { show: true, header: '', subHeader: 'Please Enter Valid Password', status: 'info' }, { root: true })
                } else if (response.data.reason == 'Cannot decrydpt PDF of Guardian, the password is incorrect') {
                    commit('setIsGuardianPass', true)
                    // commit('Notification/setNotificationMsg', { show: true, header: '', subHeader: 'Please Enter Valid Password', status: 'info' }, { root: true })
                }
                commit('setIsPasswordPDF', true)
            } else {
                if (response.data?.reason == 'You are not verified Customer please reverified') {
                    // commit('Notification/setNotificationMsg', { show: true, header: 'Error', subHeader: ' You are not verified Customer please reverified - You have logged in via same credentials with another device.', status: 'failed' }, { root: true })
                    router.push('/')
                } else {
                    // commit('Notification/setNotificationMsg', { show: true, header: 'Error', subHeader: response.data.reason, status: 'failed' }, { root: true })
                }
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

                } else {

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },
};

const mutations = {
    setNomineeStage(state, payload) {
        state.nomineeStage = payload
    },

    setNomineeList(state, payload) {
        state.nomineeList.push(payload)
        if (state.nomineeList.length == 1) {
            state.nomineeList[0].nomineeShare = 100
        }
        if (state.nomineeList.length == 2) {
            state.nomineeList[0].nomineeShare = 50
            state.nomineeList[1].nomineeShare = 50
        }
        if (state.nomineeList.length == 3) {
            state.nomineeList[0].nomineeShare = 50
            state.nomineeList[1].nomineeShare = 25
            state.nomineeList[2].nomineeShare = 25
        }
        this.commit('nominee/setNomineeDetails', state.nomineeList)
        state.nomineeList = payload
    },

    setNomineeDetails(state, payload) {
        state.nomineeList = payload
        sessionStorage.setItem('nomineeList', JSON.stringify(state.nomineeList))
        if (state.nomineeList.length > 0) {
            this.commit('nominee/setNomineeStage', 'nomineeSummary')
        }
    },

    deleteNominee(state, id) {
        state.nomineeList.splice(id, 1);
        if (state.nomineeList?.length == 0) {
            this.commit('nominee/setNomineeStage', 'initialList')
        }
        this.commit('nominee/setNomineeDetails', state.nomineeList)
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
    }
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
    getGuardianpassword: (state) => state.guardianPassord


};

const nominee = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default nominee

