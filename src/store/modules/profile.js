import service from "../modules/services/profile.ts";
import dashboardService from "../modules/services/Dasboard.ts"
import errorHandle from '../../handleError/errorHandling'


const state = {
    profileData: [],
    bankdetails: [],
    segments: [],
    loader: false,
    isAddBank: false,
    mobileNO: '',
    EmailID: '',
    fundDetails:''

};

const actions = {

    getProfileDataFromApi({ commit }, userId) {
        commit('setProfileData', []);
        commit('setbankdetails', []);
        commit("setSegments", []);
        commit('setLoader', true, { root: true });

        service.getProfileDataFromApi(userId)
            .then(resp => {
                if (resp.data?.data) {
                    commit('setProfileData', resp.data.data);
                    commit('setbankdetails', resp.data.data.fsl_bank_table);
                    commit('setSegments', resp.data.data);
                    commit('setmobileNo', resp.data.data.mobile_no)
                    commit('setemailID', resp.data.data.email_id)

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

    // get funds details
    getFundsDetails({ commit }, userId) {
        commit('setLoader', true, { root: true });
        commit('setFundsDetails', '')
        dashboardService.getFundsDetails(userId).then(resp => {
            if (resp.data && resp.data.status == 'Ok' && resp.data.result.length > 0) {
                commit('setFundsDetails', resp.data.result[0])
            } else {
            }
            },(err) => {
                errorHandle.handleError(err)
            })
            .finally(() => {
                commit('setLoader', false, { root: true });
            });
    }

};

const mutations = {
    setProfileData(state, payload) {
        state.profileData = payload;
        // console.log(payload);
    },
    setbankdetails(state, payload) {
        state.bankdetails = payload;
    },

    setSegments(state, payload) {
        state.segments = payload;
    },
    setIsAddBank(state, payload) {
        state.isAddBank = payload
    },
    setmobileNo(state, payload) {
        state.mobileNO = payload;
    },
    setemailID(state, payload) {
        state.EmailID = payload;
    },
    setFundsDetails(state, payload){
        state.fundDetails = payload
    }
};

const getters = {
    getProfileData: state => state.profileData,
    getbankdetails: state => state.bankdetails,
    getSegments: state => state.segments,
    getbankdetails: state => state.bankdetails,
    getmobileNO: state => state.mobileNO,
    getEmailID: state => state.EmailID,
    getFundDetails: state => state.fundDetails
};

const profile = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default profile;
