<template>
  <div class="">
    <h1 class="mb-4 primary-color !font-bold text-sm">Close  Account</h1>
    <p class="block text-sm semi-bold font-medium leading-6 text-gray-900 mb-4">You’re about to close your Upstox account permanently. Avoid opening any new positions at this stage.</p>
    
    <div class="flex justify-between">
    <div class="space-y-4 w-[350px] ">
      <div v-for="item in items" :key="item.id" class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset flex items-center ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <!-- <svg v-if="item.icon === 'check'" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM7 9a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1zm2-5a1 1 0 10-2 0v3a1 1 0 102 0V4z" clip-rule="evenodd" />
        </svg> -->
        <svg   v-if="item.icon === 'check'" width="15" height="20" viewBox="0 0 15 15"  fill="none" xmlns="http://www.w3.org/2000/svg"  class=" mr-2" ><path d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z" fill="#00A03C"></path><path d="M10.9377 5.62488L6.35181 9.99988L4.06274 7.81238" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg"  width="20" height="20" class=" text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm5 3a1 1 0 100 2 1 1 0 000-2z" clip-rule="evenodd" />
        </svg>
        <span class="block text-sm semi-bold font-medium leading-6 text-gray-900 ">{{ item.text }}</span>
      </div>
    </div>

    <div class="p-3 border w-[300px] text-[14px] mr-11  bg-gray-100 rounded-md">
  <div class=" text-primary font-bold text-sm">Note</div>
  <ol class="p-3">
    <div class="list-decimal list-outside ">
    <li>In case you've remaining funds, it'll get credited to the primary bank account linked to your Upstox account.</li>
    <li>Please download all the reports related to your Demat account early, as you won't be able to access them after closing your account.</li>
  </div>
  </ol>
</div>

  </div>
</div>
</template>

<script>
export default {
  name: 'AccountClosure',
  data() {
    return {
      items: [
        { id: 1, text: 'No active holdings', icon: 'check' },
        { id: 2, text: 'No active mutual funds', icon: 'check' },
        { id: 3, text: 'No active SIPs', icon: 'check' },
        { id: 4, text: 'No  balance ', icon: '' }
      ]
    };
  }
}
</script>

<style scoped>
/* You can include Tailwind CSS classes here if needed */
</style>
