// src/__tests__/CalculatorSection.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import CalculatorSection from '@/components/CalculatorSection.vue'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      calculateMonthlyPayment: 'Calculate Monthly Payment',
      estimateDescription:
        'Use this calculator to estimate your monthly payment.',
      amountLabel: 'Amount',
      periodLabel: 'Loan Period',
      months: 'months',
      selectedPeriod: 'Selected Period:',
      monthlyPayment: 'Monthly Payment',
      amountOutOfRange: 'Amount is out of range',
      applyNow: 'Apply Now',
      invalidAmount: 'Invalid amount',
      calculationDisclaimer: 'This is an estimation and may vary.',
    },
  },
})

describe('CalculatorSection', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CalculatorSection, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          i18n,
        ],
      },
    })
  })

  it('calculates monthly payment correctly', () => {
    wrapper.vm.amount = 1000
    wrapper.vm.period = 12
    expect(wrapper.vm.monthlyPayment).toBeCloseTo(208.33, 2)
  })

  it('disables "Apply Now" button if amount is out of range', () => {
    wrapper.vm.amount = 10000
    expect(wrapper.vm.isInRange).toBe(false)
  })

  it('shows error message when amount exceeds upper limit', async () => {
    wrapper.vm.amount = 8000
    await wrapper.vm.$nextTick()
    const errorMessage = wrapper.find('.text-xs')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toContain(wrapper.vm.$t('invalidAmount'))
  })

  it('opens modal on "Apply Now" button click if amount is within range', async () => {
    wrapper.vm.amount = 5000
    wrapper.vm.period = 12
    wrapper.vm.isModalOpen = false

    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.isModalOpen).toBe(true)
  })

  it('sets period from dropdown and updates the displayed period', async () => {
    wrapper.vm.fixedPeriod = 24
    wrapper.vm.setPeriodFromDropdown()
    expect(wrapper.vm.period).toBe(24)
  })

  it('applies correct background style to sliders based on amount and period', () => {
    wrapper.vm.amount = 3600
    wrapper.vm.period = 24

    const amountSliderStyle = wrapper.vm.amountSliderStyle
    const sliderBackgroundStyle = wrapper.vm.sliderBackgroundStyle

    expect(amountSliderStyle.background).toContain('#21093a')
    expect(sliderBackgroundStyle.background).toContain('#21093a')
  })
})
