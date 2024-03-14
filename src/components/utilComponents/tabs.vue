<template>
  <div class="" :class="{'secondary-violet-bg rounded-t': isBgBlue}" >
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab">
      <li class="mr-2" role="presentation" v-for="(b, id) in getTabs()" :key='id' @click="changeActive(b.id)" :id="`${$route.name}_${id}_b.name`">
        <button class="inline-block p-3 rounded-t-lg" type="button" :class="(b.active) ?
            'border-b-2 violet-color hover:violet-color dark:text-[#753ED7] dark:hover:text-[#753ED7] border-[#753ED7] dark:border-[#753ED7]' :
            'secondary-color hover:text-gray-600 dark:text-[#94A3B8] border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300'
        ">
          {{ b.name }} <span v-if="b.count != '0'">{{ b.count }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'tabsComponent',
  props: {
    isBgBlue: { type: Boolean, default: false },
    page: { page: String }
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
    ...mapGetters(['getWindowWidth'])
  },
}
</script>