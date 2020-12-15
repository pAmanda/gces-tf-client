[![Build Status](https://travis-ci.com/pAmanda/gces-tf-client.svg?branch=master)](https://travis-ci.com/pAmanda/gces-tf-client)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pAmanda_gces-tf-client&metric=coverage)](https://sonarcloud.io/dashboard?id=pAmanda_gces-tf-client)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=pAmanda_gces-tf-client&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=pAmanda_gces-tf-client)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=pAmanda_gces-tf-client&metric=code_smells)](https://sonarcloud.io/dashboard?id=pAmanda_gces-tf-client)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=pAmanda_gces-tf-client&metric=bugs)](https://sonarcloud.io/dashboard?id=pAmanda_gces-tf-client)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pAmanda_gces-tf-client&metric=alert_status)](https://sonarcloud.io/dashboard?id=pAmanda_gces-tf-client)

# Trabalho Final da Disciplina GCES

Esse repositório guarda o código fonte do Client em Vue JS do trabalho final da disciplina **GCES**.

## Como rodar?

* Instale o docker e docker compose em sua máquina.

* Rode os seguintes comandos:

```$ docker-compose build```

```$ docker-compose up```

Após isso, acesse a aplicação na seguinte URL:

http://localhost:8080

## Análise estática

Foi utilizando o SonarCloud para a análise e coleta de métricas do código fonte.

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/dashboard?id=pAmanda_gces-tf-client)

## Conteinerização

Para isolar o ambiente, foi utilizado Docker e o Docker compose para a orquestração dos containers.

Criei o Dockerfile para a construção da imagem docker do Front e o docker-compose.yml administra esse container.

## Integração Contínua

Foram utilizados o Travis CI e o Sonar para verificar a qualidade do código.

A **master** foi configurada para não aceitar códigos que não passaram na Integração Contínua.

<p align="center">
  <img src="./img/master.png" alt="master">
</p>

## Deploy Automático

O deploy foi feito utilizando 2 Droplets na Digital Ocean, 1 sendo para a instação do Rancher e o outro para o deploy dos containers.

<p align="center">
  <img src="./img/master.png" alt="master">
</p>

URL Rancher: http://104.236.2.94:8080/

Os containers da API, do banco de dados e do front-end estão rodando na stack gces-tf.

<p align="center">
  <img src="./img/containers.png" alt="master">
</p>

URL Front-end: http://104.131.170.181:8080/

Para o deploy automático, foram adicionadas 2 fases no travis, a Docker e o Deploy.

* Fase Docker: cria a imagem e pusha ela para a minha conta pessoal no Docker Hub.

* Fase Deploy: executa um script em python responsável por chamar a api do próprio Rancher para fazer o Upgrade da imagem antiga para a que foi criada na fase anterior. OBS: Usei esse script do trabalho em grupo de GCES (Convinfo).

Para o travis se integrar corretamente com o Docker hub e Ranhcer, foram adicionadas as seguintes variáveis de ambiente:

<p align="center">
  <img src="./img/travis.png" alt="master">
</p>