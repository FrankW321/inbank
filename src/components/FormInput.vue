<template>
  <div class="relative mt-6">
    <label
      :class="{
        'label-top-left text-red-500': error,
        'label-top-left': !error,
      }"
      :for="id"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="updateValue($event)"
      class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-input-active"
      :class="{ 'border-red-500 text-red-500': error }"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormInput',
  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },
    label: {
      type: String as PropType<string>,
      required: true,
    },
    placeholder: {
      type: String as PropType<string>,
      default: '',
    },
    error: {
      type: String as PropType<string>,
      default: '',
    },
    type: {
      type: String as PropType<string>,
      default: 'text',
    },
    modelValue: {
      type: String as PropType<string>,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (event: Event) => {
      const target = event.target as HTMLInputElement | null
      if (target) {
        emit('update:modelValue', target.value)
      }
    }

    return {
      updateValue,
    }
  },
})
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
</style>
