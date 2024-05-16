import service from "../modules/services/Documents.ts";
import errorHandle from '../../handleError/errorHandling';
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();


const state = {
    Documents: [],
    loader: false,
    incomeproof: [],
};

const actions = {
    getDocuments({ commit, rootState }, documentId) {
        commit('setLoader', true, { root: true });

        commit('setDocuments', []);

        service.getDocuments(rootState.auth.userId, documentId)
            .then(resp => {
                if (resp.data.message.toString().trim() == "Success" && resp?.data?.stat == 1) {
                    commit('setDocuments', resp.data.success);
                    notify({
                        group: "auth",
                        type: "success",
                        title: resp.data.result,
                    });
                }
                else {
                    notify({
                        group: "auth",
                        type: "error",
                        title: resp.data.reason
                        ,
                    });
                }
            }).catch((error) => {
                errorHandle.handleError(error)
                notify({
                    group: "auth",
                    type: "error",
                    title: error.resp.data.reason,
                });
            }).finally(() => {
                commit('setLoader', false, { root: true });
            })
    },
    incomeupload({ commit }, json) {
        commit('setLoader', true, { root: true });

        commit('setincomeproof', []);
        let fd = new FormData();
        fd.append("uccCode", json.uccCode);
        fd.append("documentType", json.documentType);
        fd.append("typeOfProof", json.typeOfProof);
        fd.append("password", json.password)
        fd.append("annualIncome", json.annualIncome)
        fd.append("file", json.file)
        console.log(json);
        service.incomeupload(fd)
            .then(resp => {
                if (resp.data.message.toString().trim() == "Success" && resp?.data?.stat == 0) {
                    commit('setincomeproof', resp.data.result);
                }
                else {
                    // notify({
                    //     group: "auth",
                    //     type: "error",
                    //     title: resp.data.reason
                    //     ,
                    // });
                }
            }).catch((error) => {
                errorHandle.handleError(error)
                // notify({
                //     group: "auth",
                //     type: "error",
                //     title: error.resp.data.reason,
                // });
            }).finally(() => {
                commit('setLoader', false, { root: true });
            })
    },

};


const mutations = {
    setDocuments(state, payload) {
        state.Documents = payload;
    },
    setincomeproof(state, payload) {
        state.incomeproof = payload;
    },

};

const getters = {
    getDocuments: state => state.Documents,
    getincomeproof: state => state.incomeproof,


};

const Documents = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default Documents;
