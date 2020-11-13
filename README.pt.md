# Desafio Front-end nave.rs

Read this in other language: [English](https://github.com/cvalb/challenge-nave/blob/main/README.md), [Portuguese](https://github.com/cvalb/challenge-nave/blob/main/README.pt.md)

## Descrição

Este projeto é um desafio da [nave.rs](https://nave.rs/). Também é meu primeiro projeto utilizando React e Sass.

## Instalation

1. Instalar as dependências do node

        npm install

## Objetivo

O objetivo do desafio foi criar uma aplicação responsiva de página única utilizando qualquer framework/biblioteca ou JavaScript puro, integrando com a API deles.

## 0.1.0

Completamente funcional.

### Próximos passos

- O modal do usuário cadastrado não está utilizando o request show, como pedido pelo desafio;
  - Notei que, ao invés de usar o show request, passar o objeto como um estado iria poupar uma requisição da API, tornando o projeto mais escalável.
- Quando um usuário é deletado, não pude recarregar a lista. Tentei utilizar variáveis de estado;
- Cada modal deveria ser um componente;
- Refatorar funções para serem chamadas de fora da página, tornando o código mais legível;

### Corrigido

- 12/11/2020
  - A lista está recarregando agora que arrumei o hook useEffect em NaversList.js;
  - Refatorei as variáveis das funções;