Simulação de Integração com a API da Teravoz, delegando chamadas do tipo 'call.standby' 

# Passos para utilização

- Instalar as dependências do projeto.
- Executar scripts de transpilação e execução.
- Funcionamento

## Instalar as dependências do projeto

- Após clonar o projeto, na pasta raiz executar o comando ```npm install```

## Executar scripts de transpilação e execução

- Executar a transpilação dos fontes com Babel: ```npm run build```. Esse comando irá gerar os arquivos transpilados no diretório **dist.**
- Inicializar scripts do Webhook: ```npm run start-webhook```
- Inicializar scripts do Teravoz: ```npm run start-teravoz```

Os serviços do *Webhook* e *Teravoz* estarão expostos respectivamente nas portas *3000* e *3001*.

## Funcionamento

Após execução dos script's, arquivos de log serão gerados na pasta raiz. São eles:

- *error.log* :
    Arquivo com log dos erros da aplicação. Caso o webhook não esteja no ar, o teravoz irá registrar erros por não encontrar o serviço disponível.
- *full.log* :
    Log principal da aplicação(contém também os log's de erro). Todos os eventos do tipo *call.standby* que chegam no webhook e são delegados são registrados. Para visualizar todos os eventos que chegam no webhook, é preciso habilitar o debug no arquivo *src/config/logger.js*.

O arquivo src/webhook/models/db.json possui o registro dos números inicialmente cadastrados como contato. Quando um evento do tipo *call.standby* chega no Webhook e o número não existe, ele é registrado e esse arquivo é atualizado. 

Nota: Por não ser uma boa prática atualizar um arquivo da própria aplicação, persistência será atualizada para um REDIS via docker-compose.yml.

# TODO: 
- [ToBeDoneNow] Incluir Diagrama do fluxo interno. 
- [ToBeDoneNow] Detalhar tecnologias utilizadas.
- [ToBeDoneNow] Externalizar URL's, USER, PASSWORD, PORT's dos serviços.
- [ToBeDoneNow] Substituir Json local por REDIS.
- Incluir Testes.
- [ToBeDoneNow] Criar Volume para arquivo de log.
- Melhorias/correções nos script's para desenvolvimento.
- Configuração correta do Webpack para React.

# BÔNUS:
- React para eventos call.ongoing.

