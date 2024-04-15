import service from "../modules/services/Re-EKYC";
import errorHandle from '../../handleError/errorHandling'
import { useToast } from 'vue-toast-notification';


const state = {
    loginEmailAndMobile: [],
    verifyOTP: [],
    active: ''

};

const actions = {
    loginEmailAndMobile({ commit, rootState }, option) {
        commit('setloginEmailAndMobile', []);
        const requestData = {
            ucc: rootState.auth.userId,
            option: option,
            mobileNo: option == 0 ? 6382683037 : null,
            emailId: option == 1 ? 'akashraja@codifi.in' : null,
        };
        state.active = option
        service.loginEmailAndMobile(requestData)
            .then(resp => {

                if (resp.data?.result) {
                    commit('setloginEmailAndMobile', resp.data.result);
                } else {

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    },

    verifyOTP({ commit }, { otp }) {
        commit('setIsOtpVerify', false);
        commit('setIsNewEmailOrNewMobileUpdate', true);
        const requestData = {
            option: state.active,
            mobileNo: state.active == 0 ? 6382683037 : null,
            emailId: state.active == 1 ? 'vennila@codifi.in' : null,
            otp: otp,
        };
        service.verifylogin(requestData)
            .then(resp => {
                console.log(resp)

                if (resp.data && resp.data.result) {
                    commit('setverifylogin', resp.data.result);
                    commit('setIsNewEmailOrNewMobileUpdate', true);

                } else {
                    useToast.error('Invalid OTP'); // Show toast for invalid OTP

                }

            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
    }
};

const mutations = {
    setloginEmailAndMobile(state, payload) {
        state.loginEmailAndMobile = payload;
    },
    setverifylogin(state, payload) {
        state.verifylogin = payload;
    }
};

const getters = {
    getloginEmailAndMobile: state => state.loginEmailAndMobile,
    getverifylogin: state => state.verifylogin,

};

const reekyc = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default reekyc;
