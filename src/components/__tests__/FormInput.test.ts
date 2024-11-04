// src/__tests__/FormInput.test.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import FormInput from '@/components/FormInput.vue'

describe('FormInput', () => {
  it('renders the label correctly', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
      },
    })
    const label = wrapper.find('label')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Test Label')
  })

  it('displays the correct initial modelValue', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: 'Initial Value',
      },
    })
    const input = wrapper.find('input')
    expect(input.element.value).toBe('Initial Value')
  })

  it('emits update:modelValue with the correct value on input', async () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
      },
    })
    const input = wrapper.find('input')
    await input.setValue('New Value')
    expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['New Value'])
  })

  it('shows an error message when error prop is provided', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
        error: 'This field is required',
      },
    })
    const errorMessage = wrapper.find('p.text-red-500')
    expect(errorMessage.exists()).toBe(true)
    expect(errorMessage.text()).toBe('This field is required')
  })

  it('applies error styling to input when error prop is present', () => {
    const wrapper = mount(FormInput, {
      props: {
        id: 'test-input',
        label: 'Test Label',
        modelValue: '',
        error: 'This field is required',
      },
    })
    const input = wrapper.find('input')
    expect(input.classes()).toContain('border-red-500')
    expect(input.classes()).toContain('text-red-500')
  })
})
