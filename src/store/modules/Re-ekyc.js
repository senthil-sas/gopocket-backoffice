import service from "../modules/services/Re-EKYC";
import errorHandle from '../../handleError/errorHandling'
import { useNotification } from "@kyvg/vue3-notification";
const { notify } = useNotification();


const state = {
    loginEmailAndMobile: [],
    verifyOTP: [],
    active: '',
    isOtpVerify: false,
    verifyMobileNumber: [],
    LoginId: '',

};

const actions = {
    loginEmailAndMobile({ commit, rootState }, option) {
        commit('setloginEmailAndMobile', []);
        const requestData = {
            ucc: rootState.auth.userId,
            option: option,
            mobileNo: option == 0 ? rootState.profile.mobileNO : null,
            emailId: option == 1 ? rootState.profile.EmailID : null,
        };
        state.active = option
        service.loginEmailAndMobile(requestData)
            .then(resp => {
                if (resp.data.message.toString().trim() == "Success" && resp.status == "200") {
                    commit('setloginEmailAndMobile', resp.data.result);
                    state.LoginId = resp.data.result.id
                    commit('popup/setIsOtpVerify', true, { root: true })
                    commit('popup/setIsEmailOrMobileUpdate', false, { root: true })
                    // console.log(resp.data.result.id);
                } else {

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },

    verifyOTP({ commit }, otp) {
        const requestData = {
            option: state.active,
            mobileNo: state.active == 0 ? rootState.profile.mobileNO : null,
            emailId: state.active == 1 ? rootState.profile.EmailID : null,
            otp: otp,
        };
        service.verifyOTP(requestData)
            .then(resp => {
                // console.log('jk33', resp)

                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setverifyOTP', resp.data.result);
                    // commit('setIsOtpVerify', true);
                    commit('popup/setIsOtpVerify', false, { root: true }); // Assuming you have a 'popup' module
                    commit('popup/setisNewEmailOrNewMobileUpdate', true, { root: true }); // Assuming you have a 'popup' module
                } else {
                    notify({
                        group: "auth",
                        type: "error",
                        title: "Invalid OTP", // Notify for invalid OTP
                    });
                }
                return resp
            })
            .catch(err => {
                errorHandle.handleError(err);
                notify({
                    group: "auth",
                    type: "error",
                    title: "Invalid OTP", // Notify for invalid OTP
                });
            });
    },
    UpdateMobileNumber({ commit, state }, NewMobile) {
        commit('setUpdateMobileNumber', []);


        service.UpdateMobileNumber(NewMobile, state.LoginId)
            .then(resp => {
                // console.log(resp);
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setUpdateMobileNumber', resp.data.result);
                } else {
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },
    verifyMobileNumber({ commit, state }, otp) {
        commit('setverifyMobileNumber', []);

        service.verifyMobileNumber(otp, state.LoginId)
            .then(resp => {
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setverifyMobileNumber', resp.data.result);
                    commit('popup/setisNewEmailOrNewMobileUpdate', false, { root: true }); // Assuming you have a 'popup' module
                } else {

                    notify({
                        group: "auth",
                        type: "error",
                        title: "Invalid OTP",
                    });
                }
            })
            .catch(err => {
                // Handle error
                errorHandle.handleError(err);
                // Notify for invalid OTP
                notify({
                    group: "auth",
                    type: "error",
                    title: "Invalid OTP",
                });
            });
    },
    UpdateEmailId({ commit, state }, NewEmail) {
        commit('setUpdateEmailId', []);

        service.UpdateEmailId(NewEmail, state.LoginId)
            .then(resp => {
                // console.log(resp);
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setUpdateEmailId', resp.data.result);

                } else {

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },
    UpdateEmailIdverify({ commit }, otp) {
        commit('setUpdateEmailIdverify', []);
        service.UpdateEmailIdverify(otp, state.LoginId)
            .then(resp => {
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setUpdateEmailIdverify', resp.data.result);
                    commit('popup/setisNewEmailOrNewMobileUpdate', false, { root: true });

                } else {

                    notify({
                        group: "auth",
                        type: "error",
                        title: "Invalid  email OTP",
                    });
                }
            })
            .catch(err => {
                // Handle error
                errorHandle.handleError(err);
                // Notify for invalid OTP
                notify({
                    group: "auth",
                    type: "error",
                    title: "Invalid  OTP",
                });
            });
    },



};


const mutations = {
    setloginEmailAndMobile(state, payload) {
        state.loginEmailAndMobile = payload;
    },
    setIsOtpVerify(state, value) {
        state.isOtpVerify = value;
    },
    setIsNewEmailOrNewMobileUpdate(state, value) {
        state.isNewEmailOrNewMobileUpdate = value;
    },
    setverifyOTP(state, value) {
        state.verifyOTP = value;
    },
    setUpdateMobileNumber(state, payload) {
        state.UpdateMobileNumber = payload;
    },
    setverifyMobileNumber(state, value) {
        state.verifyMobileNumber = value;
    },
    setUpdateEmailId(state, payload) {
        state.UpdateEmailId = payload;
    },
    setUpdateEmailIdverify(state, payload) {
        state.UpdateEmailIdverify = payload;
    },
};

const getters = {
    getloginEmailAndMobile: state => state.loginEmailAndMobile,
    getverifyOTP: state => state.verifyOTP,
    getverifyMobileNumber: state => state.verifyMobileNumber,

};

const reekyc = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default reekyc;
