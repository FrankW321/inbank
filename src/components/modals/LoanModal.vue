<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal"
  >
    <div
      class="bg-brand-bg-white w-2/4 xl:w-1/3 p-9 rounded-3xl shadow-lg relative z-49 modal-content mt-6"
    >
      <button @click="closeModal" class="absolute top-6 right-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-xl mb-6 font-semibold text-left">
        {{ $t('modalTitle') }}
      </h2>
      <form @submit.prevent="submitForm">
        <div class="space-y-4 text-brand-text-purple text-left">
          <FormInput
            v-model="formData.firstName"
            :label="$t('firstName')"
            :placeholder="$t('firstNamePlaceholder')"
            :error="errors.firstName"
            id="firstName"
          />
          <FormInput
            v-model="formData.lastName"
            :label="$t('lastName')"
            :placeholder="$t('lastNamePlaceholder')"
            :error="errors.lastName"
            id="lastName"
          />
          <FormInput
            v-model="formData.mobileNumber"
            :label="$t('mobileNumber')"
            :placeholder="$t('mobileNumberPlaceholder')"
            :error="errors.mobileNumber"
            id="mobileNumber"
          />
          <FormInput
            v-model="formData.email"
            :label="$t('email')"
            :placeholder="$t('emailPlaceholder')"
            :error="errors.email"
            id="email"
            type="email"
          />
          <FormInput
            v-model="formData.monthlyIncome"
            :label="$t('monthlyIncome')"
            :placeholder="$t('monthlyIncomePlaceholder')"
            :error="errors.monthlyIncome"
            id="monthlyIncome"
            type="number"
          />
        </div>
        <button
          type="submit"
          class="cta-button bg-brand-dark-purple block w-full mt-6"
        >
          {{ $t('submitButton') }}
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
/* import { submitUserData } from '../../api/apiService' */
import FormInput from '../FormInput.vue'

export default {
  name: 'LoanModal',
  components: {
    FormInput,
  },
  setup(props, { emit }) {
    const router = useRouter()
    const userStore = useUserStore()

    const formData = ref({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      monthlyIncome: '',
    })
    const errors = ref<Record<string, string>>({
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      monthlyIncome: '',
    })

    const closeModal = () => {
      emit('close-modal')
    }

    const validateForm = () => {
      errors.value = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        monthlyIncome: '',
      }
      let isValid = true

      if (!formData.value.firstName) {
        errors.value.firstName = 'First name is required'
        isValid = false
      } else if (/\d/.test(formData.value.firstName)) {
        errors.value.firstName = 'First name cannot contain numbers'
        isValid = false
      }
      if (!formData.value.lastName) {
        errors.value.lastName = 'Last name is required'
        isValid = false
      } else if (/\d/.test(formData.value.lastName)) {
        errors.value.lastName = 'Last name cannot contain numbers'
        isValid = false
      }
      const mobileRegex = /^55\d{5,6}$/
      if (!mobileRegex.test(formData.value.mobileNumber)) {
        errors.value.mobileNumber =
          'Mobile number must start with "55" and be 7-8 digits'
        isValid = false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.value.email)) {
        errors.value.email = 'Invalid email address'
        isValid = false
      }
      const income = parseFloat(formData.value.monthlyIncome)
      if (isNaN(income) || income <= 100) {
        errors.value.monthlyIncome = 'Monthly income must be greater than 100'
        isValid = false
      }

      return isValid
    }

    const submitForm = async () => {
      if (validateForm()) {
        userStore.setUser(
          `${formData.value.firstName} ${formData.value.lastName}`,
        )
        userStore.setContactDetails(
          formData.value.mobileNumber,
          formData.value.email,
        )
        userStore.setMonthlyIncome(parseFloat(formData.value.monthlyIncome))

        /*
          const loanDetails = {
          firstName: userStore.userDetails.firstName,
          lastName: userStore.userDetails.lastName,
          mobileNumber: userStore.userDetails.mobileNumber,
          email: userStore.userDetails.email,
          monthlyIncome: userStore.userDetails.monthlyIncome,
          loan: userStore.userDetails.loan,
        }
        */

        try {
          /* await submitUserData(loanDetails) */
          const income = parseFloat(formData.value.monthlyIncome)
          if (income > 1000) {
            router.push({ name: 'SuccessfulDecision' })
          } else {
            router.push({ name: 'NegativeDecision' })
          }
        } catch (error) {
          console.error('Failed to submit user data:', error)
        }
      }
    }

    return {
      formData,
      errors,
      submitForm,
      closeModal,
    }
  },
}
</script>

<style scoped>
.label-top-left {
  position: absolute;
  top: -0.5rem;
  left: 0.75rem;
  background-color: white;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
}

.modal {
  margin: 0 !important;
}

@media (max-width: 640px) {
  .modal-content {
    width: 100%;
    align-self: flex-end;
    top: 20px;
  }
}
</style>
