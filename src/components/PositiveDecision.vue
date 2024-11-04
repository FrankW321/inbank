<template>
  <div class="flex justify-center p-4 text-brand-text-purple mt-12">
    <div
      class="w-full max-w-5xl flex flex-col lg:flex-row lg:border-8 lg:border-white lg:shadow-2xl rounded-3xl"
    >
      <div
        class="lg:w-1/2 w-full bg-brand-dark-yellow flex justify-center items-center py-16 relative md:rounded-3xl rounded-full"
      >
        <img
          src="@/assets/images/small-loan.png"
          alt="Loan success image"
          class="lg:relative lg:-right-12 w-2/3 lg:w-auto"
        />
      </div>
      <div
        class="lg:w-1/2 w-full flex flex-col justify-center sm:p-8 lg:p-16 mt-6 text-center lg:ml-4 sm:ml-0 fixed-top"
      >
        <h2 class="text-4xl lg:text-6xl font-semibold italic mb-4">
          {{ $t('goodNews') }}
        </h2>
        <p class="mb-8">{{ $t('loanApprovedMessage') }}</p>
        <ul class="mb-6 space-y-4 text-left">
          <li
            class="border-t border-b border-gray-300 py-4 flex justify-between"
          >
            <span class="w-1/2">{{ $t('loanAmount') }}</span>
            <span class="w-1/2 font-bold">{{ loan.amount }} €</span>
          </li>
          <li class="border-b border-gray-300 py-4 flex justify-between">
            <span class="w-1/2">{{ $t('loanPeriod') }}</span>
            <span class="w-1/2 font-bold"
              >{{ loan.period }} {{ $t('months') }}</span
            >
          </li>
          <li class="border-b border-gray-300 py-4 flex justify-between">
            <span class="w-1/2">{{ $t('monthlyPayment') }}</span>
            <span class="w-1/2 font-bold">
              {{ loan.monthlyPayment.toFixed(2) }} €
            </span>
          </li>
        </ul>
        <button
          @click="backToHome"
          class="cta-button bg-brand-dark-purple text-white py-3 rounded-lg w-full lg:w-auto px-8 mt-2"
        >
          {{ $t('backToHomePage') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'SuccessfulDecision',
  setup() {
    const store = useUserStore()
    const router = useRouter()
    const backToHome = () => {
      router.push({ name: 'home' })
    }
    return {
      backToHome,
      loan: store.userDetails.loan,
    }
  },
}
</script>

<style scoped></style>
