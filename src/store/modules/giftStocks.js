const state = {
    isGiftSelect: false,
    recipientsData: ''
}

const actions = {};

const mutations = {
    setIsGiftSelect(state, payload) {
        state.isGiftSelect = payload
    },
    setRecipientsData(state, payload) {
        state.recipientsData = payload
        this.commit('giftStocks/setIsGiftSelect', true)
    },
};

const getters = {
    getIsGiftSelect: state => state.isGiftSelect,
    getRecipientsData : state => state.recipientsData
};

const giftStocks = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default giftStocks

