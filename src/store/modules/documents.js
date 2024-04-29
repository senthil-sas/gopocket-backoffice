import service from "../modules/services/Documents.ts";
import errorHandle from '../../handleError/errorHandling'


const state = {
    Documents: [],
    loader: false,
};

const actions = {
    getDocuments({ commit, rootState }, documentId) {
        commit('setLoader', true, { root: true });

        commit('setDocuments', []);

        service.getDocuments(rootState.auth.userId, documentId)
            .then(resp => {
                if (resp.data.message.toString().trim() == "Success" && resp?.data?.stat === 1) {
                    commit('setDocuments', resp.data.success);

                } else {
                }
            },
                (err) => {
                    errorHandle.handleError(err)
                })
            .finally(() => {
                commit('setLoader', false, { root: true });

            });
    },

};

const mutations = {
    setDocuments(state, payload) {
        state.Documents = payload;
    },
};

const getters = {
    getDocuments: state => state.Documents,

};

const Documents = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default Documents;
