project_name=$(notdir $(shell pwd))

.PHONY: up
up:
	PROJECT_NAME="${project_name}" docker compose up -d

.PHONY: down
down:
	PROJECT_NAME="${project_name}" docker compose down

.PHONY: shell
shell:
	docker exec -it library-card-frontend /bin/sh

.PHONY: test
test:
	docker exec library-card-frontend npm test

.PHONY: reset
reset:
	PROJECT_NAME="${project_name}" docker compose down --volumes
	PROJECT_NAME="${project_name}" docker compose up -d --build

.PHONY: clean
clean:
	PROJECT_NAME="${project_name}" docker compose down --rmi local --volumes
	docker builder prune -f