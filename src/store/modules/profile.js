import service from "../modules/services/profile.ts";
import errorHandle from '../../handleError/errorHandling'


const state = {
    profileData: [],
    bankdetails: [],
    segments: [],
    loader: false,
    isAddBank: false,
    mobileNO: '',
    EmailID: '',


};

const actions = {

    getProfileDataFromApi({ commit }, userId) {
        commit('setProfileData', []);
        commit('setbankdetails', []);
        commit("setSegments", []);
        commit('setLoader', true, { root: true });

        service.getProfileDataFromApi(userId)
            .then(resp => {
                console.log(resp.data.data.mobile_no)

                if (resp.data?.data) {
                    commit('setProfileData', resp.data.data);
                    commit('setbankdetails', resp.data.data.fsl_bank_table);
                    commit('setSegments', resp.data.data);
                    commit('setmobileNo', resp.data.data.mobile_no)
                    commit('setemailID', resp.data.data.email_id)

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
    setmobileNo(state, payload) {
        state.mobileNO = payload;
    },
    setemailID(state, payload) {
        state.EmailID = payload;
    },
};

const getters = {
    getProfileData: state => state.profileData,
    getbankdetails: state => state.bankdetails,
    getSegments: state => state.segments,
    getbankdetails: state => state.bankdetails,
    getmobileNO: state => state.mobileNO,
    getEmailID: state => state.EmailID

};

const profile = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default profile;
