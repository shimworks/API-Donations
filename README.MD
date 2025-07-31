# Projeto
ONG de manipulação de Doações
API para ter o cadastro de todos os doadores e suas quantidades doadas
## Fluxo
POST - Criar Conta 
nome, cpf, telefone, email, senha

POST - Login
email, senha

PUT - Atualizar cadastro
nome, cpf, telefone, email, senha

DELETE - Remove doação

POST - Quantidade para doação
Valor(int)

GET - verificar quantidade de doação por individuo
Valor(int)

GET - Ranking de Doadores
JSON [
  {
    Nome: Doador A
    Valor: 100000,00
    Rank: 1
  }
]

# Tecnologias
Node.js
nodemon
express
JWT
Sequelize
Sequelize CLI
dotenv
MySQL server
Git
Docker
camelize
snakelize

# Paradigmas
REST
MSC
Middleware

# Testes
NYC verificação de cobertura
mocha
chai
sinon