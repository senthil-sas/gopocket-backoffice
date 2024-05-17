import service from "../modules/services/segments.ts";
import errorHandle from '../../handleError/errorHandling'
const state = {
    segments: [],
    currentSegment: "ALL SEGMENTS",
    savedSegmentetails: [],
    segmentId: "",
    reKYCsegment: [],



}

const actions = {
    async saveSegmentDetails({ state, commit, dispatch, rootGetters }, payload) {
        commit('reekyc/setloginloader', true, { root: true });
        try {

            let response = await service.saveSegmentDetails(payload);
            if (response.status == 200 && response?.data?.stat === 1) {
                // commit("common/setcurrentTab", "4", { root: true });
                await dispatch("reKYCsegment")

            } else {
                // commit('Notification/setNotificationMsg', { show: true, header: 'Error', subHeader: response?.data?.reason, status: 'failed' }, { root: true })
            }
        } catch (error) {
            // dispatch('errorHandle/unauthorizeHandle', error, { root: true })
            // commit("setLoader", false, { root: true });
        }
        commit('reekyc/setloginloader', true, { root: true });
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

    async reKYCsegment({ commit, rootState },) {
        commit('setreKYCsegment', []);

        await service.reKYCsegment(rootState.auth.userId,)
            .then(async resp => {
                if (resp.status == 200 && resp?.data?.stat === 1) {
                    commit('setreKYCsegment', resp.data.result);

                } else {

                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
            });
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
    setreKYCsegment(state, payload) {
        state.reKYCsegment = payload
    },
};

const getters = {
    getSavedSegmentDetails: (state) => state.savedSegmentetails,
    getSegments: state => state.segments,
    getreKYCsegment: state => state.reKYCsegment

};

const segment = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default segment

