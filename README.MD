# Objetivo do projeto

Este projeto foi criado com o objetivo de aprofundar meu conhecimento no desenvolvimento de uma API REST, com TDD(Test Driven Development) e estrutura MSC(Model Service Controller), demonstrar domínio de todas as tecnologias utilizadas(Sessão de tecnologias) como Express.js, Sequelize e Docker, também atento a segurança dos dados sensíveis através de Hash JWT(Json Web Token) e Criptografia BCrypt.
Sei que há varios pontos de melhoria e estou aberto a feedbacks.


# Sobre o projeto

Uma API para usuários criarem contas e doarem qualquer valor, os Doadores(usuários) podem ver, alterar e deletar somente suas próprias doações.

---
# Sumário

- [Instalação](#Instalação)
- [Comandos úteis](#comandos-úteis)
- [Fluxo](#fluxo)
- [Rotas](#rotas)
- [Tecnologias](#tecnologias)
- [Paradigmas](#Paradigmas)
- [Testes](#Testes)
- [Próximos Passos?](#próximos-passos)
- [Minha Visão](#minha-visão)
---

## Instalação

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

### Comandos úteis

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
## Fluxo

`Criar conta => Login => Criar doação => Ver/Atualizar/Deletar Doação`
Ao criar conta os dados sensíveis são criptografados e então salvos no bando de dados MySQL, fazendo login utiliza a senha e o email da requisição e compara com os dados descriptografados do banco de dados, utilizando alguns dados do usuário é criado o token, para facilitar a navegação e evitar requisições extras ao banco de dados, com o token em "mãos" o usuário consegue fazer as requisições relacionadas as doações, mas somente sobre as doações que tem posse.


### Rotas

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
```
localhost:3001/donation // precisa utilizar o Token para fazer esta reequisição
```
```json
{
  "value": 1871
}
```
![usingToken](/Global/Pics/03_1-postDonation.png)
![creatingDonation](/Global/Pics/03_2-postDonation.png)

GET - Ver doação
```
localhost:3001/donation // precisa utilizar o Token para fazer esta reequisição
```
![getDonation](/Global/Pics/04-getDonation.png)

PUT - Atualizar Doação
```
localhost:3001/donation/1 // precisa utilizar o Token para fazer esta reequisição
```
```json
{
  "value": 222
}
```
![putDonation](/Global/Pics/05-putDonation.png)

DELETE - Deletar Doação
```
 localhost:3001/donation/1 // precisa utilizar o Token para fazer esta reequisição
```
![deleteDonation](/Global/Pics/06-deleteDonation.png)

# Tecnologias
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

# Paradigmas
- REST
- MSC (Model Services Controller)
- TDD (Test Driven Development)

# Testes
- mocha
- chai
- chai-http
- sinon

---

# Próximos Passos?

[ ] Implementar Swagger  
[ ] Adicionar Endpoint para atualizar cadastro do Doador
[ ] Adicionar cadastro de ADMIN 
[ ] Adicionar endopints para ADMIN (Gerenciar Doadores, Doações e ADMIN)

### Minha Visão 
Em relação aos Proximos passos, com excessão da implementação do Swagger, constrí esse projeto habilitando escalabilidade então adicionar mais usuários, endpoints, etc. não trará muita experiência uma vez que é "Mais do mesmo" ou seja, repetição. Se estruturei minha API Bem, vai continuar bem, e vice-versa.


