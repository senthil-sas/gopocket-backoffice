<template>
    <tabs :isBgBlue="true" page="holdings" @activeTab="changeTab"/>
    <!-- <div class="h-[calc(100vh-96px)] overflow-y-auto"> -->
        <my_holdings v-if="currentTab == 0" />
        <familyComp v-if="currentTab == 1" />
        <gift_stocks v-if="currentTab == 2" />
    <!-- </div> -->
</template>

<script>
import tabs from '../components/utilComponents/tabs.vue'
import familyComp from './Holdings/family.vue'
import my_holdings from './Holdings/my-holdings.vue'
import gift_stocks from './Holdings/gift-stocks.vue'
export default {
    components: { tabs, familyComp, my_holdings, gift_stocks },
    data() {
        return {
            currentTab : 1
        }
    },
    methods: {
        changeTab(id) {
            this.currentTab = id
            sessionStorage.setItem('portfolioTab', JSON.stringify(id))
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id : id })
            this.$store.commit('subAcc/setIsAddSubAcc', false)
            this.$store.commit('giftStocks/setIsGiftSelect', false)
        }
    },
    created() {
        let tab = JSON.parse(sessionStorage.getItem('portfolioTab')) || 0
        if(tab == 0 || tab) {
            this.changeTab(tab)
        }
    }
}
</script>