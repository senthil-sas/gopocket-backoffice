import service from "../modules/services/profile.ts";
import errorHandle from '../../handleError/errorHandling'


const state = {
    profileData: [],
    bankdetails: [],
    segments: [],
    loader: false,
};

const actions = {
    // async getProfileDataFromApi({ commit }, userId) {
    //     commit('setProfileData', []);
    //     commit('setbankdetails', []);
    //     commit("setSegments", []);
    //     try {
    //         commit('setLoader', true);
    //         const resp = await service.getProfileDataFromApi(userId);
    //         // console.log(resp.data.data.fsl_bank_table)

    //         if (resp.data?.data) {
    //             commit('setProfileData', resp.data.data);
    //             commit('setbankdetails', resp.data.data.fsl_bank_table);
    //             commit('setSegments', resp.data.data);


    //         } else {
    //         }
    //     } catch (error) {
    //         // Handle error
    //         console.error(error);
    //     } finally {
    //         commit('setLoader', false);
    //     }
    // }

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
    },
    setbankdetails(state, payload) {
        state.bankdetails = payload;
    },

    setSegments(state, payload) {
        state.segments = payload;
    }
};

const getters = {
    getProfileData: state => state.profileData,
    getbankdetails: state => state.bankdetails,
    getSegments: state => state.segments
};

const profile = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default profile;
