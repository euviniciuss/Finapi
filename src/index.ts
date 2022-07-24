import express, { json } from 'express'
import { v4 as uuid } from 'uuid'

const app = express()

app.use(express.json())

const customers: Customers[] = []

type Customers = {
  cpf: string
  name: string
  id: string
  statement: Array<string>
}

app.post("/account", (request, response) => {
  const id = uuid()

  const { cpf, name } = request.body

  const data: Customers = {
    id,
    cpf,
    name,
    statement: []
  }

  customers.push(data)

  console.log(customers);
  
  return response.status(201).json({ message: "Conta criada com sucesso!" })
})

app.listen(3333)