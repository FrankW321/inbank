export interface LoanDetails {
  amount: number
  period: number
  monthlyPayment: number
}

export interface UserDetails {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  monthlyIncome: number
  loan: LoanDetails
}

export interface ApiResponse {
  status: string
  message: string
}

export interface FormData {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  monthlyIncome: string
}

export interface Errors {
  firstName: string
  lastName: string
  mobileNumber: string
  email: string
  monthlyIncome: string
}
