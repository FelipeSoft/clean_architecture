# Guia de Instalação
Para utilizar corretamente este repositório, siga as seguinte etapas:
### 1º Passo
Abra um prompt de comando no local desejado, e clone o repositório:
`git clone https://github.com/FelipeSoft/clean_architecture.git`

### 2º Passo
Selecione a pasta recém criada com o comando a seguir:

`cd clean_architecture`

Digite o comando para abrir com o editor de código Visual Studio Code:

`code .`

### 3º Passo
Abra um novo terminal integrado com `CTRL + SHIFT + '` e digite o seguinte:

`npm install`

`npm run watch`

> **Atenção!** Mantenha esse terminal rodando.

### 4º Passo
Abra novamente um novo terminal integrado, e digite o comando:

`npm run dev`

> **Atenção!** Mantenha esse terminal rodando.
 
### 5º Passo 

Copie e cole o arquivo `.env.example` e renomeie a cópia para `.env`, e em seguida altere as variáveis de ambiente conforme o necessário.

Abra o endereço `localhost:8080` para ver a API funcionando.

### Testes de Integração e Unitários
Para rodar os arquivos de testes com extensão `.test.js` ou `.test.ts`, que se encontram na pasta **/test**, digite o seguinte comando:

`npm run test dist/test/caminho/até/o/arquivo/de/teste`

Ou se preferir rodar **todos** os testes de uma só vez, digite apenas:

`npm run test`