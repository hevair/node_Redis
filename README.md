# Node com Redis
Login api com banco Postgres utilizando Redis para cache

O objetivo deste projeto é criar um ambiente de estudo, utilizando Redis para fazer cache de informações que não sofrem muitas alterações, assim melhorando a performace de consulta
de dados

## Instalação 

Para executar esse repositório baixe-o para sua maquina ou de um `Git Clone`

### Backend 

- `$ npm install` esse comando ira instalar todos os módulos necessários ao Node.JS
- `$ npm start` Ira iniciar o servidor backend na `localhost:3000\` 

### Redis server

Servidor redis foi executado em um container Docker na versão  redis:3.2.5-alpine SO ubunto
