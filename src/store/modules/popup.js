const state = {
    isResetSupportCode: false,
    isOtpVerify: false,
    verificationType: '',
    isEmailOrMobileUpdate: false,
    updateType: '',
    isNewEmailOrNewMobileUpdate: false,
}

const actions = {};

const mutations = {
    setIsResetSupportCode(state, payload) {
        state.isResetSupportCode = payload
    },
    setVerificationType(state, payload) {
        state.verificationType = payload
    },
    setIsOtpVerify(state, payload) {
        state.isOtpVerify = payload
    },
    setIsEmailOrMobileUpdate(state, payload) {
        state.isEmailOrMobileUpdate = payload
    },
    setUpdateType(state, payload) {
        state.updateType = payload
    },
    setisNewEmailOrNewMobileUpdate(state, payload) {
        state.isNewEmailOrNewMobileUpdate = payload
    },
};

const getters = {
    getIsResetSupportCode: state => state.isResetSupportCode,
    getVerificationType: state => state.verificationType,
    getIsOtpVerify: state => state.isOtpVerify,
    getIsEmailOrMobileUpdate: state => state.isEmailOrMobileUpdate,
    getUpdateType: state => state.updateType,
    getisNewEmailOrNewMobileUpdate: state => state.isNewEmailOrNewMobileUpdate,

};

const popup = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default popup

