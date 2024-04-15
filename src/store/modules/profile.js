import service from "../modules/services/profile.ts";
import errorHandle from '../../handleError/errorHandling'


const state = {
    profileData: [],
    bankdetails: [],
    segments: [],
    loader: false,
    isAddBank: false

};

const actions = {

    getProfileDataFromApi({ commit }, userId) {
        commit('setProfileData', []);
        commit('setbankdetails', []);
        commit("setSegments", []);
        commit('setLoader', true, { root: true });

        service.getProfileDataFromApi(userId)
            .then(resp => {
                if (resp.data?.data) {
                    commit('setProfileData', resp.data.data);
                    commit('setbankdetails', resp.data.data.fsl_bank_table);
                    commit('setSegments', resp.data.data);
                } else {
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
                commit('setLoader', false, { root: true });
            });
    }

};

const mutations = {
    setProfileData(state, payload) {
        state.profileData = payload;
        // console.log(payload);
    },
    setbankdetails(state, payload) {
        state.bankdetails = payload;
    },

    setSegments(state, payload) {
        state.segments = payload;
    },
    setIsAddBank(state, payload) {
        state.isAddBank = payload
    },
};

const getters = {
    getProfileData: state => state.profileData,
    getbankdetails: state => state.bankdetails,
    getSegments: state => state.segments,
    getbankdetails: state => state.bankdetails

};

const profile = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default profile;
