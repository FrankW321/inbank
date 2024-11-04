import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    userDetails: {
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      monthlyIncome: 0,
      loan: {
        amount: 0,
        period: 0,
        monthlyPayment: 0,
      },
    },
  }),
  getters: {
    fullName: state =>
      `${state.userDetails.firstName} ${state.userDetails.lastName}`,
    isLoanApproved: state =>
      state.userDetails.loan.amount > 0 && state.userDetails.loan.period > 0,
    formattedMonthlyPayment: state =>
      `${state.userDetails.loan.monthlyPayment.toFixed(2)} €`,
  },
  actions: {
    setUser(name: string) {
      const names = name.split(' ')
      this.userDetails.firstName = names[0]
      this.userDetails.lastName = names.slice(1).join(' ')
    },
    setContactDetails(mobileNumber: string, email: string) {
      this.userDetails.mobileNumber = mobileNumber
      this.userDetails.email = email
    },
    setMonthlyIncome(amount: number) {
      this.userDetails.monthlyIncome = amount
    },
    setLoanDetails(amount: number, period: number, monthlyPayment: number) {
      this.userDetails.loan.amount = amount
      this.userDetails.loan.period = period
      this.userDetails.loan.monthlyPayment = monthlyPayment
    },
    resetUser() {
      this.userDetails = {
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        monthlyIncome: 0,
        loan: {
          amount: 0,
          period: 0,
          monthlyPayment: 0,
        },
      }
    },
  },
})
