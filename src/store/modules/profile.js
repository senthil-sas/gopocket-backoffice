import service from "../httpService"
const state = {
    profileData: [],
    loader: false
}

const actions = {
    async getProfileDataFromApi({ commit }) {
        try {
            commit('setLoader', true)
            service.getProfileDetails().then(resp => {
                if(resp.data?.message?.data) {
                    commit('setProfileData',resp.data.message.data)
                } else {
                    commit('setProfileData', [])
                }
            }).finally(()=> {
                commit('setLoader', false)
            })
        } catch (error) {
            
        }
    }
};

const mutations = {
    setProfileData(state, payload) {
        state.profileData = payload
    },
    setLoader(state, payload) {
        state.loader = payload
    }
};

const getters = {
    getProfileData: state => state.profileData,
    getLoader: state => state.loader
};

const nominee = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default nominee

