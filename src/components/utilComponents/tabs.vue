<template>
  <div class="flex border-b justify-between items-center" :class="{'secondary-violet-bg ': isBgBlue}">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab">
      <li class="mr-2 hover:font-bold" role="presentation" v-for="(b, id) in getTabs()" :key='id'
        @click="changeActive(b.id)" :id="`${$route.name}_${id}_b.name`">
        <button class="inline-block p-3 " type="button" :class="(b.active) ?
            'border-b-2 violet-color hover:violet-color dark:text-[#3977de] dark:hover:text-[#3977de] border-[#3977de] dark:border-[#3977de]' :
            'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
        ">
          {{ b.name }} <span v-if="b.count != '0'">{{ b.count }}</span>
        </button>
      </li>
      <spinner v-if="getLoader" />
    </ul>
    

    <span v-if="page == 'reports'">
      <DropdownList v-model="selectedMenu" :options="dropdownData" label-key="name" placeholder="Select a person" :isSso="true" />
    </span>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import DropdownList from "../../components/select-menu.vue"

const droplist = [
  { name: 'Portfolio', appcode: "LUAINyZUHPWErXR" },
  { name: 'Holding', appcode: "RAFJaoGyUofWozb" },
  { name: 'Ledger', appcode: "ieAMKctXJbxUYiO" },
  { name: 'Net Position', appcode: "QWXolHAILJOvXau" },
  { name: 'Short & Long Term', appcode: "ETfvmSipZFgnjrR" },
  { name: 'Trade Confirmation', appcode: "OiSQXCHIZamDiCE" },
]
export default {
  name: 'tabsComponent',
  components:{ DropdownList },
  props: {
    isBgBlue: { type: Boolean, default: false },
    page: { page: String }
  },
  data() {
    return {
      selectedMenu: droplist[0],
      dropdownData: droplist
    };
  },
  methods: {
    changeActive(id) {

      this.$store.dispatch('tabs/setActiveTab', { path: this.$route.path, id: id })
      this.$emit('activeTab', id)
    
    },
    getTabs() {
      if (this.$route.path == '/reports') {
        return this.getReportTabs;
      } 
      else if(this.$route.path == '/holdings') {
        return this.getHoldingsTabs;
      }
      else if(this.$route.path == '/action') {
        return this.getActionTabs;
      }
      else if(this.$route.path == '/profile') {
        return this.getProfileTabs;
      }
      else if(this.$route.path == '/dashboard') {
        return this.getDashboardTabs;
      }
    },
  },
  mounted() { },
  computed: {
    ...mapGetters('tabs', ['getReportTabs', 'getHoldingsTabs', 'getActionTabs', 'getProfileTabs', 'getDashboardTabs']),
    ...mapGetters(['getWindowWidth','getLoader'])
  },
}
</script>