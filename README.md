# Curso Cypress Intermediário

Projeto do curso de Cypress nível intermediário da escola Talking About Testing online school.

<p align="center">
    <img width="960" height="540" src="src/cypressIntermediario.gif">
</p>

## Pré-requisitos

Antes de começar, garanta que os seguintes sistemas estejam instalados em seu computador.

- [git](https://git-scm.com/) (estou usando a versão `2.31.1` enquanto desenvolvo os testes)
- [Node.js](https://nodejs.org/en/) (estou usando a versão `v16.13.2` enquanto desenvolvo os testes)
- npm (estou usando a versão `8.3.2` enquanto desenvolvo os testes)
- [Visual Studio Code](https://code.visualstudio.com/) (estou usando a versão `1.67.2` enquanto desenvolvo os testes) ou alguma outra IDE de sua preferência
- [Docker](https://www.docker.com/) (estou usando a versão `20.10.13` enquanto desenvolvo os testes)

> **Obs.:** Recomendo utilizar as mesmas versões, ou versões mais recentes dos sistemas listados acima.
>
> **Obs. 2:** Ao instalar o Node.js o npm é instalado junto. 🎉
>
> **Obs. 3:** Para verificar as versões do Docker, git, Node.js e npm instaladas em seu computador, execute o comando `docker --version && git --version && node --version && npm --version` no seu terminal de linha de comando.
>
> **Obs. 4:** Deixei links para os instaladores na lista de requisitos acima, caso não os tenha instalados ainda.
>
> **Obs. 5:** Caso tenha alguma dúvida [aqui](https://github.com/wlsf82/cypress-intermediario-v2/tree/final-solution) está o repositório do Walmyr que desenvolveu o curso.
___

Legal, os pre-requisitos estão prontos. ☑️

# Conhecendo a aplicação em teste

Para o curso intermediário de Cypress da Escola TAT, foi elaborado uma aplicação complexa. Esta aplicação é uma [versão _open-source_ do GitLab, rodando em um _container_](https://hub.docker.com/r/wlsf82/gitlab-ce) em seu ambiente local.

O GitLab possui diversas funcionalidades, porém, duruante o curso testaremos as seguintes:

- _Login_
- _Logout_
- Criação de projeto
- Criação de _issue_
- Adição de uma etiqueta (_label_) à uma _issue_
- Adição de um marco (_milestone_) à uma _issue_
- Git clone

## Instalação

### _Setup_ do ambiente local com Docker

Com o docker rodando em seu computador, execute o comando `docker run --publish 80:80 --publish 22:22 --hostname localhost wlsf82/gitlab-ce` e aguarde até o ambiente inicializar.

> 🕐 Isso por levar alguns minutos.

### Definindo a senha do usuário `root`

Depois de alguns minutos, acesse a URL http://localhost para definir a senha do usuário `root`.

Ao acessar a URL http://localhost, você deve ver uma página para trocar a senha do usuário `root`.

Digite uma senha, confirme a mesma e clique no botão _Change your password_.

### Criando um Access Token

1. Faça login com o usuário `root` com a senha definida na seção anterior
2. Clique no avatar do usuário no canto superior direito da tela; clique no link _Settings_, e então; clique na opção _Access Tokens_ (no menu lateral esquerdo)
3. No campo nome, digite o valor `cypress-intermediario-v2`; na seção _Scopes_ marque a opção **api**; e então, clique no botão _Create personal access token_.

> Uma mensagem de que o _token_ foi criado com sucesso deve ser exibida, além do _token_ propriamente dito. **Copie o _token_ clicando no botão à direita do campo e salve no arquivo _cypress.env.json_ na chave _gitlab_access_token_**.

### Adicionando uma chave SSH

1. No terminal de linha de comando, digite o seguinte comando e pressione ENTER `ssh-keygen -t ed25519 -C "root@example.com"`
2. Será solicitado um caminho para salvar a chave. Pressione ENTER para aceitar o caminho padrão
3. Será solicitada uma senha. Pressione ENTER para que a senha não seja necessária
4. Será solicitado que repita a senha. Pressione ENTER novamente para que a senha não seja necessária
5. De novo no terminal de linha de comando, digite o seguinte comando e pressione ENTER para copiar a chave pública recém criada para a área de transferência `cat ~/.ssh/id_ed25519.pub | clip`
6. Logado na aplicação com o usuário `root`, clique no avatar do usuário no canto superior direito da tela; clique no link _Settings_; e então, clique na opção _SSH Keys_ (no menu lateral esquerdo)
7. Cole sua chave SSH pública no campo key. O campo _Title_ deve ser automaticamente preenchido
8. Por fim, clique no botão _Add key_.

> Você também encontrará instruções sobre como gerar a chave SSH em sistema operacional Windows na própria aplicação em teste (rodando em seu ambiente local com Docker) a partir da seguinte URL http://localhost/help/ssh/README#generating-a-new-ssh-key-pair (**instruções em Inglês**).


### Instalando o Cypress e outras _libs_

No terminal de linha de comando, na raiz do projeto, execute o comando `npm i @faker-js/faker@7.6.0 cypress@12.0.2 cypress-plugin-api@2.6.1 -D` (este comando irá instalar o Cypress e outras _libs_ como dependências de desenvolvimento, além de criar o arquivo `package-lock.json` e o diretório `node_modules/`, para onde é feito o _download_ de todas as dependências).

> A _lib_ [`faker`](https://www.npmjs.com/package/@faker-js/faker) será utilizada para a criação de dados aleatórios para os testes
> 
> E a _lib_ [`cypress-plugin-api`](https://www.npmjs.com/package/cypress-plugin-api) será utilizada para prover feedback visual durante os testes de API.


## Testes

Você pode executar os testes simulando uma versão _Desktop_ do GitLab.

### Desktop

- No terminal execute `npm run cy:open` para abrir o _Test Runner_ e rodar os testes ou escolher um cenário específico.

  Ou

- No terminal execute `npm run cy:run` executar os teste no modo _headless_ e executar todos os testes

## Apoiar esse projeto

Se você gostar desse projeto deixa uma ⭐.

___

Este projeto foi desenvolvido por [Pet 🐱](https://www.linkedin.com/in/petherson-erasmo/) enquanto assista o curso de cypress intemediário do [Walmyr](https://talkingabouttesting.coursify.me/courses/testes-automatizados-com-cypress-intermediario).