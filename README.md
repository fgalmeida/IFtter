# Projeto MVC - IFtter

Bem-vindo ao IFtter! Este projeto é um aplicativo web desenvolvido utilizando a arquitetura MVC (Model-View-Controller) e possui funcionalidades semelhantes às do Twitter. Ele permite que os usuários criem contas, postem IFeets.

## Tecnologias Utilizadas

- Node.js: Plataforma de desenvolvimento do lado do servidor.
- Express: Framework web para Node.js.
- MongoDB: Banco de dados não relacional para armazenar os dados dos usuários e tweets.
- EJS: Sistema de templates para renderização das páginas HTML.
- Tailwind CSS: Para estilização do aplicativo.
- JavaScript: Linguagem de programação para lógica do front-end.

## Instalação

1. Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina.
2. Clone este repositório: `git clone https://github.com/fgalmeida/IFtter.git`
3. Acesse o diretório do projeto: `cd iftter`
4. Instale as dependências: `yarn add`
6. Inicie o servidor: `npm start`
7. Acesse o aplicativo no seu navegador: `http://localhost:3000`

## Estrutura de Pastas

```
app.js                 # Configuração principal do aplicativo
README.md                # Documentação do projeto (você está aqui!)
public/                  # Arquivos públicos (imagens, etc.)
src/
├── config/              # Arquivos de configurações do banco de dados e passport.js
├── controllers/         # Controladores do aplicativo
├── models/              # Definição dos modelos do banco de dados
├── routes/              # Rotas do aplicativo
└── views/               # Arquivos EJS para renderização de páginas HTML
```

## Funcionalidades

- Registro de novas contas de usuário.
- Autenticação e login de usuários.
- Visualização do feed de IFeets, mostrando os tweets próprios e dos usuários.
- Criação de novos IFeets.
- Pagina de administração como solicitado na proposta do trabalho, onde existe um CRUD para users, posts, categories.

## Contribuição

Se você deseja contribuir para o desenvolvimento deste projeto, fique à vontade para abrir um pull request. Todas as contribuições são bem-vindas!

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.

## Contato

Se você tiver alguma dúvida ou sugestão em relação ao projeto, sinta-se à vontade para entrar em contato:

Agradeco por usar o IFtter! Divirta-se interagindo e compartilhando seus IFeets com outros usuários. 🐦
