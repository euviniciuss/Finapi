import { CustomersProps } from '../../index'

declare global {
  namespace Express {
    export interface Request {
      customer?: CustomersProps
    }
  }
}