<template>
    <tabs :isBgBlue="true" page="action" @activeTab="changeTab"/>
    <corporate_action v-if="currentTab == 0" />
    <margin_pledge v-if="currentTab == 1"/>
    <edis_authorize v-if="currentTab == 2" />
</template>

<script>
import tabs from '../components/utilComponents/tabs.vue'
import corporate_action from './actions/corporate-margin.vue'
import margin_pledge from './actions/margin-pledge.vue'
import edis_authorize from './actions/edis-authorize.vue'
export default {
    components: { tabs, corporate_action, margin_pledge, edis_authorize },
    data() {
        return {
            currentTab: 0
        }
    },
    methods: {
        changeTab(id) {
            this.currentTab = id
            sessionStorage.setItem('actionTab', JSON.stringify(id))
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id : id })
        }
    },
    created() {
        let tab = JSON.parse(sessionStorage.getItem('actionTab')) || 0
        if(tab == 0 || tab) {
            this.changeTab(tab)
        }
    }
}
</script>