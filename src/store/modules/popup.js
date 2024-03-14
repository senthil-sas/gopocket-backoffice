const state = {
    isResetSupportCode: false,
    isOtpVerify: false,
    verificationType: '',
    isEmailOrMobileUpdate: false,
    updateType: ''
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
    }
};

const getters = {
    getIsResetSupportCode: state => state.isResetSupportCode,
    getVerificationType: state => state.verificationType,
    getIsOtpVerify: state => state.isOtpVerify,
    getIsEmailOrMobileUpdate: state => state.isEmailOrMobileUpdate,
    getUpdateType: state => state.updateType
};

const popup = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default popup

