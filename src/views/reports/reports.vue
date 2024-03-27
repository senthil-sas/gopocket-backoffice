<template>
    <tabs :isBgBlue="true" page="reports" @activeTab="changeTab" />
    <div class="p-5 w-full" v-if="currentTab == 0">
        <tradebook />
    </div>
    
    <tax_pnl v-if="currentTab == 1" />
    <ledger v-if="currentTab == 2" />
    
</template>


<script>
import tabs from '../../components/utilComponents/tabs.vue'
import heatmap from '../../components/charts/heatmap.vue'
import tax_pnl from './tax-pnl.vue'
import tradebook from './tradebook.vue';
import ledger from './ledger.vue';

export default {
    components: { tabs, heatmap, tradebook, ledger, tax_pnl },
    data() {
        return {
            currentTab : 0
        }
    },
    methods: {
        changeTab(id) {
            this.currentTab = id
            sessionStorage.setItem('reportsTab', JSON.stringify(id))
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id : id })
        }
    },
    
    created() {
        let tab = JSON.parse(sessionStorage.getItem('reportsTab')) || 0
        if(tab == 0 || tab) {
            this.changeTab(tab)
        }
    }
}
</script>