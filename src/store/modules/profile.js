import service from "../modules/services/profile.ts";

const state = {
    profileData: [],
    bankdetails: [],
    segements: [],
    loader: false,
};

const actions = {
    async getProfileDataFromApi({ commit }) {
        commit('setProfileData', []);
        commit('setbankdetails', []);
        commit("setSegments", []);
        try {
            commit('setLoader', true);
            const resp = await service.getProfileDataFromApi();
            // console.log(resp.data.data.fsl_bank_table)

            if (resp.data?.data) {
                commit('setProfileData', resp.data.data);
                commit('setbankdetails', resp.data.data.fsl_bank_table);
                commit('setSegments', resp.data.data);


            } else {
            }
        } catch (error) {
            // Handle error
            console.error(error);
        } finally {
            commit('setLoader', false);
        }
    }
};

const mutations = {
    setProfileData(state, payload) {
        state.profileData = payload;
    },
    setbankdetails(state, payload) {
        state.bankdetails = payload;
    },
    setLoader(state, payload) {
        state.loader = payload;
    },
    setSegments(state, payload) {
        state.segments = payload;
    }
};

const getters = {
    getProfileData: state => state.profileData,
    getbankdetails: state => state.bankdetails,
    getLoader: state => state.loader,
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
