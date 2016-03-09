all: lint test

lint:
	./node_modules/.bin/eslint ./

lint-fix:
	./node_modules/.bin/eslint ./ --fix

test:
	node ./build.js release && ./node_modules/.bin/gulp && ./node_modules/.bin/concurrently --kill-others --success first "node ./server.js release" "./node_modules/.bin/phantomjs ./test/todo-list.js"

.PHONY: test
