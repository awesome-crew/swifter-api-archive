# Swifter server

> Nest.js, TypeORM

## Table of contents

- [Documentations](#documentations)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Commands](#commands)
  - [Docker (mysql, redis, ...)](#docker)
  - [Running the app](#running-the-app)
  - [TypeORM:Migration](#typeormmigration)
  - [Check](#check)
- [How to deploy](#how-to-deploy)

## Documentations

- [Nest.js](https://docs.nestjs.com/)
- [TypeORM](https://typeorm.io/)

## Installation

```bash
$ npm install
```

## Getting Started

```bash
$ npm install # install dependencies
$ npm run set # execute mysql container
$ npm run migrate # execute all migration files
$ npm run start:dev # run development server (watch mode)
```

## Commands

### Docker

you should execute docker-compose to run development server

```bash
# execute docker-compose
$ npm run set

# clear docker containers
$ npm run set:down
```

### Running the app

```bash
# run
$ npm run start

# development - watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### TypeORM:Migration

We use [migrations](https://typeorm.io/migrations) to manage database changes

```bash
# generate migation file by codebase change
# e.g. npm run makemigrations UpdateUser
# you can find generated file in src/database/migrations
$ npm run makemigrations <MIGRATION_NAME>

# apply existing migration files
$ npm run migrate

# revert last-applied migration
$ npm run migrate:revert

# list applied migrations
$ npm run migrations
```

### Check

Includes lint, type, unit test

```bash
# lint
$ npm run check:lint

# type check
$ npm run check:type

# unit test
$ npm run check:test

# run all checks parallely (it's fast!!)
$ npm run check
```

## How to deploy

Commits pushed to the `main` branch are automatically deployed. (via [GitHub Action](https://github.com/swifter-tech/swifter-api/actions/workflows/upload.yml))
