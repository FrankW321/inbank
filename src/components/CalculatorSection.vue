<template>
  <section class="calculator-section p-8 rounded-lg w-full md:text-left">
    <div
      class="flex flex-col md:flex-row md:space-x-8 items-center text-center"
    >
      <div class="w-full md:w-1/2 mb-8 md:mb-0">
        <h3 class="lg:text-6xl text-4xl italic mb-4">
          {{ $t('calculateMonthlyPayment') }}
        </h3>
        <p class="mb-8">{{ $t('estimateDescription') }}</p>
      </div>
      <div class="hidden md:block w-px bg-brand-border-grey"></div>
      <div class="w-full md:w-1/2">
        <div class="mb-6 flex flex-col md:flex-row md:space-x-4">
          <div class="w-full md:w-4/5 mt-5">
            <input
              type="range"
              id="amount"
              v-model="amount"
              :min="loanLowerLimit"
              :max="loanUpperLimit"
              step="100"
              class="custom-slider"
              :style="amountSliderStyle"
            />
            <div class="flex justify-between mt-2">
              <span>{{ loanLowerLimit }} €</span>
              <span>{{ loanUpperLimit }} €</span>
            </div>
          </div>
          <div class="w-full md:w-1/5 relative mt-6">
            <label
              :class="{
                'calc-label-top-left text-red-500': !isInRange,
                'calc-label-top-left': isInRange,
              }"
              for="amount"
            >
              {{ $t('amountLabel') }}
            </label>
            <input
              type="number"
              v-model="amount"
              class="mb-2 p-2 pl-4 border rounded-lg w-full text-left focus:outline-none focus:ring-2 focus:ring-brand-input-active"
              :class="{ 'border-red-500 text-red-500': !isInRange }"
            />
            <p v-if="amount > loanUpperLimit" class="text-red-500 text-xs mt-1">
              {{ $t('invalidAmount') }}
            </p>
          </div>
        </div>
        <div class="mb-6 flex flex-col md:flex-row md:space-x-4">
          <div class="w-full md:w-4/5 mt-5">
            <input
              type="range"
              id="period"
              v-model="period"
              :min="loanPeriodStart"
              :max="loanPeriodEnd"
              step="1"
              class="custom-slider"
              :style="sliderBackgroundStyle"
              @input="updatePeriodDisplay"
            />
            <div class="flex justify-between mt-2">
              <span>{{ loanPeriodStart }} {{ $t('months') }}</span>
              <span>{{ loanPeriodEnd }} {{ $t('months') }}</span>
            </div>
          </div>
          <div class="w-full md:w-1/5 relative mt-6">
            <label for="period" class="calc-label-top-left">{{
              $t('periodLabel')
            }}</label>
            <select
              v-model="fixedPeriod"
              @change="setPeriodFromDropdown"
              id="period"
              class="mb-2 p-2 pl-4 border rounded-lg w-full text-left bg-white focus:outline-none focus:ring-2 focus:ring-brand-input-active"
            >
              <option
                v-for="option in periodOptions"
                :key="option"
                :value="option"
              >
                {{ option }} {{ $t('months') }}
              </option>
            </select>
          </div>
        </div>
        <p class="mt-2">
          {{ $t('selectedPeriod') + ' ' }}{{ period }}{{ ' ' + $t('months') }}
        </p>
        <h4 class="text-lg font-semibold mb-2">{{ $t('monthlyPayment') }}</h4>
        <div class="text-4xl font-semibold mb-6">
          {{
            isInRange
              ? monthlyPayment.toFixed(2) + ' €'
              : $t('amountOutOfRange')
          }}
        </div>

        <button
          @click="openModal"
          class="cta-button block mx-auto"
          :class="
            isInRange
              ? 'bg-brand-dark-purple'
              : 'bg-brand-bg-disabled-grey text-brand-text-disabled-grey'
          "
          :disabled="!isInRange"
        >
          {{ $t('applyNow') }}
        </button>
        <p class="mt-6 text-xs">
          {{ $t('calculationDisclaimer') }}
        </p>
      </div>
      <LoanModal
        v-show="isModalOpen"
        :isModalOpen="isModalOpen"
        @close-modal="closeModal"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { ref, computed, defineComponent } from 'vue'
import LoanModal from '../components/modals/LoanModal.vue'
import { useUserStore } from '@/stores/userStore'

export default defineComponent({
  name: 'CalculatorSection',
  components: {
    LoanModal,
  },
  setup() {
    const store = useUserStore()

    const amount = ref(500)
    const period = ref(48)
    const fixedPeriod = ref(48)

    const loanPeriodStart = 2
    const loanPeriodEnd = 48
    const loanUpperLimit = 7200
    const loanLowerLimit = 300
    const periodOptions = [6, 12, 18, 24, 30, 36, 42, 48]

    const isModalOpen = ref(false)

    const openModal = () => {
      if (isInRange.value) {
        store.setLoanDetails(amount.value, period.value, monthlyPayment.value)
        isModalOpen.value = true
      }
    }

    const monthlyPayment = computed(() => {
      return amount.value / period.value + amount.value * 0.125
    })

    const setPeriodFromDropdown = () => {
      period.value = fixedPeriod.value
    }

    const amountSliderStyle = computed(() => {
      const percentage =
        ((amount.value - loanLowerLimit) / (loanUpperLimit - loanLowerLimit)) *
        100
      return {
        background: `linear-gradient(to right, #21093a ${percentage}%, #c6b5e2 ${percentage}%)`,
      }
    })

    const sliderBackgroundStyle = computed(() => {
      const percentage =
        ((period.value - loanPeriodStart) / (loanPeriodEnd - loanPeriodStart)) *
        100
      return {
        background: `linear-gradient(to right, #21093a ${percentage}%, #c6b5e2 ${percentage}%)`,
      }
    })

    const isInRange = computed(() => {
      return amount.value >= loanLowerLimit && amount.value <= loanUpperLimit
    })

    const updatePeriodDisplay = () => {
      fixedPeriod.value =
        periodOptions.find(option => option === period.value) ||
        fixedPeriod.value
    }

    const closeModal = () => {
      isModalOpen.value = false
    }

    return {
      amount,
      period,
      setPeriodFromDropdown,
      fixedPeriod,
      periodOptions,
      amountSliderStyle,
      sliderBackgroundStyle,
      updatePeriodDisplay,
      monthlyPayment,
      isInRange,
      openModal,
      closeModal,
      isModalOpen,
      loanLowerLimit,
      loanUpperLimit,
      loanPeriodStart,
      loanPeriodEnd,
    }
  },
})
</script>

<style scoped>
.calculator-section {
  background-color: #e3d2ff;
}

.custom-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background-color: black;
  border-radius: 4px;
  outline: none;
}

.custom-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 40px;
  height: 25px;
  background-color: #aa93ff;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.custom-slider::-moz-range-thumb {
  width: 35px;
  height: 20px;
  background-color: #aa93ff;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.calc-label-top-left {
  position: absolute;
  left: 0.75rem;
  top: -0.5rem;
  background-color: white;
  padding: 0 0.25rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
}
</style>
