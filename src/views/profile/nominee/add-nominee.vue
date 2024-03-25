<template>
    <form @submit.prevent="addNominee()">
        <div class="mb-4 primary-color !font-bold text-sm">
            Enter your Nominee Details
        </div>

        <div class="my-4 flex gap-5 items-center">
            <div>
                <div class="primary-color text-sm mb-1">First Name</div>
                <div>
                    <input type="text" name="firstName" id="firstName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="toUpperCaseModel('firstName')" v-model="firstName"/>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">Last Name</div>
                <div>
                    <input type="text" name="lastName" id="lastName" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="toUpperCaseModel('lastName')" v-model="lastName"/>
                </div>
            </div>
        </div>

        

        <div class="my-3 flex gap-5 items-center">
            <div>
                <Listbox as="div" v-model="relationship" class="min-w-[350px]">
                <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">Relationship </ListboxLabel>
                <div class="relative">
                    <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                        <span class="block truncate">{{ relationship.name }}</span>
                        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                        <ListboxOptions class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            <ListboxOption as="template" v-for="i in relationships" :key="i.id" :value="i" v-slot="{ active, relationship }">
                                <li :class="[active ? 'violet-bg text-white' : 'text-gray-900', 'relative cursor-pointer select-none py-2 pl-8 pr-4']">
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
            </div>

            <div class="my-3">
                <div class="primary-color text-sm mb-1">Date of Birth</div>
                <div class="flex justify-between gap-2 min-w-[350px]">
                    <!-- Days dropdown -->
                    <Listbox as="div" v-model="nomineeDate" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                    <Listbox as="div" v-model="nomineeMonth" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
                     <Listbox as="div" v-model="nomineeYear" class="w-full">
                        <div class="relative">
                            <ListboxButton class="min-h-[40px] relative w-full cursor-pointer rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
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
            </div>
        </div>
        
        <div class="my-3 flex gap-5 items-center">
            <div class="my-3">
                <div class="primary-color text-sm mb-1">PAN (optional)</div>
                <div>
                    <input maxlength="10" @input="panNo ? panNo = panNo?.toUpperCase() : panNo" type="text" name="panNo" id="panNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="panNo"/>
                </div>
            </div>

            <div class="my-3">
                <div class="primary-color text-sm mb-1">Mobile No</div>
                <div>
                    <input maxlength="10" @input="digitKeyOnly($event, 'mobileNo')" type="text" name="mobileNo" id="mobileNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="mobileNo"/>
                </div>
            </div>
        </div>

        <div class="my-3 flex gap-5 items-center">
            <div class="my-3">
                <div class="primary-color text-sm mb-1">Nominee Share Percentage</div>
                <div>
                    <input maxlength="3" @input="digitKeyOnly($event, 'nomineeSharePercentage')" type="text" name="sharePercentage" id="sharePercentage" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="nomineeSharePercentage"/>
                </div>
            </div>
        </div>

        <div class="my-3">
            <div class="relative flex items-start">
                <div class="flex h-6 items-center">
                  <input name="isSameAddress" type="checkbox" class="h-4 w-4 rounded border-gray-300 primary-color cursor-pointer accent-violet-600" v-model="isSameAsAddress"/>
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
            </div>

            <div>
                <div class="primary-color text-sm mb-1">Address line 2</div>
                <div>
                    <input type="text" name="pincode" id="Address2" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="AddressLine2"/>
                </div>
            </div>
        </div>

        <div class="my-4 flex gap-5 items-center" v-if="!isSameAsAddress">
            <div>
                <div class="primary-color text-sm mb-1">State</div>
                <div>
                    <input type="text" name="state" id="state" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="state"/>
                </div>
            </div>

            <div>
                <div class="primary-color text-sm mb-1">PIN code</div>
                <div>
                    <input maxlength="6" @input="digitKeyOnly($event, 'pincode')" type="text" name="pincode" id="pincode" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" v-model="pincode"/>
                </div>
            </div>
        </div>

        <div v-if="getIsMinor">
            <div class="bg-violet-200 leading-6 text-sm rounded-md p-4 my-4 max-w-[800px]">
                <div class="primary-color !font-semibold mb-2">Why do you need a Guardian?</div>
                <p class="primary-color">The Nominee for your account is a Minor (below 18 years). For a minor nominee, you are requested to add a 
                guardian (who is above 18 years old). For obvious reasons, you can not be a Guardian or Nominee for your own account.</p>
            </div>
        </div>

        <div class="my-10 flex gap-3">
            <button type="button" class="cancelbtn" @click="backToNomineeDetails()">Cancel</button>
            <button type="submit" class="commonbtn">Submit</button>
        </div>
    </form>
