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
    isNewEmailOrNewMobileUpdate: false,
    loginloader: false,

};

const actions = {
    loginEmailAndMobile({ commit, rootState }, option) {
        commit('setloginEmailAndMobile', []);
        commit('setloginloader', true,);

        const requestData = {
            ucc: rootState.auth.userId,
            option: option,
            mobileNo: option == 0 ? "9787036838" : null,
            emailId: option == 1 ? "akashraja@codifi.in" : null,
        };
        state.active = option
        service.loginEmailAndMobile(requestData)
            .then(resp => {
                console.log(resp)
                if (resp.data.message.toString().trim() == "Success" && resp.status == "200") {
                    commit('setloginEmailAndMobile', resp.data.result);
                    state.LoginId = resp.data.result.id
                    commit('popup/setIsOtpVerify', true, { root: true })
                    commit('popup/setIsEmailOrMobileUpdate', false, { root: true })
                    // console.log(resp.data.result.id);
                } else {
                    notify({
                        group: "auth",
                        type: "error",
                        title: resp.data.reason,
                    });
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                    notify({
                        group: "auth",
                        type: "error",
                        title: err.resp.data.reason,
                    });
                })
            .finally(() => {
                commit('setloginloader', false,);

            });
    },

    verifyOTP({ commit, rootState }, otp) {
        commit('setLoader', true, { root: true });

        const requestData = {
            option: state.active,
            mobileNo: state.active == 0 ? "9787036838" : null,
            emailId: state.active == 1 ? "akashraja@codifi.in" : null,
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
                        title: resp.data.reason,
                    });
                }
                return resp
            })
            .catch(err => {
                errorHandle.handleError(err);
                notify({
                    group: "auth",
                    type: "error",
                    title: err.resp.data.reason,
                });
            })
            .finally(() => {
                commit('setLoader', false, { root: true });
            });
    },
    UpdateMobileNumber({ commit, state }, NewMobile) {
        commit('setUpdateMobileNumber', []);
        commit('setLoader', true, { root: true });


        service.UpdateMobileNumber(NewMobile, state.LoginId)
            .then(resp => {
                // console.log(resp);
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setUpdateMobileNumber', resp.data.result);

                } else {
                    notify({
                        group: "auth",
                        type: "error",
                        title: resp.data.reason,
                    });
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                    notify({
                        group: "auth",
                        type: "error",
                        title: err.resp.data.reason,
                    });
                })
            .finally(() => {
                commit('setLoader', false, { root: true });

            });
    },
    verifyMobileNumber({ commit, state }, otp) {
        commit('setverifyMobileNumber', []);
        commit('setloginloader', true,);


        service.verifyMobileNumber(otp, state.LoginId)
            .then(resp => {
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setverifyMobileNumber', resp.data.result);
                    commit('popup/setisNewEmailOrNewMobileUpdate', false, { root: true }); // Assuming you have a 'popup' module
                    notify({
                        group: "auth",
                        type: "success",
                        title: resp.data.message,
                    });
                } else {

                    notify({
                        group: "auth",
                        type: "error",
                        title: resp.data.reason,
                    });
                }
            })
            .catch(err => {
                errorHandle.handleError(err);
                notify({
                    group: "auth",
                    type: "error",
                    title: err.response.data.reason,
                });
            })
            .finally(() => {
                commit('setloginloader', false,);
            });

    },
    UpdateEmailId({ commit, state }, NewEmail) {
        commit('setUpdateEmailId', []);
        commit('setLoader', true, { root: true });

        service.UpdateEmailId(NewEmail, state.LoginId)
            .then(resp => {
                // console.log(resp);
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setUpdateEmailId', resp.data.result);

                } else {
                    notify({
                        group: "auth",
                        type: "error",
                        title: resp.data.reason,
                    });
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                    notify({
                        group: "auth",
                        type: "error",
                        title: err.resp.data.reason,
                    });
                })
            .finally(() => {
                commit('setLoader', false, { root: true });

            });
    },
    UpdateEmailIdverify({ commit }, otp) {
        commit('setUpdateEmailIdverify', []);
        commit('setloginloader', true,);

        service.UpdateEmailIdverify(otp, state.LoginId)
            .then(resp => {
                if ((resp.data.message.toString().trim() == "Success" && resp.status == "200")) {
                    commit('setUpdateEmailIdverify', resp.data.result);
                    commit('popup/setisNewEmailOrNewMobileUpdate', false, { root: true });
                    notify({
                        group: "auth",
                        type: "success",
                        title: resp.data.message,
                    });

                } else {

                    notify({
                        group: "auth",
                        type: "error",
                        title: resp.data.reason,
                    });
                }
            })
            .catch(err => {
                errorHandle.handleError(err);
                notify({
                    group: "auth",
                    type: "error",
                    title: err.response.data.reason,
                });
            })
            .finally(() => {
                commit('setloginloader', false,);
            });
    },
    getDigilocker({ commit, rootState },) {
        commit('setloginloader', true,);

        service.getDigilocker(rootState.auth.userId,)
            .then(resp => {
                console.log(resp.data.result);

                if (resp.status == 200 && resp?.data?.stat === 1) {
                    state.digiURL = resp?.data?.result;
                    window.open(state.digiURL, '_self')

                } else {
                }
            })
            .catch(err => {
                errorHandle.handleError(err);
                //    notify({
                //         group: "auth",
                //          type: "error",
                //         title: err.response.data.reason,
                //     });
            })
            .finally(() => {
                commit('setloginloader', false,);
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
    setloginloader(state, payload) {
        state.loginloader = payload
    },
};

const getters = {
    getloginEmailAndMobile: state => state.loginEmailAndMobile,
    getverifyOTP: state => state.verifyOTP,
    getverifyMobileNumber: state => state.verifyMobileNumber,
    getloginloader: state => state.loginloader,
};

const reekyc = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default reekyc;
