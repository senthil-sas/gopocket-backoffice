<template>
    <div>
        <tabs :isBgBlue="true" name="dashboard" @activeTab="changeTab"/>
        <div class="h-[calc(100vh-96px)] overflow-y-auto">
            <accounts_graph v-if="currentTab == 0"/>
            <funds v-if="currentTab == 1" />
            <positions v-if="currentTab == 2" />
        </div>
    </div>
</template>

<script>

import tabs from '../components/utilComponents/tabs.vue'
import accounts_graph from './dashboard/accounts-graph.vue'
import funds from './dashboard/funds.vue'
import positions from './dashboard/positions.vue'
export default {
    components: { tabs, accounts_graph, funds, positions },
    data() {
        return {
            currentTab: 0
        }
    },
    methods: {
        changeTab(id) {
            this.currentTab = id;
            sessionStorage.setItem('dashboard', JSON.stringify(id))
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id : id })
        }
    },
    created() {
        let tab = JSON.parse(sessionStorage.getItem('dashboard')) || 0
        if(tab == 0 || tab) {
            this.changeTab(tab)
        } else {
            this.changeTab(0)
        }
    }
}
</script>