</template>

<script>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
import icon from '../../../components/utilComponents/icons.vue'
import { mapGetters } from 'vuex'
export default {
    components: { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions, CheckIcon, ChevronUpDownIcon, icon },
    data() {
        return {
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
            firstName: '',
            lastName: '',
            panNo: '',
            isSameAsAddress: false,
            mobileNo: '',
            state: '',
            pincode: '',
            nomineeSharePercentage: 0,

            // 
            Address: '',
            AddressLine2:'',
            nomineeDate:'',
            nomineeMonth:'',
            nomineeYear:''
        }
    },
    
    computed: {
        ...mapGetters(['getMonths']),
        ...mapGetters('nominee',['getIsMinor', 'getNomineeList']),
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
            return `${this.nomineeYear}-${this.nomineeMonth.id}-${this.nomineeDate}`
        }
    },
    methods: {
        addNominee() {
            // let json = {
            //     firstName: this.firstName,
            //     lastName: this.lastName,
            //     panNo: this.panNo,
            //     relationship: this.relationship.name
            // }

            let address = this.Address.split(',')
            
            let json = {
                "data": {
                    "fsl_nominee_details": [ ]
                }
            }
            if(this.getNomineeList.length)
            json.data.fsl_nominee_details = [...this.getNomineeList ]
            json.data.fsl_nominee_details.push({
                "nominee_name": this.firstName,
                "percentage_allocation": Number(this.nomineeSharePercentage),
                "relationship": this.relationship.name,
                "date_of_birth": this.dateOfBirth,
                "pan": this.panNo,
                "mobile_number": this.mobileNo,
                "email_id": "",
                "address": address[0] ? address[0].trim() : address[0],
                "address_2": address[1] ? address[1].trim() : address[1],
                "address_3": address[2] ? address[2].trim() : address[2],
                "city": this.AddressLine2,
                "state": this.state,
                "pincode": this.pincode,
                "nominee_number": ""
            })

            // this.$store.commit('nominee/setNomineeList', json)
            if(this.getIsMinor) {
                this.$store.commit('nominee/setNomineeStage', 'addGuardian')
            } else {
                // this.$store.commit('nominee/setNomineeStage', 'nomineeSummary')
                this.$store.dispatch('nominee/addNomineeDetails', json)
            }
            
        },  

        backToNomineeDetails() {
            this.$store.commit('nominee/setNomineeStage', 'initialList')
        },

        toUpperCaseModel(vmodel) {
            if(this[vmodel]) {
                this[vmodel] = this[vmodel]?.toUpperCase()
            }
        },

        findUserIsMinor() {
            if (this.nomineeDate && this.nomineeMonth.month && this.nomineeYear) {
                let selectedDate = `${this.nomineeDate}/${this.nomineeMonth.month}/${this.nomineeYear}`
                var dob = new Date(selectedDate);
                //calculate month difference from current date in time  
                var month_diff = Date.now() - dob.getTime();

                //convert the calculated difference in date format  
                var age_dt = new Date(month_diff);

                //extract year from date      
                var year = age_dt.getUTCFullYear();

                //now calculate the age of the user  
                var age = Math.abs(year - 1970);
                if(Number(age) < 18) {
                    this.$store.commit('nominee/setIsMinor', true)
                } else {
                    this.$store.commit('nominee/setIsMinor', false)
                }
            }
        },

        digitKeyOnly(event, type) {
            // Allow only numeric values in the input field
            event.target.value = event.target.value?.toString()?.replace(/[^0-9]/g, '')
            if(type)
            this[type] = event.target.value
        },

    },
    watch: {
        isAgeModified(val) { }
    },
}
</script>