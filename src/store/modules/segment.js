import service from "../modules/services/segments.ts";
import errorHandle from '../../handleError/errorHandling'
const state = {
    segments: [],
    currentSegment: "ALL SEGMENTS",
    savedSegmentetails: [],
    segmentId: "",


}

const actions = {
    async saveSegmentDetails({ state, commit, dispatch, rootGetters }, payload) {
        // commit("setLoader", true, { root: true });
        try {
            let json = {
                id: state.segmentId,
                uccCode: rootGetters['auth/getUserId'],
                equCash: state.currentSegment?.equity == true ? 1 : 0,
                mutFunds: state.currentSegment?.mFunds == true ? 1 : 0,
                ed: state.currentSegment?.eqDerivatives == true ? 1 : 0,
                cd: state.currentSegment?.currDerivatives == true ? 1 : 0,
                comm: state.currentSegment?.commodity == true ? 1 : 0,
                category: payload.category,
                consent: payload.consent
            };
            let response = await service.saveSegmentDetails(json);
            if (response.status == 200 && response?.data?.stat === 1) {
                // commit("common/setcurrentTab", "4", { root: true });
                await dispatch("getsegmentDetails")

            } else {
                // commit('Notification/setNotificationMsg', { show: true, header: 'Error', subHeader: response?.data?.reason, status: 'failed' }, { root: true })
            }
        } catch (error) {
            // dispatch('errorHandle/unauthorizeHandle', error, { root: true })
            // commit("setLoader", false, { root: true });
        }
        // commit("setLoader", false, { root: true });
    },
    async getsegmentDetails({ state, commit, dispatch, rootState, rootGetters }, payload) {
        // commit('setHeaderLoader', true, { root: true })
        try {
            let uccCode = rootGetters['auth/getUserId'];
            let response = await service.getsegmentDetails(uccCode);
            if (response.status == 200 && response?.data?.stat === 1) {
                state.savedSegmentetails = response?.data?.result;
                commit("setsegmentID", response.data.result.id)
            } else {
                state.savedSegmentetails = ''
            }
        } catch (error) {
            // dispatch('errorHandle/unauthorizeHandle', error, { root: true })
            // commit('setHeaderLoader', false, { root: true })
        }


        // commit('setHeaderLoader', false, { root: true })
    },

};

const mutations = {
    setCurrentSegment(state, payload) {
        state.currentSegment = payload;
    },
    setSegments(state, payload) {
        state.segments = payload
    },
    setsegmentID(state, id) {
        console.log(id)
        state.segmentId = id
    },
};

const getters = {
    getSavedSegmentDetails: (state) => state.savedSegmentetails,

    getSegments: state => state.segments
};

const segment = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default segment

