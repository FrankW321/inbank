<template>
  <div
    class="flex justify-center items-start lg:items-center p-4 text-brand-text-purple mt-20 lg:mt-0"
  >
    <div
      class="lg:shadow-2xl sm:shadow-none rounded-3xl w-full max-w-xs md:max-w-md lg:max-w-6xl lg:px-40 sm:p-0 lg:py-20 flex flex-col items-center text-center"
    >
      <h2 class="text-3xl md:text-4xl lg:text-6xl font-semibold mb-2">
        {{ $t('greeting') }} {{ firstName }}
      </h2>
      <p class="mb-6 md:mb-12">{{ $t('loanDeniedMessage') }}</p>
      <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-md">
        <p
          class="border-b border-t p-4 border-gray-300 text-gray-500 mb-6 md:mb-12"
        >
          {{ $t('incomeFactorsText') }}
        </p>
        <button
          @click="backToHome"
          class="cta-button bg-brand-dark-purple block w-full"
        >
          {{ $t('exitButtonText') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

export default {
  name: 'NegativeDecision',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    const backToHome = () => {
      router.push({ name: 'home' })
    }

    return {
      backToHome,
      firstName: userStore.userDetails.firstName,
    }
  },
}
</script>
