<template>
    <div>
        <div class="mb-4 primary-color !font-bold text-sm">
            Enter your bank account details
        </div>

        <form @submit.prevent="handleSubmit()">

            <div class="my-4 flex-col items-center gap-5 flex-wrap">
                <div>
                    <div class="primary-color text-sm mb-1">Bank IFSC Code </div>
                    <div>
                        <input type="text" name="ifscCode" id="ifscCode" v-model="ifscCode" maxlength="11" placeholder="Bank IFSC Code" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" @input="validateIfsc(),keyPressIfsc($event),ifscCode?.length < 11 ? $store.commit('bankDetails/setIFSCDetails', '', {root:true}) : ''">
                                    <!-- Error Msg for First Name --> 
                     </div>
                     <div class="text-red-500 text-xs pt-1 h-3">{{ geterrormsg }}
                        <span class="text-red-500 text-xs pt-1 h-3" v-if="ifscCode == '' && isSubmit">Enter IFSC code</span>

</div>

                     <div class="text-sm primaryColor pt-1 uppercase">
                                <p  v-if="ifscCode?.length == 11 && getIFSCDetails.BANK || getIFSCDetails.BRANCH || getIFSCDetails.DISTRICT && getIFSCDetails">{{ getIFSCDetails.BANK }}, {{ getIFSCDetails.BRANCH }},{{ getIFSCDetails.DISTRICT }}</p>

                            </div>       
                             </div>
                <div class="h-5"></div>

                <div>
                    <div class="primary-color text-sm mb-1">Bank’s MICR Code</div>
                    <div>
                        <input type="text" name="MICRcode" id="MICRcode" maxlength="25" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Bank’s MICR Code"  v-model="MICRcode" @input="keyPressAlphaNumericMicr" />
                     </div>
                     <div class="h-4">
                       <span class="text-red-500 text-xs pt-1 h-3" v-if="MICRcode == '' && isSubmit">Enter MICR Number</span>
                    </div>                </div>
            </div>

            <div class="my-4  items-center gap-5 flex-wrap">
                <div >
                    <div class="primary-color text-sm mb-1">Enter your account number</div>
                    <div>
                        <input type="text"  maxlength="15" name="accountNo" id="accountNo" class="pw block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  autocomplete="off" v-model="accountNumber" placeholder="Bank Account Number" @input="keyPressAlphaNumericAcc"/>
                    </div>
                    <div class="h-4">
                       <span class="text-red-500 text-xs pt-1 h-3" v-if="accountNumber == '' && isSubmit">Enter Account Number</span>
                    </div>
                </div>
                <div class="h-5"></div>

                <div>
                    <div class="primary-color text-sm mb-1">Re-enter your account number</div>
                    <div>
                        <input type="text" name="reAccountNo" id="reAccountNo" class="block w-[350px] h-10 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  @paste.prevent @keyup="clrMisMatchErr" placeholder="Bank Account Number" maxlength="15" v-model="reEnterAccountNumber" autocomplete="off" @input="keyPressAlphaNumericReAcc" />
                    </div>
                    <div class="h-4">
                       <span class="text-red-500 text-xs pt-1 h-3" v-if="reEnterAccountNumber == '' && isSubmit">Re-enter Account Number</span>
                       <span class="text-red-500 text-xs pt-1 h-3" v-else-if="reEnterAccountNumber != accountNumber && isSubmit">Account number Mismatch</span>
                    </div>
                </div>
            </div>

            <div class="my-8 flex items-center gap-10" >
                <div class="flex flex-col gap-3">
                        <span class="primary-color text-sm">Make this my Primary bank account</span>
                        <div class="secondary-color text-xs">It will be for both trading and demat accounts</div>
                    </div>
                <Switch v-model="isPrimaryAcc" :class="[isPrimaryAcc ? 'violet-bg' : 'bg-gray-200', 'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out']">
                    <span aria-hidden="true" :class="[isPrimaryAcc ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']" />
                </Switch>
            </div>
            <div class="my-10 flex gap-3">
                <button type="button" class="cancelbtn" @click="cancel()">Cancel</button>
                <button type="submit" class="commonbtn" @click="savebankDetails"><spinner v-if="getLoader"/><span v-else>Submit</span></button>
            </div>
        </form>
    </div>
