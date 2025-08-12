# Project Goal

This project was created with the goal of deepening my knowledge in developing a REST API using TDD (Test Driven Development) and the MSC (Model-Service-Controller) architecture. It demonstrates proficiency in all the technologies used (listed in the Technologies section), such as Express.js, Sequelize, and Docker, while also ensuring the security of sensitive data through JWT (JSON Web Token) hashing and BCrypt encryption.
I am aware there are several areas for improvement, and I am open to feedback.


# About the project

An API that allows users to create accounts and make donations of any amount. Donors (users) can view, update, and delete only their own donations.

---
# Sumary

- [Install](#install)
- [Usefull Comands](#usefull-comands)
- [Flow](#flow)
- [Routes](#routes)
- [Technologies](#technologies)
- [Development Paradigms](#development-paradigms)
- [Tests](#tests)
- [Next steps?](#next-steps)
- [My Vision](#my-vision)
---

## Install

* Após a clonagem do repositório com o comando
`git clone https://github.com/shimworks/API-Donations.git`.
* Acesse a pasta do repósitorio
`cd API-Donations`
* instale as dependências
`npm install`
* Crie o arquivo `.env` use como base o `.env-example`
`touch .env`
**MYSQL_USER não pode ser "root"**
* Para iniciar os containers do Docker execute o comando `npm run du`
* **Aguarde ~30sec** até a API inicializar
* Agora é só começar a executar as requisições

### Usefull Comands

- Derruba os containers Docker 
  `npm run dd`
  
- Acessa o bash da API 
  `npm run apibash`
  Para sair do container do docker `Crtl + C => Ctrl + D`
- Dentro do container da API, voce pode utilizar os comandos do Sequelize-CLI
  `npm run prestart` `npm run migrate` `npm run drop` `npm run seed` 
  **O comando "prestart" executa ao iniciar a API (`npm start`)**
  também há o comando personalizado que apaga o banco de dados e preenche com alguns dados iniciais
  `npm run reset`
- Pode executar testes com o comando
  `npm test`
- Acessa o bash do container do banco de dados  
  `npm run dbbash`
- Dentro do container do banco de dados pode acessar o Servidor MySQL
  `mysql -u root -p` após digite a senha que colocou no arquivo `.env` `MYSQL_ROOT_PASSWORD` com acesso ao bando de dados voce pode executar queries
  `USE donations_db;`
  `SHOW TABLES;`
  `SHOW FIELDS FROM Donors;`
  `SHOW FIELDS FROM Donations;`
  `SELECT * FROM Donors;`
  `SELECT * FROM Donations;`
---
## Flow

`Criar conta => Login => Criar doação => Ver/Atualizar/Deletar Doação`
Ao criar conta os dados sensíveis são criptografados e então salvos no bando de dados MySQL, fazendo login utiliza a senha e o email da requisição e compara com os dados descriptografados do banco de dados, utilizando alguns dados do usuário é criado o token, para facilitar a navegação e evitar requisições extras ao banco de dados, com o token em "mãos" o usuário consegue fazer as requisições relacionadas as doações, mas somente sobre as doações que tem posse.


### Routes

POST - Criar Conta 
```
localhost:3001/signup
```
```json
{
  "fullName": "Jane Doe",
  "email": "jane.Doe@email.com",
  "phone": "089 908 321",
  "password": "seenhaJane"
}
```
![singup](/Global/Pics/01-singup.png)

POST - Login
```
localhost:3001/login
```
```json
{
  "email": "jane.Doe@email.com",
  "password": "seenhaJane"
}
```
![login](/Global/Pics/02-login.png)

POST - Criar doação
```js
localhost:3001/donation // precisa utilizar o Token para fazer esta requisição
```
```json
{
  "value": 1871
}
```
![usingToken](/Global/Pics/03_1-postDonation.png)
![creatingDonation](/Global/Pics/03_2-postDonation.png)

GET - Ver doação
```js
localhost:3001/donation // precisa utilizar o Token para fazer esta requisição
```
![getDonation](/Global/Pics/04-getDonation.png)

PUT - Atualizar Doação
```js
localhost:3001/donation/1 // precisa utilizar o Token para fazer esta requisição
```
```json
{
  "value": 222
}
```
![putDonation](/Global/Pics/05-putDonation.png)

DELETE - Deletar Doação
```js
 localhost:3001/donation/1 // precisa utilizar o Token para fazer esta requisição
```
![deleteDonation](/Global/Pics/06-deleteDonation.png)

# Technologies
- JavaScript
- Node.js
- Nodemon
- Express
- JWT
- Bcrypt
- Sequelize
- Sequelize CLI
- dotenv
- MySQL server
- Git
- Docker
- camelize
- snakelize

# Development Paradigms
- REST
- MSC (Model Services Controller)
- TDD (Test Driven Development)

# Tests
- mocha
- chai
- chai-http
- sinon

---

# Next steps?

[ ] Implementar Swagger  
[ ] Adicionar Endpoint para atualizar cadastro do Doador  
[ ] Adicionar cadastro de ADMIN  
[ ] Adicionar endopints para ADMIN (Gerenciar Doadores, Doações e ADMIN)  

### My Vision 
Em relação aos Proximos passos, com excessão da implementação do Swagger, construí esse projeto habilitando escalabilidade então adicionar mais usuários, endpoints, etc. não trará muita experiência, seria "a repetição leva a perfeição". Se estruturei minha API Bem, vai continuar bem, e vice-versa.


