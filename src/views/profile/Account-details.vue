
<template>
    <div class="p-4">
        <div class="card mb-4">
            <p class="mb-4 primary-color !font-bold text-sm">Account Details : </p>

      <div class="flex mt-4">

        <div class="mr-4 text-[14px"> User ID :</div>
            <p class="primaryColor text-[14px]">
              
              {{ getProfileData.name }}
            </p>
          </div>
          <div class="flex mt-4">
  <div class="mr-4 text-[14px]">Your PAN :</div>
  <p v-if="!showPassword" class="primaryColor text-[14px]">
    {{ getProfileData.fsl_pan_card }}
  </p>
  <input v-else type="password" :value="getProfileData.fsl_pan_card" class="primaryColor text-[14px]" />
  <!-- Toggle showPassword when eye icon is clicked -->
  <span class="ml-2 cursor-pointer" @click="showPassword = !showPassword">
    <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
</svg>

  </span>
</div>

          <p class="mb-4 mt-4 primary-color !font-bold text-sm">Demat Details :  </p>

          <div class="flex mt-4">
        <div class="mr-4 text-[14px"> Depository Name:</div>
            <p class="primaryColor text-[14px]">
              
                {{ getProfileData.fsl_demat_id ? getProfileData.fsl_demat_id : 'NA' }}
            </p>
          </div>
          <div class="flex mt-4">
        <div class="mr-4 text-[14px"> Demat Account Number:</div>
            <p class="primaryColor text-[14px]">
              
                {{ getProfileData.fsl_demat_id ? getProfileData.fsl_demat_id : 'NA' }}
            </p>
          </div>
        </div>

          <div class=" card">
    <h1 class="mb-4 primary-color !font-bold text-sm">Change TPIN</h1>
    <p class="secondary-color text-sm mb-4 max-w-[600px] leading-6">Your TPIN (Telephone PIN) allows you to authenticate yourself over the phone for faster service. </p>
    <p class="secondary-color text-sm mb-4 max-w-[600px] leading-6">TPIN is a 4 digit (numeric) code between 1000 and 9999. </p>

    <div class="mb-6">
      <label class="primary-color text-sm mb-1">View TPIN</label>
      <div class="flex items-center">
        <input type="password" id="TPIN" class="block w-[350px] h-10 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        <button class="ml-2 text-gray-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.5 15l4.5-4.5-4.5-4.5"></path></svg></button>
      </div>
    </div>

    <div>
      <h2 class="text-sm font-semibold mb-4">Change Pin</h2>
      <form>
        <div class="mb-4">
        <label class="primary-color text-sm mb-1" for="oldTPIN">Enter old TPIN *</label>
        <input type="password" id="oldTPIN" class="block w-[350px] h-10 rounded-md border border-gray-300 py-1.5 px-4 text-gray-900 placeholder-gray-400 focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm sm:leading-6">
      </div>
        <div class="mb-4">
          <label class="primary-color text-sm mb-1" for="newTPIN">Enter new TPIN *</label>
          <input type="password" id="newTPIN" class="block w-[350px] h-10 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
        <div class="mb-6">
          <label class="primary-color text-sm mb-1" for="reenterTPIN">Re-enter new TPIN *</label>
          <input type="password" id="reenterTPIN" class="block w-[350px] h-10 rounded-md border-0 py-1.5 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
      </form>
    </div>
  </div>
        </div>
</template>

  
  <script>
  import { mapGetters } from 'vuex';
 
  export default {
    components: {  },
    data() {
      return {
            showPassword: false, 

      };
    },
    computed: {
          ...mapGetters('profile', ['getProfileData']),
      },
   
  };
  </script>

<style>
.card {
    @apply border-[0.02rem] p-3 w-[400px] rounded-lg
}


</style>