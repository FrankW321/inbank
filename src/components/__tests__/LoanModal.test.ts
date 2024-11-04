// src/__tests__/LoanModal.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import LoanModal from '../modals/LoanModal.vue'
import { createTestingPinia } from '@pinia/testing'
import { createI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: {
      modalTitle: 'Loan Application',
      firstName: 'First Name',
      firstNamePlaceholder: 'Enter your first name',
      lastName: 'Last Name',
      lastNamePlaceholder: 'Enter your last name',
      mobileNumber: 'Mobile Number',
      mobileNumberPlaceholder: 'Enter your mobile number',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      monthlyIncome: 'Monthly Income',
      monthlyIncomePlaceholder: 'Enter your monthly income',
      submitButton: 'Submit',
      invalidAmount: 'Invalid amount',
      firstNameRequired: 'First name is required',
      lastNameRequired: 'Last name is required',
      mobileNumberInvalid:
        'Mobile number must start with "55" and be 7-8 digits',
      emailInvalid: 'Invalid email address',
      incomeInvalid: 'Monthly income must be greater than 100',
    },
  },
})

describe('LoanModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LoanModal, {
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

  it('renders the component with title', () => {
    expect(wrapper.find('h2').text()).toBe(wrapper.vm.$t('modalTitle'))
  })

  it('displays error if first name is empty', async () => {
    wrapper.vm.formData.firstName = ''
    await wrapper.vm.submitForm()
    expect(wrapper.vm.errors.firstName).toBe(wrapper.vm.$t('firstNameRequired'))
  })

  it('displays error if last name is empty', async () => {
    wrapper.vm.formData.lastName = ''
    await wrapper.vm.submitForm()
    expect(wrapper.vm.errors.lastName).toBe(wrapper.vm.$t('lastNameRequired'))
  })

  it('displays error if mobile number is invalid', async () => {
    wrapper.vm.formData.mobileNumber = '1234567'
    await wrapper.vm.submitForm()
    expect(wrapper.vm.errors.mobileNumber).toBe(
      wrapper.vm.$t('mobileNumberInvalid'),
    )
  })

  it('displays error if email is invalid', async () => {
    wrapper.vm.formData.email = 'invalidemail'
    await wrapper.vm.submitForm()
    expect(wrapper.vm.errors.email).toBe(wrapper.vm.$t('emailInvalid'))
  })

  it('displays error if monthly income is invalid', async () => {
    wrapper.vm.formData.monthlyIncome = '50'
    await wrapper.vm.submitForm()
    expect(wrapper.vm.errors.monthlyIncome).toBe(wrapper.vm.$t('incomeInvalid'))
  })

  it('submits form correctly when all fields are valid', async () => {
    const userStore = useUserStore()
    wrapper.vm.formData = {
      firstName: 'John',
      lastName: 'Doe',
      mobileNumber: '55123456',
      email: 'john.doe@example.com',
      monthlyIncome: '1500',
    }
    await wrapper.vm.submitForm()

    expect(userStore.setUser).toHaveBeenCalledWith('John Doe')
    expect(userStore.setContactDetails).toHaveBeenCalledWith(
      '55123456',
      'john.doe@example.com',
    )
    expect(userStore.setMonthlyIncome).toHaveBeenCalledWith(1500)
  })

  it('emits close-modal event on close button click', async () => {
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('close-modal')).toBeTruthy()
  })
})
