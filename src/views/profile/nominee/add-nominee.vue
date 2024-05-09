<template>
    <form v-if="!isMinor" @submit.prevent="addNominee()">
        <div class="mb-4 primary-color !font-bold text-sm">
            Enter your Nominee Details
        </div>

        <div class="my-4 flex gap-5 items-center">
            <div>
                <div class="primary-color text-sm mb-1">First Name</div>
                <div>
                    <input type="text" name="firstName" id="firstName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="toUpperCaseModel('firstName')" v-model="firstName"/>
                </div>
                
                <div class="h-4">
                    <span class="error-msg" v-if="firstName == '' && isSubmit">Enter first name</span>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">Last Name</div>
                <div>
                    <input type="text" name="lastName" id="lastName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="toUpperCaseModel('lastName')" v-model="lastName"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="lastName == '' && isSubmit">Enter last name</span>
                </div>
            </div>
        </div>

        

        <div class="my-3 flex gap-5 items-center">
            <div>
                <Listbox as="div" v-model="relationship" class="min-w-[350px]">
                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Relationship </ListboxLabel>
                <div class="relative">
                    <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                        <span class="block truncate">{{ relationship.name }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="i in relationships" :key="i.id" :value="i" v-slot="{ active, relationship }">
                                <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4 ']">
                                    <span :class="[relationship ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name }}</span>
                                    <span v-if="relationship" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
                </Listbox>
                <div class="h-4">
                    <span class="error-msg" v-if="!relationship && isSubmit">Select relationship</span>
                </div>
            </div>

            <div class="my-3">
                <div class="primary-color text-sm mb-1">Date of Birth</div>
                <div class="flex justify-between gap-2 min-w-[350px]">
                    <!-- Days dropdown -->
                    <Listbox as="div" v-model="nomineeDate" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <span class="block truncate">{{ nomineeDate }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="i in days" :key="i" :value="i" v-slot="{ active, nomineeDate }">
                                        <li @change="findUserIsMinor" :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                            <span :class="[nomineeDate ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i }}</span>
                                            <span v-if="nomineeDate" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>

                    <!-- Months dropdown -->
                    <Listbox as="div" v-model="nomineeMonth" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <span class="block truncate">{{ nomineeMonth.month }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" @change="findUserIsMinor" v-for="i in getMonths" :key="i" :value="i" v-slot="{ active, nomineeMonth }">
                                        <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                            <span :class="[nomineeMonth ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.month }}</span>
                                            <span v-if="nomineeMonth" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>

                     <!-- years dropdown -->
                     <Listbox as="div" v-model="nomineeYear" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <span class="block truncate">{{ nomineeYear }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="i in getYears" :key="i" :value="i" v-slot="{ active, nomineeYear }">
                                        <li @change="findUserIsMinor" :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                            <span :class="[nomineeYear ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i }}</span>
                                            <span v-if="nomineeYear" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="(nomineeDate == '' || nomineeMonth == '' || nomineeYear == '') && isSubmit">Select date of birth</span>
                </div>
            </div>
        </div>

        
        <div class="my-3 flex gap-5 items-center">
            <div class="my-3">
                <div class="primary-color text-sm mb-1">PAN (optional)</div>
                <div>
                    <input maxlength="10" @input="panNo ? panNo = panNo?.toUpperCase() : panNo" type="text" name="panNo" id="panNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="panNo"/>
                </div>
                <div class="h-4">
                </div>
            </div>

            <div class="my-3">
                <div class="primary-color text-sm mb-1">Mobile No</div>
                <div>
                    <input maxlength="10" @input="digitKeyOnly($event, 'mobileNo')" type="text" name="mobileNo" id="mobileNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="mobileNo"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="!isValidMobile() && isSubmit">Enter valid mobile number</span>
                </div>
            </div>
        </div>

        <!-- <div class="my-3 flex gap-5 items-center">
            <div class="my-3">
                <div class="flex items-center justify-between">
                    <div class="primary-color text-sm mb-1">Nominee Share Percentage</div> <span class="text-xs">Total available shares: ({{ totalAvilableShare }})</span>
                </div>
                <div>
                    <input maxlength="3" @input="digitKeyOnly($event, 'nomineeSharePercentage')" type="text" name="sharePercentage" id="sharePercentage" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="nomineeSharePercentage"/>
                </div>

                <div class="h-4">
                    <span class="error-msg" v-if="nomineeSharePercentage == '' && isSubmit">Share percentage cannot be empty</span>
                    <span class="error-msg" v-else-if="nomineeSharePercentage > totalAvilableShare && isSubmit">Cannot allocate percentage more than available share</span>
                </div>
            </div>
        </div> -->
        <div class="my-3 flex gap-5 items-center">

            <div>
          <p class="block text-sm font-medium leading-6 text-gray-900">Nominee Proof Type</p>
          <Menu as="div" class="relative  min-w-[350px] xinline-block text-left w-full" id="nominee_proof_type_drop_down">
            <div id="nominee_proof_type_select">
              <MenuButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" v-model="nomineeProoftype" id="nom_Proof">
                {{ nomineeProoftype == 'Aadhar card' ? 'Aadhar (Masked)' : nomineeProoftype}}
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                <ChevronDownIcon id="nominee_proof_icon_dropdown" class="ml-auto h-5 w-5" aria-hidden="true" />
           </span> 
          </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems id="menu_items_nominee_proof" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  w-full'"
                @change="">
                <div class="py-1" v-for="item in typeOfProof" :key="item" :id="`${item.name}_dropdown`">
                  <MenuItem v-slot="{ active }">
                  <a :class="[
                    active
                      ? 'violet-bg text-white w-full'
                      : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4 w-full',
                  ]" @click="proofOfNominee(item)">
                   {{ item.name == 'Aadhar card' ? 'Aadhar (Masked)' : item.name }}
                  </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
            <div class="h-4">
                    <span class="error-msg" v-if="!nomineeProoftype && isSubmit">Select proof type</span>
                </div>
        </div>


        <div id="nominee_proof_no_group">
    <div class="flex justify-between">
      <p class="block text-sm font-medium leading-6 text-gray-900" id="nominee_proof_number_header">Nominee Proof No</p>
    </div>
    <input type="text" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :placeholder="nomineeProoftype == 'Aadhar card' ? 'Enter Aadhar Number' : nomineeProoftype ? `Enter ${nomineeProoftype} Number` : 'Enter Proof Number'"
      v-model="nomineeProofNumber" @input="nomineeProoftype == 'Aadhar card' ? nomineeProofNumber = nomineeProofNumber.replace(/[^0-9]/g, '') : ''"
      :maxlength="nomineeProoftype == 'Aadhar card' ? 4 : 45"
      id="nom_proofNum"
    />
    <div class="h-4">
      <span v-if="nomineeProoftype == 'Aadhar card'" class="text-[11px] secondaryColor">(Note: Enter Last 4 Digits of Aadhar)</span>
      <span class="error-msg" v-if="!nomineeProoftype && isSubmit">Enter proof number</span>
    </div>
  </div>
        </div>
        <div class="">
          <div class="">
            <label for="formFile" class="block text-sm font-medium leading-6 text-gray-900">Nominee Proof</label>
            <input
              class="relative block  w-[350px] rounded-md commonInputWidth secondaryColor flex-auto cursor-pointer radius4rem border border-solid  bg-white bg-clip-padding px-3 outline-none transition duration-300 ease-in-out file:-mx-3 file:cursor-pointer file:overflow-hidden file:radius4rem-none file:border-0  file:px-3 h-10 file:h-full file:secondaryColor file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem]"
              type="file" @change="nomineeProof($event)" capture id="formFile" accept=".pdf, .png, .jpg, .jpeg" />
            <span class="text-xs textColor pb-1">(Note: File size sholud not be exceed 5MB)</span>
            <div class="h-4 ">
                <div class="h-4">
                    <span class="error-msg" v-if="!nomineeProofFileName && isSubmit">Enter proof number</span>
                </div>   

            </div>
          </div>
        </div>
        <div class="my-3">
            <div class="relative flex items-start">
                <div class="flex h-6 items-center">
                  <input name="isSameAddress" type="checkbox" class="h-4 w-4 rounded border-gray-300 primary-color cursor-pointer accent-violet-600"  @change="fetchAddress" v-model="isSameAsAddress"/>
                </div>
                <div class="ml-2 text-sm leading-6">
                  <label for="isSameAddress" class="font-medium text-gray-900">Nominee address is same as my address</label>
                </div>
            </div>
            <div class="primary-color text-sm mb-1"></div>
        </div>



        <div class="my-4 flex gap-5 items-center" v-if="!isSameAsAddress">
            <div>
                <div class="primary-color text-sm mb-1">Address</div>
                <div>
                    <input type="text" name="Address" id="Address" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="Address"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="Address == '' && isSubmit">Enter the Address</span>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">Address line 2</div>
                <div>
                    <input type="text" name="pincode" id="Address2" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="AddressLine2"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="AddressLine2 == '' && isSubmit">Enter the Address line 2</span>
                </div>
            </div>
        </div>

        <div class="my-4 flex gap-5 items-center" v-if="!isSameAsAddress">
            <div>
                <div class="primary-color text-sm mb-1">State</div>
                <div>
                    <input type="text" name="state" id="state" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="state"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="state == '' && isSubmit">Enter the Address line 2</span>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">PIN code</div>
                <div>
                    <input maxlength="6" @input="digitKeyOnly($event, 'pincode')" type="text" name="pincode" id="pincode" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="pincode"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="pincode == '' && isSubmit">Enter the pincode</span>
                    <span class="error-msg" v-if="pincode.length != 6 && isSubmit">Enter valid pincode</span>
                </div>
            </div>
        </div>
        <div v-if="userAge < 18">
            <div class="bg-[#ccedfb] leading-6 text-sm rounded-md p-4 my-4 max-w-[800px]">
                <div class="primary-color !font-semibold mb-2">Why do you need a Guardian?</div>
                <p class="primary-color">The Nominee for your account is a Minor (below 18 years). For a minor nominee, you are requested to add a 
                guardian (who is above 18 years old). For obvious reasons, you can not be a Guardian or Nominee for your own account.</p>
            </div>
        </div>

        <div class="my-10 flex gap-3">
            <button type="button" class="cancelbtn" @click="backToNomineeDetails()">Cancel</button>
            <button type="submit" class="commonbtn"><spinner v-if="getloginloader"/><span v-else>Submit</span></button>
        </div>
    </form>
     <form autocomplete="off" id="Form" novalidate v-if="isMinor" @submit.prevent="navigateNomineeProof">
        <div>
            <div class="mb-4 primary-color !font-bold text-sm">
            Enter your Guardian Details
        </div>

        <p class="bg-violet-200 leading-6 primary-color !font-semibold text-sm rounded-md p-4 my-4 max-w-[800px]">
            Since the nominee {{ }} is a minor (below 18 years), you are requested to update the guardian details of the Nominee.
            For obvious reasons, you can not add yourself as a guardian to your account.
            Please add a Guardian (who is above 18 years old) to your minor nominee.
        </p>

        <div class="my-4 flex gap-5 items-center">
            <div>
                <div class="primary-color text-sm mb-1">First Name</div>
                <div>
                    <input type="text" name="firstName" id="firstName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="toUpperCaseModel('firstName')" v-model="guardianFirstName"/>
                </div>
                
                <div class="h-4">
                    <span class="error-msg" v-if="guardianFirstName == '' && isSubmit">Enter first name</span>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">Last Name</div>
                <div>
                    <input type="text" name="lastName" id="lastName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="toUpperCaseModel('lastName')" v-model="guardianLastName"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="guardianLastName == '' && isSubmit">Enter last name</span>
                </div>
            </div>
        </div>

        

        <div class="my-3 flex gap-5 items-center">
            <div>
                <Listbox as="div" v-model="guardianrelationship" class="min-w-[350px]">
                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Relationship </ListboxLabel>
                <div class="relative">
                    <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                        <span class="block truncate">{{ relationship.name }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="i in relationships" :key="i.id" :value="i" v-slot="{ active, relationship }">
                                <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4 ']">
                                    <span :class="[relationship ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.name }}</span>
                                    <span v-if="relationship" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                    </span>
                                </li>
                            </ListboxOption>
                        </ListboxOptions>
                    </transition>
                </div>
                </Listbox>
                <div class="h-4">
                    <span class="error-msg" v-if="!guardianrelationship && isSubmit">Select relationship</span>
                </div>
            </div>

            <div class="my-3">
                <div class="primary-color text-sm mb-1">Date of Birth</div>
                <div class="flex justify-between gap-2 min-w-[350px]">
                    <!-- Days dropdown -->
                    <Listbox as="div" v-model="guardiannomineeDate" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <span class="block truncate">{{ nomineeDate }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="i in days" :key="i" :value="i" v-slot="{ active, nomineeDate }">
                                        <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                            <span :class="[nomineeDate ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i }}</span>
                                            <span v-if="nomineeDate" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>

                    <!-- Months dropdown -->
                    <Listbox as="div" v-model="guardiannomineeMonth" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <span class="block truncate">{{ nomineeMonth.month }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="i in getMonths" :key="i" :value="i" v-slot="{ active, nomineeMonth }">
                                        <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                            <span :class="[nomineeMonth ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i.month }}</span>
                                            <span v-if="nomineeMonth" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>

                     <!-- years dropdown -->
                     <Listbox as="div" v-model="guardiannomineeYear" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6">
                                <span class="block truncate">{{ nomineeYear }}</span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    <ListboxOption as="template" v-for="i in getYears" :key="i" :value="i" v-slot="{ active, nomineeYear }">
                                        <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
                                            <span :class="[nomineeYear ? 'font-semibold' : 'font-normal', 'block truncate']">{{ i }}</span>
                                            <span v-if="nomineeYear" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 left-0 flex items-center pl-1.5']">
                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                            </span>
                                        </li>
                                    </ListboxOption>
                                </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="(guardiannomineeDate == '' || guardiannomineeMonth == '' || guardiannomineeYear == '') && isSubmit">Select date of birth</span>
                </div>
            </div>
        </div>

        
        <div class="my-3 flex gap-5 items-center">
            <div class="my-3">
                <div class="primary-color text-sm mb-1">PAN (optional)</div>
                <div>
                    <input maxlength="10" @input="guardianpanNo ? guardianpanNo = guardianpanNo?.toUpperCase() : guardianpanNo" type="text" name="guardianpanNo" id="guardianpanNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="guardianpanNo"/>
                </div>
                <div class="h-4">
                </div>
            </div>

            <div class="my-3">
                <div class="primary-color text-sm mb-1">Mobile No</div>
                <div>
                    <input maxlength="10" @input="digitKeyOnly($event, 'mobileNo')" type="text" name="mobileNo" id="mobileNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="guardianmobileNo"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="!isValidMobile() && isSubmit">Enter valid mobile number</span>
                </div>
            </div>
        </div>

        <!-- <div class="my-3 flex gap-5 items-center">
            <div class="my-3">
                <div class="flex items-center justify-between">
                    <div class="primary-color text-sm mb-1">Nominee Share Percentage</div> <span class="text-xs">Total available shares: ({{ totalAvilableShare }})</span>
                </div>
                <div>
                    <input maxlength="3" @input="digitKeyOnly($event, 'nomineeSharePercentage')" type="text" name="sharePercentage" id="sharePercentage" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="nomineeSharePercentage"/>
                </div>

                <div class="h-4">
                    <span class="error-msg" v-if="nomineeSharePercentage == '' && isSubmit">Share percentage cannot be empty</span>
                    <span class="error-msg" v-else-if="nomineeSharePercentage > totalAvilableShare && isSubmit">Cannot allocate percentage more than available share</span>
                </div>
            </div>
        </div> -->
        <div class="my-3 flex gap-5 items-center">

            <div>
          <p class="block text-sm font-medium leading-6 text-gray-900">Guardian Proof Type</p>
          <Menu as="div" class="relative  min-w-[350px] xinline-block text-left w-full" id="nominee_proof_type_drop_down">
            <div id="nominee_proof_type_select">
              <MenuButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6" v-model="guardianProoftype" id="nom_Proof">
                {{ guardianProoftype == 'Aadhar card' ? 'Aadhar (Masked)' : guardianProoftype}}
                <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                <ChevronDownIcon id="nominee_proof_icon_dropdown" class="ml-auto h-5 w-5" aria-hidden="true" />
           </span> 
          </MenuButton>
            </div>

            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems id="menu_items_nominee_proof" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm  w-full'"
                @change="">
                <div class="py-1" v-for="item in typeOfProof" :key="item" :id="`${item.name}_dropdown`">
                  <MenuItem v-slot="{ active }">
                  <a :class="[
                    active
                      ? 'violet-bg text-white w-full'
                      : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4 w-full',
                  ]" @click="proofOfGuard(item)">
                   {{ item.name == 'Aadhar card' ? 'Aadhar (Masked)' : item.name }}
                  </a>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
            <div class="h-4">
                    <span class="error-msg" v-if="!guardianProoftype && isSubmit">Select proof type</span>
                </div>
        </div>


        <div id="nominee_proof_no_group">
    <div class="flex justify-between">
      <p class="block text-sm font-medium leading-6 text-gray-900" id="nominee_proof_number_header">Guardian Proof No</p>
    </div>
    <input type="text" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      :placeholder="guardianProoftype == 'Aadhar card' ? 'Enter Aadhar Number' : guardianProoftype ? `Enter ${guardianProoftype} Number` : 'Enter Proof Number'"
      v-model="guardianProofNumber" @input="guardianProoftype == 'Aadhar card' ? guardianProofNumber = guardianProofNumber.replace(/[^0-9]/g, '') : ''"
      :maxlength="guardianProoftype == 'Aadhar card' ? 4 : 45"
      id="nom_proofNum"
    />
    <div class="h-4">
      <span v-if="guardianProoftype == 'Aadhar card'" class="text-[11px] secondaryColor">(Note: Enter Last 4 Digits of Aadhar)</span>
      <span class="error-msg" v-if="!guardianProoftype && isSubmit">Enter proof number</span>
    </div>
  </div>
        </div>
        <div class="">
          <div class="">
            <label for="formFile" class="block text-sm font-medium leading-6 text-gray-900">Nominee Proof</label>
            <input
              class="relative block  w-[350px] rounded-md commonInputWidth secondaryColor flex-auto cursor-pointer radius4rem border border-solid  bg-white bg-clip-padding px-3 outline-none transition duration-300 ease-in-out file:-mx-3 file:cursor-pointer file:overflow-hidden file:radius4rem-none file:border-0  file:px-3 h-10 file:h-full file:secondaryColor file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem]"
              type="file" @change="nomineeProof($event)" capture id="formFile" accept=".pdf, .png, .jpg, .jpeg" />
            <span class="text-xs textColor pb-1">(Note: File size sholud not be exceed 5MB)</span>
            <div class="h-4 ">
                <div class="h-4">
                    <span class="error-msg" v-if="!nomineeProofFileName && isSubmit">Enter proof number</span>
                </div>   

            </div>
          </div>
        </div>
        <div class="my-3">
            <div class="relative flex items-start">
                <div class="flex h-6 items-center">
                  <input name="isSameAddress" type="checkbox" class="h-4 w-4 rounded border-gray-300 primary-color cursor-pointer accent-violet-600"  @change="fetchAddressGuardian" v-model="isSameAsAddressGuardian"/>
                </div>
                <div class="ml-2 text-sm leading-6">
                  <label for="isSameAddress" class="font-medium text-gray-900">Nominee address is same as my address</label>
                </div>
            </div>
            <div class="primary-color text-sm mb-1"></div>
        </div>



        <div class="my-4 flex gap-5 items-center" v-if="!isSameAsAddressGuardian">
            <div>
                <div class="primary-color text-sm mb-1">Address</div>
                <div>
                    <input type="text" name="guardianAddress" id="guardianAddress" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="guardianAddress"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="guardianAddress == '' && isSubmit">Enter the Address</span>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">Address line 2</div>
                <div>
                    <input type="text" name="pincode" id="guardianAddress2" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="guardianAddressLine2"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="guardianAddressLine2 == '' && isSubmit">Enter the Address line 2</span>
                </div>
            </div>
        </div>

        <div class="my-4 flex gap-5 items-center" v-if="!isSameAsAddressGuardian">
            <div>
                <div class="primary-color text-sm mb-1">State</div>
                <div>
                    <input type="text" name="guardianstate" id="guardianstate" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="guardianstate"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="guardianstate == '' && isSubmit">Enter the Address line 2</span>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">PIN code</div>
                <div>
                    <input maxlength="6" @input="digitKeyOnly($event, 'pincode')" type="text" name="pincode" id="pincode" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="pincode"/>
                </div>
                <div class="h-4">
                    <span class="error-msg" v-if="pincode == '' && isSubmit">Enter the pincode</span>
                    <span class="error-msg" v-if="pincode.length != 6 && isSubmit">Enter valid pincode</span>
                </div>
            </div>
        </div>

        <!-- <div v-if="getIsMinor">
            <div class="bg-[#ccedfb] leading-6 text-sm rounded-md p-4 my-4 max-w-[800px]">
                <div class="primary-color !font-semibold mb-2">Why do you need a Guardian?</div>
                <p class="primary-color">The Nominee for your account is a Minor (below 18 years). For a minor nominee, you are requested to add a 
                guardian (who is above 18 years old). For obvious reasons, you can not be a Guardian or Nominee for your own account.</p>
            </div>
        </div> -->

        <div class="my-10 flex gap-3">
            <button type="button" class="cancelbtn" @click="cancelGuardianAdd()">Cancel</button>
            <button type="submit" class="commonbtn"><spinner v-if="getloginloader"/><span v-else>Submit</span></button>
        </div>
    </div>
    </form>
   
</template>

<script>

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon ,ChevronDownIcon} from '@heroicons/vue/20/solid'
import icon from '../../../components/utilComponents/icons.vue'
import { mapGetters } from 'vuex'
export default {
    components: { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, ChevronDownIcon,CheckIcon, ChevronUpDownIcon, icon,Menu, MenuButton, MenuItem, MenuItems },
    data() {
        return {
            userAge:'18',
            relationship: '',
            relationships: [
                { name: 'Spouse', id: 0 },
                { name: 'Son', id: 0 },
                { name: 'Daughter', id: 0 },
                { name: 'Father', id: 0 },
                { name: 'Mother', id: 0 },
                { name: 'Brother', id: 0 },
                { name: 'Sister', id: 0 },
                { name: 'Grand-Son', id: 0 },
                { name: 'Grand-Father', id: 0 },
                { name: 'Grand-mother', id: 0 },
                { name: 'Not provided', id: 0 },
                { name: 'Others', id: 0 }
            ],
            typeOfProof: [
                { name: 'Aadhar card' },
                 { name: 'Pan' },
                { name: 'Voter ID' },
                  { name: 'Driving licence' },
                  { name: 'Passport' },
      ],
      nomineeProofNumber:'',
      nomineeProoftype:'',
            firstName: '',
            lastName: '',
            panNo: '',
            isSameAsAddressGuardian: true,
            isSameAsAddress:true,
            mobileNo: '',
            nomineeProofFileName: '',
            isMinor:false,
            state: '',
            pincode: '',
            nomineeSharePercentage: 0,

            // 
            Address: '',
            AddressLine2:'',
            pincode:'',
            nomineeProofNumber:'',
            nomineeDate:'',
            nomineeMonth:'',
            nomineeYear:'',
            isSubmit: false,
            //
         nomineeGuardian: "",
      guardianFirstName: "",
      guardianLastName: "",
      guardiandob: "",
      guardianrelationship:"",
      guardiannomineeDate:"",
      guardiannomineeMonth:"",
      guardiannomineeYear:"",
      guardianmobileNo: "",
      guardianGmail: "",
      guardianAddress: "",
      guardianAddressLine2: "",
      guardianPinCode: "",
      guardianProofNumber : '',
      guardianDate: '',
      guardianMonth: '',
      guardianYear: '',
      guardianpanNo:'',
      guardianAge: '',
      guardianstate:'',
      nomineeClick: false,
      guardianClick: false,
      guardianProofFileName: '',

      nomineeProoftype: '',
      guardianProoftype: '',
        }
    },
    computed: {
        ...mapGetters(['getMonths']),
        ...mapGetters('nominee',['getIsMinor', 'getNomineeList']),
        ...mapGetters("auth", ["getUserId"]),
        ...mapGetters('profile', ['getProfileData']),
        ...mapGetters('reekyc', ['getloginloader']),

        days() {
            const daysInMonth = new Date(this.nomineeYear || 2023, this.nomineeMonth.month || 'JAN', 0).getDate() || 31
            let arr = []
            for (let i = 1; i <= daysInMonth; i++) {
                if (i < 10) {
                    i = (`${0}${i}`);
                }
                arr.push(i)
            }
            return arr
        },

        getYears() {
            let currentDate = new Date()
            let currentYear = currentDate.getFullYear()
            let arr = []
            for (let i = currentYear; i >= 1901; i--) {
                arr.push(i)
            }
            return arr
        },

        isAgeModified() {
            this.findUserIsMinor();
            return [this.nomineeDate,this.nomineeMonth.month,this.nomineeYear]
        },  

        dateOfBirth() {
          return `${this.nomineeDate}-${this.nomineeMonth.id}-${this.nomineeYear}`
        },
        dateOfBirthguardian() {

if (this.guardianDate && this.guardianMonth && this.guardianYear) {
  this.guardianAge = `${this.guardianDate}-${this.guardianMonth}-${this.guardianYear}`
}

if (this.guardianDate < 1 || this.guardianDate > new Date(this.guardianYear, this.guardianMonth, 0).getDate()) {
  this.guardianDate = ''
  var error
  error = 'Please enter a valid date for the selected month and year.'
//   this.$store.commit("nominee/setGuardianDateErrMsg", error, { root: true })
}

if (this.guardianAge) {
  var dateChange
  if (this.guardianDate) {
    dateChange = `${this.guardianYear}-${this.guardianMonth}-${this.guardianDate}`
  }
  this.getAge(dateChange, 'Guardian')
}
},

totalAvilableShare() {
            const sum = this.getNomineeList.reduce((accumulator, object) => {
                return accumulator + object.percentage_allocation;
            }, 0);
            return 100 - sum
        }
    },
    methods: {
        async addNominee() {
            this.isSubmit = true
            if (this.validateForm()) {
     let json = {
    "uccCode": this.getUserId,
    "firstname": this.firstName ,
    "lastname": this.lastName,
    "relationship": this.relationship.name,
    "dateOfbirth": this.dateOfBirth,
    "mobilenumber": this.mobileNo,
    "address1": this.Address,
    "address2": this.AddressLine2,
    "pincode": "638656",
    "state": "tamilnadhu",
    "nomOneAllocation": 0,
    "nomTwoAllocation": 0,
    "nomThreeAllocation": 0,
    "attachementUrl": "",
    "proofId": this.nomineeProofNumber,
    "typeOfProof": this.nomineeProoftype,

      };
      let proof = this.nomineeProofFileName
                if (this.userAge < 18 ) {
                    this.isMinor = true;
                }else {
                    await this.$store.dispatch('nominee/saveNomineeDetails', [json, proof])
                    
                }
                this.isSubmit = false
        }
            },


        backToNomineeDetails() {
            if(this.getNomineeList.length) {
                this.$store.commit('nominee/setNomineeStage', 'nomineeSummary')
            } else {
                this.$store.commit('nominee/setNomineeStage', 'initialList')
            }
        },
        cancelGuardianAdd() {
      this.isMinor = false;
      this.nomineeProofFileName = ''
    },

        toUpperCaseModel(vmodel) {
            if(this[vmodel]) {
                this[vmodel] = this[vmodel]?.toUpperCase()
            }
        },
    nomineeProof(event) {
      if (event.target.files[0]?.size < 5000000) {
        this.nomineeProofFileName = event?.target?.files[0]
      } else {
        alert("File size limit upto 5MB");
        event.target.value = ""
      }
    },
    guardianProof(event) {
      if (event.target.files[0]?.size < 5000000) {
        this.guardianProofFileName = event?.target?.files[0]
      } else {
        alert("File size limit upto 5MB");
        event.target.value = ""
      }
    },

        findUserIsMinor() {
            if (this.nomineeDate && this.nomineeMonth.month && this.nomineeYear) {
                var regpan = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/;
                var dateChange = `${this.nomineeYear}-${this.nomineeMonth.id}-${this.nomineeDate}`
                var userBirthDate = new Date(dateChange);
                var birthYear = userBirthDate.getFullYear()
                if (regpan.test(dateChange)) {
                    var currentDate = new Date();
                    let difference = currentDate - userBirthDate;
                    let age = Math.floor(difference / 31557600000)
                    console.log(age);
                    this.userAge = age;
                }
            }
        },

        digitKeyOnly(event, type) {
            // Allow only numeric values in the input field
            event.target.value = event.target.value?.toString()?.replace(/[^0-9]/g, '')
            if(type)
            this[type] = event.target.value
        },

        validateForm() {
            return this.firstName != '' && this.lastName != '' && this.relationship != '' && (this.nomineeDate != '' && this.nomineeMonth != '' && this.nomineeYear != '') 
            && this.isValidMobile()  && this.nomineeProofFileName != '' && this.Address != '' && this.AddressLine2
            && this.state != '' &&( this.pincode != '' && this.pincode.length == 6)
        },

        isValidMobile() {
            const panPattern = /^[6-9]\d{9}$/gi;
            const str = this.mobileNo;
            return panPattern.test(str)
        },
        
     proofOfNominee(val) {
       this.nomineeProoftype = val.name;
       this.nomineeProofNumber = '';
       
},

 navigateNomineeProof() {
      this.submitted = true;
      let json = {
        "uccCode": this.getUserId,
    "firstname": this.firstName ,
    "lastname": this.lastName,
    "relationship": this.relationship.name,
    "dateOfbirth": this.dateOfBirth,
    "mobilenumber": this.mobileNo,
    "address1": this.Address,
    "address2": this.AddressLine2,
    "pincode": "638656",
    "state": "tamilnadhu",
    "nomOneAllocation": 0,
    "nomTwoAllocation": 0,
    "nomThreeAllocation": 0,
    "attachementUrl": "",
    "proofId": this.nomineeProofNumber,
    "typeOfProof": this.nomineeProoftype,
    "guardianEntity": {
        "uccCode":  this.getUserId,
        "firstname": this.guardianFirstName,
        "lastname":  this.guardianLastName,
        "relationship": this.guardianrelationship.name,
        "dateOfbirth": this.dateOfBirthguardian,
    "mobilenumber": this.guardianMoNumber, 
    "address1": this.guardianAddress1,
    "address2": this.guardianAddress2,
    "pincode": "638656",
    "state": "tamilnadhu",
        "attachementUrl": "",
        "proofId": this.guardianProofNumber,
    "typeOfProof": this.guardianProoftype,
    }
      };
      let proof = this.nomineeProofFileName
      let guardProof = this.guardianProofFileName
      console.log( this.guardianProofFileName)
      // this.validateGuardianPAN(this.guardianPanCard)
        // if (this.ageOfNominee > 17 && this.guardianFirstName && this.guardianProofNumber && this.guardianAddress1 && this.guardianAddress2 && !this.getGuardianDateErrMsg && this.guardianLastName && this.nomineeGuardian && this.guardianAge && this.guardianMoNumber && this.addGuardianEmail && this.guardianPinCode.length == 6 && this.getDateLength == 4 && !this.getNomineeDateErrMsg && this.guardianMoNumber.toString().length == 10 && this.guardianProoftype) {
          this.$store.dispatch("nominee/saveNomineeDetails", [json, proof, guardProof]).finally(()=>{
          })
      
      },
proofOfGuard(val) {
      this.guardianProoftype = val.name
      this.guardianProofNumber = ''
    },
fetchAddress() {
      if (this.isSameAsAddress) {
          this.Address = this.getProfileData.primary_address
            this.AddressLine2 = this.getProfileData.primary_address
            this.pincode =this.getProfileData.name
            this.state = this.getProfileData.name
      } 
      else {
        this.Address = ""
        this.AddressLine2 = "",
          this.pincode = "",
          this.state = ""
      }
    },
    fetchAddressGuardian() {
      if (this.isSameAsAddressGuardian) {
        this.Address = this.getProfileData.primary_address
            this.AddressLine2 = this.getProfileData.primary_address
            this.pincode =this.getProfileData.name
            this.state = this.getProfileData.name
        } 
      else {
        this.guardianAddress1 = "",
        this.guardianAddressLine2 = "",
          this.guardianPinCode = "",
          this.guardianState = ""
      }
    },
    },
    created() {
        
     this.fetchAddress()
    },
    watch: {
        isAgeModified(val) { }
    },
}
</script>
<style>
.menuButton {
  @apply inline-flex w-full border items-center px-4 py-2 text-sm focus:outline-none whitespace-nowrap text-[#070A26]
}

.menuItems {
  @apply absolute right-0 z-10 mt-1 max-h-[200px] overflow-y-auto w-full border origin-top-right drop-shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none bg-white
}
</style>