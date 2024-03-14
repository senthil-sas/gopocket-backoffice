<template> <RouterView /></template>
<script>
export default {
    methods: {
      handleResize() {
        let windowWidth = window.innerWidth
        let windowHeight = window.innerHeight
        this.$store.commit('setWindowHeightWidth', { h: windowHeight, w: windowWidth })
        // if (windowWidth < 1200) {
        //   this.$store.dispatch('tabs/setPersonalProfileTab')
        // }
        // else if(windowWidth >= 1200) {
        //   this.$store.dispatch('tabs/removePersonalProfileTab')
        // }
      },
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      this.handleResize();

      // retain state
      let clientId =  localStorage.getItem('clientId');
      let sessionId =  localStorage.getItem('sessionId');
      if(clientId) {
        this.$store.commit("auth/setUserId", clientId);
      }
      if(sessionId) {
        this.$store.commit("auth/setSessionId", sessionId);
      }             
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
    },
}
</script>
<style>

@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,600,300");

/* :root {} */

body {
  font-family: "Open Sans", sans-serif !important;
}

.red-btn-c {
  background-color: #fceeed !important;
  color: #df514c !important;
  @apply dark:bg-[#2D1E1E] dark:text-[#DF514C] !font-semibold;
}

.green-btn-c {
  background-color: #eef8ee !important;
  color: #50b554 !important;
  @apply dark:bg-[#4CAF501A] dark:text-[#5B9A5D] !font-semibold;
}

.blue-btn-c {
  background-color: #e7f3fe !important;
  color: #1185f7 !important;
  @apply dark:bg-[#1D242E] dark:text-[#4987EE] !font-semibold;
}

.gray-btn-c {
  background-color: #f1f1f2 !important;
  color: #323232 !important;
  @apply dark:bg-[#BDBDBD1A] dark:text-[#BBBBBB] !font-semibold;
}

.orange-btn-c {
  background-color: #fff5ec !important;
  color: #ff9900 !important;
  @apply dark:text-[#c2852a] dark:bg-[#28201a] !font-semibold;
}

.purple-btn-c {
  background-color: #f4ebff !important;
  color: #913aff !important;
  @apply dark:text-[#844AEB] dark:!bg-[#252327] !font-semibold;
}

.pink-btn-c {
  background-color: #fff2fa !important;
  color: #ff00a8 !important;
  @apply dark:text-[#c53794] dark:bg-[#33242d] !font-semibold;
}

::-webkit-scrollbar {
  width: 0.4rem;
  height: 0.4rem;
  @apply cursor-pointer;
}
.sidebar::-webkit-scrollbar {
  width: 0px;
  height: 0px;
  @apply cursor-pointer;
}


::-webkit-scrollbar-thumb {
  background-color: #d5d4d4;
  border-radius: 999px;
  border: 1px solid #d5d4d4;
  height: 4px !important;
}

.overflowinherit {
  overflow: inherit !important;
}

.primary-color {
  @apply !text-[#070A26] !font-medium dark:!text-[#ebebeb];
}

.secondary-color {
  @apply !text-[#8b8b8b] !font-medium dark:!text-[#8d8b8b];
}

.green-color {
  @apply !text-[#4CAF50] !font-medium;
}

.red-color {
  @apply !text-[#E34242] !font-medium;
}

.green-bg {
  @apply !bg-[#4CAF50];
}

.red-bg {
  @apply !bg-[#E34242];
}

.violet-color {
  @apply text-[#753ED7] font-medium;
}

.violet-bg {
  @apply !bg-[#753ED7];
}

.secondary-violet-bg {
  @apply !bg-[#F0F6FD] dark:!bg-[#27272A]
}

.z-index-full {
  z-index: 99 !important;
}

/* new css */
.commonbtn {
  @apply !px-4 !py-2 !text-sm !bg-[#753ED7] !text-white !rounded-md
}
.commonbtn:disabled, .cancelbtn:disabled {
  @apply !opacity-60 !bg-gray-400 cursor-not-allowed
}

.cancelbtn {
  @apply !px-4 !py-2 !text-sm !bg-white !border !rounded-md !text-[#070A25] hover:!bg-gray-100
}

input[type="text"] {
  @apply px-4
}

.bluebtn {
  @apply px-2 text-[10px] rounded min-w-[40px] h-6 font-semibold bg-[#e8f4ff] text-[#0060b9] dark:bg-[#1D242E] dark:text-[#4987EE]
}
.graybtn {
  @apply px-2 text-[10px] rounded min-w-[40px] h-6 font-semibold bg-[#e9ecf1] text-[#333638] dark:bg-[#BDBDBD1A] dark:text-[#BBBBBB]
}
.redbtn {
  @apply px-2 text-[10px] rounded min-w-[40px] h-6 font-semibold bg-[#fceeed] text-[#df514c] dark:bg-[#2D1E1E] dark:text-[#DF514C]
}
.greenbtn {
  @apply px-2 text-[10px] rounded min-w-[40px] h-6 font-semibold bg-[#eef8ee] text-[#50b554] dark:bg-[#4CAF501A] dark:text-[#5B9A5D]
}

.table-sticky {
  border-collapse: collapse;
}
.table-sticky thead th {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
  box-shadow: inset 0 -1px 0 #ededed;
  @apply bg-white;
}
.commonbtn.green {
  @apply !bg-[#f0ffeb] !text-[#3a702b];
}


</style>



