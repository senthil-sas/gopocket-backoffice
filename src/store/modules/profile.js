import service from "../modules/services/profile.ts";

const state = {
    profileData: [],
    bankdetails: [],
    loader: false,
};

const actions = {
    async getProfileDataFromApi({ commit }) {
        commit('setProfileData', []);
        commit('setbankdetails', []);
        try {
            commit('setLoader', true);
            const resp = await service.getProfileDataFromApi();
            // console.log(resp.data.data.fsl_bank_table)

            if (resp.data?.data) {
                commit('setProfileData', resp.data.data);
                commit('setbankdetails', resp.data.data.fsl_bank_table);

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
    }
};

const getters = {
    getProfileData: state => state.profileData,
    getbankdetails: state => state.bankdetails,
    getLoader: state => state.loader
};

const profile = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default profile;
