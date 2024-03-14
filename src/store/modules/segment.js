import service from "../httpService";
const state = {
    segments : []
}

const actions = {
    async getSegmentsFromApi({state,commit}, payload) {
        try {
            service.getSegments().then(resp=>{
                if(resp.data.data[0]) {
                    commit('setSegments', resp.data.data[0])
                }
            })
        } catch (error) {
            
        }
    }
};

const mutations = {
    setSegments(state, payload) {
        state.segments = payload
    }
};

const getters = {
    getSegments: state => state.segments
};

const segments = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default segments

