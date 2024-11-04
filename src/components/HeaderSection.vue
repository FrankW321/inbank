<template>
  <div
    class="w-full bg-brand-bg-white flex flex-col items-center pt-32 text-brand-text-purple"
  >
    <section
      class="flex flex-col-reverse sm:flex-col-reverse md:flex-row items-stretch w-full mb-12"
    >
      <div
        class="w-90 md:w-2/5 bg-brand-dark-yellow text-center rounded-custom flex items-center justify-center m-2 mr-4"
      >
        <div class="mx-4 sm:mx-8 py-8">
          <h2 class="text-lg font-semibold mb-2">{{ $t('miniLoan') }}</h2>
          <h2 class="lg:text-6xl text-4xl italic mb-2">
            {{ $t('takeChargeOfCosts') }}
          </h2>
          <p class="text-gray-700 mb-6">
            {{ $t('financeDescription') }}
          </p>
          <button
            @click="scrollToCalculator"
            class="cta-button bg-brand-bg-white text-center"
          >
            {{ $t('applyNow') }}
          </button>
        </div>
      </div>
      <div class="w-90 md:w-3/5 flex items-center justify-center m-2 ml-4">
        <img
          src="../assets/images/miniloan.png"
          alt="Man and dog mini loan offer"
          class="rounded-custom object-cover w-full h-full"
        />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HeaderSection',

  methods: {
    scrollToCalculator() {
      this.$emit('apply')
    },
  },
}
</script>

<style scoped></style>
