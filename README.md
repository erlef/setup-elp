# `setup-elp` [![Action][ci-img]][ci]

[ci]: https://github.com/paulo-ferraz-oliveira/setup-elp/actions/workflows/ci.yml
[ci-img]: https://github.com/paulo-ferraz-oliveira/setup-elp/actions/workflows/ci.yml/badge.svg

## The action

`setup-elp` allows you to type check your Erlang code, in your CI pipelines, using
[eqWAlizer](https://github.com/WhatsApp/eqwalizer), with
[Erlang Language Platform](https://github.com/WhatsApp/erlang-language-platform).

### Usage

See [action.yml](action.yml) for the action's specification.

In your CI pipelines, use it considering CLI `elp` is available as an executable, as specified
in the Erlang Language Platform repository mentioned above.

#### Inputs

The action supports the following inputs:

| `with`        | Purpose
|-              |-
| `elp-version` | Choose the ELP version to use

#### Architectures / platforms

The action supports the following architectures / platforms:

| arch.   | platform
|-        |-
| `arm64` | `darwin` (GitHub `macos-...`)
| `x64`   | `darwin`
| `arm64` | `linux` (GitHub `ubuntu-...`)
| `x64`   | `linux`

## The project

### Changelog

A complete changelog can be found under [GitHub releases](https://github.com/paulo-ferraz-oliveira/example-gha/releases).

### Code of Conduct

This project's code of conduct is made explicit in [CODE_OF_CONDUCT.md](https://github.com/paulo-ferraz-oliveira/setup-elp/blob/main/CODE_OF_CONDUCT.md).

### Contributing

First of all, thank you for contributing with your time and patience.

If you want to request a new feature make sure to
[open an issue](https://github.com/paulo-ferraz-oliveira/setup-elp/issues) so we can
discuss it first.

Bug reports and questions are also welcome, but do check you're using the latest version of the
action - if you found a bug - and/or search the issue database - if you have a question, since it
might have already been answered before.

Contributions will be subject to the MIT License.
You will retain the copyright.

For more information check out [CONTRIBUTING.md](https://github.com/paulo-ferraz-oliveira/setup-elp/blob/main/CONTRIBUTING.md).

### License

License information can be found inside [LICENSE](https://github.com/paulo-ferraz-oliveira/setup-elp/blob/main/LICENSE.md).

### Security

This project's security policy is made explicit in [SECURITY.md](https://github.com/paulo-ferraz-oliveira/setup-elp/blob/main/SECURITY.md).