</template>

<script>
import icon from '../../components/utilComponents/icons.vue'
import { Switch } from '@headlessui/vue'
import { mapGetters } from 'vuex'

export default {
    components: { icon, Switch },
    data() {
        return {
            accountNo: '',
            reAccountNo: '',
            ifscCode: '',
            accountTypes : [
                { id: 'Savings', title: 'Savings' },
                { id: 'Current', title: 'Current' },
            ],
            accountType: 'Savings',
            isPrimaryAcc: false,
            MICRcode:'',
            accountNumber:'',
            reEnterAccountNumber: '',
            isSubmit: false,
        }
    },
    computed: {
        ...mapGetters('bankDetails', ['getIFSCDetails','geterrormsg']),
        ...mapGetters("auth", ["getUserId"]),
        ...mapGetters(['getLoader']),


    },
    methods: {
    cancel() {
      this.$emit('cancel');
    },
    
    validateForm() {
            return this.ifscCode != '' && this.accountNumber !== '' && this.MICRcode !==  '' && this.reEnterAccountNumber !== ''  &&  this.accountNumber == this.reEnterAccountNumber && this.ifscCode.length == 11
        },
    async validateIfsc(){
            if(this.ifscCode.length == 11){
                await this.$store.dispatch('bankDetails/IFSCDetails', this.ifscCode)
                this.MICRcode = this.getIFSCDetails.MICR || '';
                // console.log(this.getIFSCDetails.MICR)

            }else{
                this.MICRcode = '' 
                this.$store.commit('bankDetails/seterrormsg','');
            }
        },
        keyPressIfsc(event){
            this.$store.commit('bankDetails/seterrormsg','');
            const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '').toUpperCase();
            this.ifscCode = newValue.replace(/\s+/g, '');
        },
        keyPressAlphaNumericMicr(event){
            const newValue = event.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
            this.MICRcode = newValue.replace(/\s+/g, '');
        },
        keyPressAlphaNumericAcc(event) {
            const newValue = event.target.value.replace(/[^0-9]/g, '');
            this.accountNumber = newValue.replace(/\s+/g, '');
        },
        keyPressAlphaNumericReAcc(event) {
            const newValue = event.target.value.replace(/[^0-9]/g, '');
            this.reEnterAccountNumber = newValue.replace(/\s+/g, '');
        },
        async handleSubmit() {
    this.isSubmit = true
    if (this.validateForm()) { 
        let json = {
                        "uccCode": this.getUserId,
                        "micr": this.getIFSCDetails?.MICR,
                        "address":this.getIFSCDetails?.ADDRESS,
                        "branchName": this.getIFSCDetails?.BRANCH,
                        "ifsc": this.ifscCode,
                        "accountNo": this.accountNumber, 
                        "verifyAccNumber": this.reEnterAccountNumber,
                        "bank": this.getIFSCDetails?.BANK,
                        "bankCity":this.getIFSCDetails?.CENTRE,
                        "bankState":this.getIFSCDetails?.STATE,
                        "isPrimary": this.isPrimaryAcc ? 1 : 0,
                        // "pincode":this.getIFSCDetails?.ADDRESS,
            
        }
        await this.$store.dispatch('bankDetails/saveBankDetails', json)
        this.isSubmit = true
    }
},
 
    },
    unmounted() {
        this.$store.commit('bankDetails/seterrormsg','');
        this.$store.commit('bankDetails/setIFSCDetails','' )


    },

    watch: {
     
    }
}
</script>
<style scoped>
input.pw{
    -webkit-text-security: disc;
    text-security: disc;
}
</style>