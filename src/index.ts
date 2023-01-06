import express, { response } from 'express'
import { v4 as uuidv4 } from 'uuid'

const api = express()

api.use(express.json())

type CustomersProps = {
  cpf: string
  name: string
  id: string
  statement: []
}

const customers: CustomersProps[] = []

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

api.get('/statement/:cpf', (request, reponse) => {
  const { cpf } = request.params

  const customer:CustomersProps | undefined = customers.find((customer) => customer.cpf === cpf)

  if (!customer) {
    return reponse.status(404).json({ error: "Cpf não encontrado!" })
  }

  return reponse.status(200).json(customer.statement)
})

api.listen(3333)