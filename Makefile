ARGS = $(filter-out $@,$(MAKECMDGOALS))
MAKEFLAGS += --silent

#############################
# Docker machine states
#############################

start:
	docker-compose start

stop:
	docker-compose stop

state:
	docker-compose ps

build:
	docker-compose  build
	docker-compose up -d

attach:
	docker exec -i -t ${c} /bin/bash

purge:
	docker-compose down

re: stop build

full: purge build
