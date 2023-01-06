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

api.listen(3333)