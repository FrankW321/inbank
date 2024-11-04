// src/__tests__/NegativeDecision.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import NegativeDecision from '../NegativeDecision.vue'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      greeting: 'Hello',
      loanDeniedMessage:
        'We are sorry to inform you that your loan was denied.',
      incomeFactorsText: 'Several factors can influence your loan application.',
      exitButtonText: 'Back to Home',
    },
  },
})

const router = createRouter({
  history: createWebHistory(),
  routes: [{ name: 'home', path: '/' }],
})

describe('NegativeDecision', () => {
  let wrapper
  let userStore

  beforeEach(() => {
    const pinia = createPinia()
    setActivePinia(pinia)

    userStore = useUserStore()
    userStore.userDetails = { firstName: 'John' }

    wrapper = mount(NegativeDecision, {
      global: {
        plugins: [pinia, i18n, router],
      },
    })
  })

  it('renders the greeting message correctly', () => {
    expect(wrapper.find('h2').text()).toBe('Hello John')
  })

  it('displays the loan denial message', () => {
    expect(wrapper.find('p').text()).toBe(
      'We are sorry to inform you that your loan was denied.',
    )
  })

  it('displays the income factors text', () => {
    const incomeFactorsText = wrapper.find('p.border-b')
    expect(incomeFactorsText.exists()).toBe(true)
    expect(incomeFactorsText.text()).toBe(
      'Several factors can influence your loan application.',
    )
  })
})
