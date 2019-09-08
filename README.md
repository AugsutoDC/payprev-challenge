# Payprev Challenger

API desenvolvida em NodeJs para cadastros de developers através da api pública do GitHub e formação de times utilizando os developers cadastrados.
Para o desenvolvimento da api, foram utilizados o PostgreSQL, yup, sucrase e o sentry.

Rota base: 
https://api-payprev-challenge.herokuapp.com/

O arquivo **insomnia.json** possui uma collection de rotas para testes da api.


# Scripts

  -  **dev:**  Executa o projeto em modo de desenvolvimento.
  - **build:** Compila o projeto na pasta /dist afim de ser executado no modo de produção.
  - **start:** Executa o projeto em modo de produção.

# Rotas

As rotas disponíveis são:
 - /users
 - /developers
 - /teams
 - /teams/:teamId/member
 
## Users

Rota: https://api-payprev-challenge.herokuapp.com/users

Cadastro, atualização e login dos usuários.

Para o cadastro, as informações esperadas são:
 - name
 - email
 - password
 - cpf (números com 11 dígitos)
 - admin (true ou false)

Para a atualização, basta enviar os campos que deseja atualizar.
Se a atualização for a senha, devem ser enviados os seguintes campos:
 - oldPassword
 - password
 - confirmPassword
 
 ## Developers
 
 Rota: https://api-payprev-challenge.herokuapp.com/developers
 
 Cadastro, listagem e exclusão de developers.
 
 O cadastro de developers é feito buscando suas informações na API pública do GitHub.
 Para cadastrar, basta enviar o **username** do developer.
 
 **O cadastro e a exclusão de developers só podem serem realizadas por um usuário admin.**
 
 ## Teams
 
 Rota: https://api-payprev-challenge.herokuapp.com/teams
 
 Crud de times.
 
 Os Campos esperados no cadastro e atualização de um time é **name**.
 
 ## Member
 
 Rota: https://api-payprev-challenge.herokuapp.com/teams/:teamId/member
 
 Crud de membros de um time.
 
 Para o cadastro de um membro, os campos esperados são:
  - developer_id
  - tag
 
 Para a atualização, apenas o campo **tag** é esperado.
 
 **As alterações de um membro só poderão ser realizadas pelo usuário que criou o time.**
