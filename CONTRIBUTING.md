## Code Style
Catberry uses [ESLint](http://eslint.org/) for checking the code style.
You should run it using `make lint` before committing to the repo. If you need
to fix indentations automatically then use `make lint-fix`.

`make lint` is a part of `npm test` script.

## Tests
Catberry TodoMVC uses [CasperJS](http://casperjs.org/).
To test you can run `make test`.

`make test` is a part of `npm test` script.

## Docs
Write clean and simple docs in the `docs/index.md` file (if exists) or describe
the feature in `README.md` if the package doesn't have separate documentation.

## Submit a PR
* PR should be submitted from a separate branch (use `git checkout -b "fix-123"`) to a `master` branch
* PR's commit message should use present tense and be capitalized properly (i.e., `Fix #123: Add tests for RequestRouter.`)

Still have any questions? Join the [Gitter](https://gitter.im/catberry/main) and ask them there.
