<template>
    <tabs :isBgBlue="true" page="profile" @activeTab="changeTab"/>
    <div class="h-[calc(100vh-96px)] overflow-y-auto">
        <bank_details v-if="getProfileCurrentTab == 0" />
        <nominee v-if="getProfileCurrentTab == 1" />
        <segments v-if="getProfileCurrentTab == 2" />
        <documents v-if="getProfileCurrentTab == 3" />
        <income_proof v-if="getProfileCurrentTab == 4"/>
        <sidebar v-if="getProfileCurrentTab == 5" :isBox="false" />
    </div>
</template>

<script>
import tabs from '../components/utilComponents/tabs.vue'
import income_proof from './profile/income-proof.vue'
import bank_details from './profile/bank-details.vue'
import nominee from './profile/nominee/nominee.vue'
import segments from './profile/segments.vue'
import documents from './profile/documents.vue'
import sidebar from '../components/sidebar.vue'
import { mapGetters } from 'vuex'
export default {
    components: { tabs, income_proof, bank_details, nominee, segments, documents, sidebar },
    data() {
        return { }
    },
    computed: {
        ...mapGetters('tabs',['getProfileCurrentTab'])
    },
    methods: {
        changeTab(id) {
            this.$store.commit('tabs/setProfileCurrentTab', id)
            sessionStorage.setItem('profileTab', JSON.stringify(id))
            this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id: id })
            this.$store.commit('bankDetails/setIsAddBank', false);
            this.$store.commit('nominee/setNomineeStage', '');
        }
    },
    created() {
        let tab = JSON.parse(sessionStorage.getItem('profileTab')) || 0
        if(tab == 0 || tab) {
            this.changeTab(tab)
        } else {
            this.changeTab(0)
        }
    }
}
</script>