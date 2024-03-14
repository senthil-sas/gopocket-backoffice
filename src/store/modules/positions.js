import service from "../httpService";
const state = {
    positionData: []
}

const actions = {
    getPositionsFromApi({commit}) {
        try {
            service.getPositions().then(resp => {
                if(resp?.data?.result) {
                    commit('setPositionData', resp?.data?.result)
                } else {
                    commit('setPositionData', [])
                }
            })
        } catch (error) {
            
        }
    }
};

const mutations = {
    setPositionData(state, payload) {
        state.positionData = payload
    }
};

const getters = {
    getPositionData: state => state.positionData,
};

const positions = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default positions

