<p align="center"> <a href="http://nestjs.com/" target="blank"> <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /> </a> </p> <p align="center"> Red Social – Prueba Técnica Full Stack </p> <p align="center"> <a href="http://nodejs.org" target="_blank">Node.js</a> · <a href="https://nestjs.com" target="_blank">NestJS</a> · <a href="https://react.dev" target="_blank">React</a> · PostgreSQL · Docker </p> <p align="center"> <a href="#"><img src="https://img.shields.io/badge/Node.js-18+-green.svg" alt="Node Version" /></a> <a href="#"><img src="https://img.shields.io/badge/NestJS-Backend-red.svg" alt="NestJS" /></a> <a href="#"><img src="https://img.shields.io/badge/React-Frontend-blue.svg" alt="React" /></a> <a href="#"><img src="https://img.shields.io/badge/PostgreSQL-Database-blue.svg" alt="PostgreSQL" /></a> <a href="#"><img src="https://img.shields.io/badge/Docker-Enabled-informational.svg" alt="Docker" /></a> </p>
Description

Este proyecto corresponde a la Prueba Técnica – Desarrollador Full Stack, cuyo objetivo es desarrollar una red social básica utilizando una arquitectura de microservicios.

La aplicación permite a los usuarios:

Autenticarse mediante usuario y contraseña (inconveniente al gestonar jwt)

Visualizar publicaciones de otros usuarios (visualizacion sin relacion)

Crear nuevas publicaciones (sin usuario asosiado)



El backend está desarrollado con NestJS, el frontend con React, la base de datos es PostgreSQL, y todo el sistema se ejecuta mediante Docker Compose.

Architecture
├── backend
│   ├── gateway
│   ├── auth-service
│   ├── post-service
│
├── frontend
│   └── react-app
│
├── database
│   └── postgres
│
└── docker-compose.yml

Features
Backend

Autenticación con JWT

Microservicio de usuarios

Microservicio de publicaciones

Listar publicaciones

Crear publicaciones

Seeder de usuarios y publicaciones

Documentación con Swagger

Manejo de errores con buenas prácticas

Frontend

Pantalla de Login

Listado de publicaciones

Crear publicación

Manejo de estado con Context API / Zustand

Technologies
Backend

Node.js

NestJS

TypeScript

JWT

PostgreSQL

ORM (TypeORM / Prisma)

Swagger

Docker

Frontend

React

TypeScript

Context API / Zustand

Axios

Database

Base de datos PostgreSQL con las siguientes entidades principales:

User

id

username

password

createdAt

Post

id

message

createdAt

userId

Seeder

Al iniciar la aplicación se ejecuta automáticamente un seeder que:

Crea usuarios de prueba

Asigna una publicación por cada usuario

Esto permite probar el sistema sin configuración manual.

Project setup
npm install

Compile and run the project
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod

Run tests
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov

Docker execution
docker-compose up --build


Esto levanta:

PostgreSQL

Microservicios backend

Frontend React

API Documentation

Cada microservicio expone su documentación Swagger:

http://localhost:3000/api

Deliverables

Repositorio GitHub (Backend + Frontend)

Docker Compose

Script de base de datos

Usuarios predefinidos

Documentación Swagger

PDF explicativo

Video demostrativo del funcionamiento (Gateway y microservicios)

Extras Implemented

TypeScript

Swagger

Arquitectura de microservicios

Manejo centralizado de errores

Código modular y escalable

Author

Juan Sebastián Acosta Quiroz
Ingeniería de Sistemas
Desarrollador Full Stack
