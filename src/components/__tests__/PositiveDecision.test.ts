// src/__tests__/PositiveDecision.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import PositiveDecision from '../PositiveDecision.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      goodNews: 'Good News!',
      loanApprovedMessage: 'Congratulations! Your loan has been approved.',
      loanAmount: 'Loan Amount',
      loanPeriod: 'Loan Period',
      monthlyPayment: 'Monthly Payment',
      months: 'months',
      backToHomePage: 'Back to Home',
    },
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes: [{ name: 'home', path: '/' }],
})

describe('PositiveDecision', () => {
  let wrapper
  let userStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    userStore = useUserStore()
    userStore.userDetails = {
      loan: {
        amount: 5000,
        period: 12,
        monthlyPayment: 500,
      },
    }

    wrapper = mount(PositiveDecision, {
      global: {
        plugins: [pinia, i18n, router],
      },
    })
  })

  it('renders the component correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Good News!')

    expect(wrapper.find('p').text()).toBe(
      'Congratulations! Your loan has been approved.',
    )
  })

  it('displays loan details correctly', () => {
    const loanAmount = wrapper.find('li:nth-child(1) span:nth-child(2)')
    expect(loanAmount.text()).toBe('5000 €')

    const loanPeriod = wrapper.find('li:nth-child(2) span:nth-child(2)')
    expect(loanPeriod.text()).toBe('12 months')

    const monthlyPayment = wrapper.find('li:nth-child(3) span:nth-child(2)')
    expect(monthlyPayment.text()).toBe('500.00 €')
  })

  it('navigates to home on button click', async () => {
    const backToHomeButton = wrapper.find('button')
    await backToHomeButton.trigger('click')

    expect(router.currentRoute.value.name).toBe('home')
  })
})
