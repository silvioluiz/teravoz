Simulação de Integração com a API da Teravoz, delegando chamadas do tipo 'call.standby' 

# 1. Execução com docker-compose

## 1.1 Stack

- KoaJS (Provimento de API)
- node-fetch (Consumo de API)
- Babel (transpilador) para uso de recursos de ES6 (async functions, import...)
- Webpack (Bundler pra parte Web)
- Winston (Logger)
- Docker-compose e docker para conteinerização

## 1.2 Arquitetura interna

![Arquitetura Interna](/TeravozDesafio.jpg)

## 1.3 Execução

Assumindo que o docker-compose está instalado, executar o comando abaixo no diretório raiz:

```docker-compose build```

Após execução, basta executar o comando abaixo:

```docker-compose up ```

Os logs envolvendo o evento do tipo *'*call.standby* serão exibidos na console do terminal. 

![Docker Compose Log](/docker-compose-log.png)


*Nota 1:* Os services criados não usam a [configuração de image do build](https://docs.docker.com/compose/compose-file/#build), pois na configuração atual uma vez executado o build a layer de aplicação utilizaria do cache do Docker, apenas refletindo alterações apagando as imagens criadas e refazendo o build.

*Nota 2:* A atual configuração não possui cache, mas requer que os builds executados - que gerarão imagens únicas - sejam apagados posteriormente.


# 2. Execução em Ambiente de desenvolvimento)

- Instalar as dependências do projeto.
- Executar scripts de transpilação e execução.
- Funcionamento

### 2.1 Instalar as dependências do projeto

- Após clonar o projeto, na pasta raiz executar o comando ```npm install```

### 2.2 Executar scripts de transpilação e execução (Ambiente de desenvolvimento)

- Necessário criar um arquivo .env tal qual o conteúdo abaixo:

  - WEBHOOK_HOST=http://localhost  
  - WEBHOOK_PORT=3000  
  - TERAVOZ_HOST=http://localhost  
  - TERAVOZ_PORT=3001  
  - TERAVOZ_USER=user  
  - TERAVOZ_PASSWORD=password  

- Executar a transpilação dos fontes com Babel: ```npm run build```. Esse comando irá gerar os arquivos transpilados no diretório **dist.**
- Inicializar scripts do Webhook: ```npm run start-webhook```
- Inicializar scripts do Teravoz: ```npm run start-teravoz```

*Nota:* Os serviços do *Webhook* e *Teravoz* estarão expostos respectivamente nas portas *3000* e *3001*.

### 2.3 Funcionamento

Após execução dos script's, arquivos de log serão gerados na pasta raiz. São eles:

- *error.log* :
    Arquivo com log dos erros da aplicação. Caso o webhook não esteja no ar, o teravoz irá registrar erros por não encontrar o serviço disponível.
- *full.log* :
    Log principal da aplicação(contém também os log's de erro). Todos os eventos do tipo *call.standby* que chegam no webhook e são delegados são registrados. Para visualizar todos os eventos que chegam no webhook, é preciso habilitar o debug no arquivo *src/config/logger.js*.

O arquivo src/webhook/models/db.json possui o registro dos números inicialmente cadastrados como contato. Quando um evento do tipo *call.standby* chega no Webhook e o número não existe, ele é registrado e esse arquivo é atualizado. 

*Nota:* Por não ser uma boa prática atualizar um arquivo da própria aplicação, persistência será atualizada para um REDIS via docker-compose.yml.

# TODO: 
- Substituir Json local por REDIS.
- Incluir Testes.
- Melhorias/correções nos script's para desenvolvimento.
- Configuração correta do Webpack para React.

# BÔNUS:
- React para eventos call.ongoing.

