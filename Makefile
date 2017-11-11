default: run.local.dev

lint:
	./node_modules/.bin/eslint ./

lint-fix:
	./node_modules/.bin/eslint ./ --fix

test:
	node ./build.js release && \
	./node_modules/.bin/gulp && \
	./node_modules/.bin/concurrently --kill-others --success first "node ./server.js release" "./node_modules/.bin/phantomjs ./test/todo-list.js"

run.local.dev:
	npm i && \
	./node_modules/.bin/gulp & \
	node ./build.js & \
	node ./server.js

run.local.release:
	npm i --production && \
	node ./build.js release && \
	./node_modules/.bin/gulp && \
	node ./server.js release

docker:
	rm -rf ./node_modules && \
	npm i --production && \
	rm -rf ./public && \
	node ./build.js release && \
	./node_modules/.bin/gulp && \
	docker build -t catberry/catberry-todomvc .

.PHONY: test
