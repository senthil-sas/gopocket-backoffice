import service from "../modules/services/Dasboard";
import errorHandle from '../../handleError/errorHandling'
import { root } from "postcss";

const state = {
    positionData: []
}

const actions = {
    // getPositionsFromApi({ commit }, payload) {
    //     commit('setPositionData', [])
    //     try {
    //         service.getPositionsFromApi(payload).then(resp => {
    //             if (resp.data.message.data.positions != 'Positions Not Exists') {
    //                 commit('setPositionData', resp.data.message.data.positions)
    //             } else {
    //             }
    //         })
    //     } catch (error) {

    //     }
    // }



    getPositionsFromApi({ commit, rootGetters }, userId) {
        commit('setPositionData', []);
        commit('setLoader', true, { root: true });

        let json = {
            "userId":rootGetters['auth/getUserId']
        }
        service.getPositionsFromApi(json)
            .then(resp => {
                if (resp.data.result.length > 0 && resp.data.status == 'Ok') {
                    commit('setPositionData', resp.data.result);
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

