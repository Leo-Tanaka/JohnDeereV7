# Spot: Um Projeto de Monitoramento de Carrinhos
================

## Descrição
---------------

O projeto Spot é um projeto de monitoramento de carrinhos que utiliza um ESP32 com Wi-Fi para coletar dados de sensores e transmitir para uma aplicação web. A aplicação web é desenvolvida em HTML, CSS e JavaScript, e utiliza um banco de dados MongoDB para armazenar e recuperar os dados coletados.

## Objetivo

O objetivo do projeto é criar um sistema de monitoramento de carrinhos que seja fácil de usar e escalável, permitindo que os usuários monitorem o status dos carrinhos em tempo real.

## Requisitos de Hardware

* ESP32 com Wi-Fi
* Sensores (opcional)
* Fonte de energia para o ESP32

## Requisitos de Software

* MongoDB instalado e configurado
* Node.js (opcional)
* Navegador web compatível

## Estrutura de Arquivos

* `Home.html`: Página principal do projeto
* `LoginV2.html`: Página de autenticação
* `Mapa.html`: Página que integra um mapa interativo
* `Status.html`: Página que exibe o status atual dos carrinhos
* `src/`: Diretório que contém os recursos essenciais para o frontend do projeto
* `src/assets/`: Diretório que contém imagens e outros arquivos gráficos
* `src/css/`: Diretório que contém as folhas de estilo CSS
* `src/js/`: Diretório que contém os arquivos JavaScript

## Integração com MongoDB e ESP32

* O projeto se conecta a um banco de dados MongoDB para armazenar e recuperar os dados coletados pelo ESP32.
* O ESP32 é configurado para enviar dados para o servidor da aplicação web.

## Configuração de MongoDB

* Certifique-se de que o MongoDB esteja instalado e configurado corretamente.
* Configure o banco de dados para armazenar os dados coletados pelo ESP32.

## Configuração do ESP32

* Configure o ESP32 para enviar dados para o servidor da aplicação web.
* Certifique-se de que o ESP32 esteja conectado à fonte de energia.

## Exemplos de Uso

* Monitore o status dos carrinhos em tempo real.
* Visualize os dados coletados pelo ESP32 em um mapa interativo.
* Acesse a página de autenticação para gerenciar os usuários.

## Depuração

* Verifique se o ESP32 está conectado à fonte de energia e ao servidor da aplicação web.
* Verifique se o banco de dados MongoDB está configurado corretamente.
* Verifique se os arquivos JavaScript e CSS estão carregados corretamente.

## Roadmap

* Implementar funcionalidades de notificação para os usuários.
* Melhorar a interface do usuário.
* Adicionar suporte a múltiplos sensores.

## Licença

* O projeto é licenciado sob a licença MIT.

## Contribuições

* Contribuições são bem-vindas! Envie um pull request com suas melhorias.

## Contato

* Se você tiver alguma dúvida ou precisar de ajuda, entre em contato conosco através do e-mail [brunoferreira.takaya@gmail.com](mailto:brunoferreira.takaya@gmail.com).

## Testes

* Verifique se o projeto está funcionando corretamente executando os testes unitários e de integração.
* Verifique se o ESP32 está enviando dados corretamente para o servidor da aplicação web.