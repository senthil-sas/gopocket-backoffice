const state = {
    reportTabs : [
        { name: 'Tradebook', id: 0, active: true, count: '0' },
        { name: 'P&L', id: 1, active: false, count: '0' },
        // { name: 'Tax P&L', id: 2, active: false, count: '0' },
        { name: 'Ledger', id: 2, active: false, count: '0' },
        // { name: 'Downloads', id: 4, active: false, count: '0' },
    ],
    holdingsTabs: [
        { name: 'My Holdings', id: 0, active: true, count: '0' },
        { name: 'Family', id: 1, active: false, count: '0' },
        { name: 'Gift Stocks', id: 2, active: false, count: '0' },
    ],
    actionTabs: [
        { name: 'Corporate Action', id: 0, active: true, count: '0' },
        { name: 'Margin Pledge', id: 1, active: false, count: '0' },
        { name: 'Edis Authorization', id: 2, active: false, count: '0' },
    ],
    profileTabs: [
        { name: 'Bank Details', id: 0, active: true, count: '0' },
        { name: 'Nominee', id: 1, active: false, count: '0' },
        { name: 'Segments', id: 2, active: false, count: '0' },
        { name: 'Documents', id: 3, active: false, count: '0' },
        { name: 'Income Proof', id: 4, active: false, count: '0' },
        { name: 'Personal Profile', id: 5, active: false, count: '0' }
    ],
    dashboardTabs: [
        { name: 'Accounts', id: 0, active: true, count: '0' },
        // { name: 'Funds', id: 1, active: false, count: '0' },
        { name: 'Positions', id: 2, active: false, count: '0' },
        { name: 'Ledger', id: 3, active: false, count: '0' }
    ],
    profileCurrentTab: 0
}

const actions = {
    async setActiveTab({ state, commit, rootGetters }, payload) {
        let data = []
        if(payload.path == '/reports') {
            data = state.reportTabs
        } else if(payload.path == '/holdings') {
            data = state.holdingsTabs
        } else if(payload.path == '/action') {
            data = state.actionTabs
        } else if(payload.path == '/profile') {
             data = state.profileTabs
        } else if(payload.path == '/dashboard') {
            data = state.dashboardTabs
        }

        if(data) {
            data.forEach(el => {
                if(el.id == payload.id) {
                    el.active = true
                } else {
                    el.active = false
                }
            });
        }

        if (payload.path == '/reports') {
            state.reportTabs = data
        } else if (payload.path == '/holdings') {
            state.holdingsTabs = data
        } else if (payload.path == '/action') {
            state.actionTabs = data
        } else if (payload.path == '/profile') {
            state.profileTabs = data
        } else if (payload.path == '/dashboard') {
            state.dashboardTabs = data
        }
    },
};

const mutations = {
    setProfileCurrentTab(state, payload) {
        state.profileCurrentTab = payload
    }
};

const getters = {
    getReportTabs: state => state.reportTabs,
    getHoldingsTabs: state => state.holdingsTabs,
    getActionTabs: state => state.actionTabs,
    getProfileTabs: (state) => state.profileTabs,
    getDashboardTabs: state => state.dashboardTabs,
    getProfileCurrentTab: state => state.profileCurrentTab
};

const tabs = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default tabs

