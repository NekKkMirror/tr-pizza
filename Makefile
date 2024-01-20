#!make
include .env

CURRENT_DIR = $(patsubst %/,%,$(dir $(realpath $(firstword $(MAKEFILE_LIST)))))
ROOT_DIR = $(CURRENT_DIR)

DOCKER_COMPOSE ?= docker compose -f $(DOCKER_COMPOSE_FILE)
DOCKER_COMPOSE_RUN = $(DOCKER_COMPOSE) run $(DOCKER_NODE_NAME) sh
CURRENT_USER = sudo
DOCKER_CONTAINER_NAME = ${DOCKER_NODE_NAME}
DOCKER_EXEC_TOOLS_APP = $(CURRENT_USER) docker exec -it $(DOCKER_CONTAINER_NAME) sh

RUN_YARN_INSTALL = "yarn install"
RUN_DEV = "yarn start --no-open"
RUN_PROD = 'yarn build'
RUN_LINT = 'yarn lint'

# Exec containers
.PHONY: app

app:
	$(DOCKER_EXEC_TOOLS_APP)

# Helpers

.PHONY: fix-dir-permission

fix-dir-permission:
	$(CURRENT_USER) chown -R ${USER}: $(ROOT_DIR)/


# Commands

.PHONY:
	cmd = "build-container"
	cmd+= "install-deps"
	cmd+= "compose-build"
	cmd+= "app-run-dev"
	cmd+= "compose-build-start-dev"
	cmd+= "compose-up app-start-dev"
	cmd+= "compose-down app-restart"
	cmd+= "compose-stop"
	cmd+= "compose-down-v"
	cmd+= "docker-run-install-lint"
	cmd+= "docker-run-install-build"
	$${cmd}

# LOCAL

build-container:
	$(DOCKER_COMPOSE) up --build --no-recreate -d

install-deps:
	$(DOCKER_EXEC_TOOLS_APP) -c $(RUN_YARN_INSTALL)

compose-build: build-container install-deps

app-run-dev:
	$(DOCKER_EXEC_TOOLS_APP) -c $(RUN_DEV)

compose-build-run-dev: compose-build app-run-dev

compose-up:
	$(DOCKER_COMPOSE) up -d

app-start-dev: compose-up app-run-dev

compose-down:
	$(DOCKER_COMPOSE) down

app-restart: compose-down app-start-dev

compose-stop:
	$(DOCKER_COMPOSE) kill || true
	$(DOCKER_COMPOSE) rm --force || true

compose-down-v: compose-stop
	$(DOCKER_COMPOSE) down -v --remove-orphans || true

# CI

docker-run-install-lint:
	$(DOCKER_RUN)
	yarn install
	yarn lint

docker-run-install-build:
	$(DOCKER_RUN)
	yarn install
	yarn build
