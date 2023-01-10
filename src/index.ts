import express, { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

const api = express()

api.use(express.json())

export type CustomersProps = {
  cpf: string
  name: string
  id: string
  statement: []
}

const customers: CustomersProps[] = []

function verifyIfExistAccountCpf(request: Request, response: Response, next: NextFunction) {
  const { cpf } = request.headers

  const customer: CustomersProps | undefined = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return response.status(404).json({ error: "Cpf não encontrado!" })
  }

  request.customer = customer

  return next()
}

api.get('/users', (request, response) => {
  return response.json(customers)
})

api.post('/account', (request, response) => {
  const { name, cpf } = request.body

  const cpfAlreadyExist = customers.some((customer) => customer.cpf === cpf)

  if (cpfAlreadyExist) {
    return response.status(400).json({ error: "Cliente já cadastrado na base!" })
  }

  const id = uuidv4()

  const data: CustomersProps = {
    cpf,
    name,
    id,
    statement: []
  }

  customers.push(data)

  return response.status(201).json({ message: "Conta criada com sucesso" })
})

api.get('/statement', verifyIfExistAccountCpf, (request, response) => {
  const { customer } = request

  return response.status(200).json(customer?.statement)
})

api.listen(3333)