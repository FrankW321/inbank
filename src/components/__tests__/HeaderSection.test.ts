// src/__tests__/HeaderSection.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import HeaderSection from '@/components/HeaderSection.vue'

describe('HeaderSection', () => {
  const mockT = vi.fn(key => {
    const translations = {
      miniLoan: 'Mini Loan',
      takeChargeOfCosts: 'Take Charge of Your Costs',
      financeDescription: 'This is a sample finance description.',
      applyNow: 'Apply Now',
    }
    return translations[key] || key
  })

  const wrapper = mount(HeaderSection, {
    global: {
      mocks: {
        $t: mockT,
      },
    },
  })

  it('renders translated text correctly', () => {
    expect(wrapper.find('h2').text()).toContain('Mini Loan')
    expect(wrapper.find('.italic').text()).toBe('Take Charge of Your Costs')
    expect(wrapper.find('p').text()).toBe(
      'This is a sample finance description.',
    )
    expect(wrapper.find('button').text()).toBe('Apply Now')
  })

  it('renders the image with correct attributes', () => {
    const image = wrapper.find('img')
    expect(image.exists()).toBe(true)
    expect(image.attributes('src')).toBe('/src/assets/images/miniloan.png')
    expect(image.attributes('alt')).toBe('Man and dog mini loan offer')
  })

  it('emits apply event when "Apply Now" button is clicked', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(wrapper.emitted('apply')).toBeTruthy()
    expect(wrapper.emitted('apply')?.length).toBe(1)
  })
})
