<template>
  <div>
    <HeaderSection @apply="scrollToCalculator" />
    <CalculatorSection ref="CalculatorSection" />
  </div>
</template>

<script lang="ts">
import HeaderSection from '../components/HeaderSection.vue'
import CalculatorSection from '../components/CalculatorSection.vue'

export default {
  components: { HeaderSection, CalculatorSection },

  methods: {
    scrollToCalculator() {
      const calculatorRef = this.$refs.CalculatorSection as InstanceType<
        typeof CalculatorSection
      >
      if (calculatorRef) {
        calculatorRef.$el.scrollIntoView({ behavior: 'smooth' })
      }
    },
  },
}
</script>

<style scoped></style>
