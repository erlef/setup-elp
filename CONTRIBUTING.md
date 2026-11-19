# Contributing to `setup-elp`

1. [License](#license)
1. [Reporting a bug](#reporting-a-bug)
1. [Requesting or implementing a feature](#requesting-or-implementing-a-feature)
1. [Submitting your changes](#submitting-your-changes)
   1. [Code Style](#code-style)
   1. [Committing your changes](#committing-your-changes)
   1. [Pull requests and branching](#pull-requests-and-branching)
   1. [Releasing](#releasing)
   1. [Credits](#credits)

## License

`setup-elp` is licensed under the [MIT License](LICENSE.md), for all code.

## Reporting a bug

`setup-elp` is not perfect software and will be buggy.

Bugs can be reported via
[GitHub issues: bug report](https://github.com/erlef/setup-elp/issues/new?template=bug_report.md).

Some contributors and maintainers may be unpaid developers working on `setup-elp`, in their
own time, with limited resources. We ask for respect and understanding, and will provide the same
back.

If your contribution is an actual bug fix, we ask you to include tests that, not only show the issue
is solved, but help prevent future regressions related to it.

## Requesting or implementing a feature

Before requesting or implementing a new feature, do the following:

- search, in existing [issues](https://github.com/erlef/setup-elp/issues)
(open or closed), whether the feature might already be in the works, or has already been rejected,
- make sure you're using the latest software release (or even the latest code, if you're going for
_bleeding edge_).

If this is done, open up a
[GitHub issues: feature request](https://github.com/erlef/setup-elp/issues/new?template=feature_request.md).

We may discuss details with you regarding the implementation, and its inclusion within the project.

We try to have as many of `setup-elp`'s features tested as possible. Everything that a user
can do, and is repeatable in any way, should be tested, to guarantee backwards compatible.

## Submitting your changes

This action is distributed as a single `.js` file (found in `dist/`) and potentially
some other license files (as `.txt`).

Before submitting your changes, run `npm run build-dist` and fix any issues arising from that.

`npm run build-dist` lints YAML files with [yamllint](https://github.com/adrienverge/yamllint)
(configured in `.yamllint.yml`), which needs to be in your `PATH` (e.g. `pipx install yamllint`).

### Running tests

To run tests locally, run `npm run test`.

### Code Style

- do not introduce trailing whitespace
- indentation is 4 spaces, not tabs
- try not to introduce lines longer than 100 characters
- write small functions whenever possible, and use descriptive names for functions and variables
- comment tricky or non-obvious decisions made to explain their rationale

### Committing your changes

Merging to the `main` branch will usually be preceded by a squash.

While it's Ok (and expected) your commit messages relate to why a given change was made, be aware
that the final commit (the merge one) will be the issue title, so it's important it is as specific
as possible. This will also help eventual automated changelog generation.

### Pull requests and branching

All fixes to `setup-elp` end up requiring a +1 from one or more of the project's
maintainers.

During the review process, you may be asked to correct or edit a few things before a final rebase
to merge things. Do send edits as individual commits to allow for gradual and partial reviews to be
done by reviewers.

### Releasing

Releases follow [Semantic Versioning](https://semver.org/) and are cut from `main`, once the changes
to release are merged. Users reference the action by its major version tag (e.g. `@v1`), which
always points at the latest release with that major version:

1. tag the release on `main`, e.g. `git tag -a v1.2.3 -m v1.2.3 && git push origin v1.2.3`
1. create a [GitHub release](https://github.com/erlef/setup-elp/releases/new) from that tag, with
the changes since the previous release as release notes, and publish it to the GitHub Marketplace
1. move the major version tag to the release: `git tag -f v1 v1.2.3^{} && git push -f origin v1`

Breaking changes (e.g. removing an input or changing its default) require a new major version.

### Credits

`setup-elp` has been improved by
[many contributors](https://github.com/erlef/setup-elp/graphs/contributors)!
