# `setup-elp` [![Action][ci-img]][ci]

[ci]: https://github.com/erlef/setup-elp/actions/workflows/ci.yml
[ci-img]: https://github.com/erlef/setup-elp/actions/workflows/ci.yml/badge.svg

## The action

`setup-elp` allows you to type check your Erlang code, in your CI pipelines, using
[eqWAlizer](https://github.com/WhatsApp/eqwalizer), with
[Erlang Language Platform](https://github.com/WhatsApp/erlang-language-platform).

### Usage

```yaml
jobs:
  elp:
    runs-on: ubuntu-24.04
    steps:
      - uses: actions/checkout@v7
      - uses: erlef/setup-beam@v1
        with:
          otp-version: '28.5'
      - uses: erlef/setup-elp@v1
      - run: elp lint --no-connect
      - run: elp eqwalize-all --no-connect --bail-on-error
```

The action installs the ELP build for the Erlang/OTP version found on the `PATH` (`erl`, e.g.
installed with [`setup-beam`](https://github.com/erlef/setup-beam)), so install Erlang/OTP first,
with a `<major>.<minor>` version ELP ships builds for: see the assets of the
[ELP releases](https://github.com/WhatsApp/erlang-language-platform/releases). Afterwards, `elp` is
on the `PATH` for the rest of the job.

See [action.yml](action.yml) for the action's specification.

#### Inputs

The action supports the following inputs:

| `with`        | Purpose
|-              |-
| `elp-version` | ELP version to use: a release tag (e.g. `2026-10-05`) or `latest` (default)
| `elp-tarball` | Path or URL of an ELP `.tar.gz` to use instead of a release (unreleased builds)

#### Annotations

In GitHub Actions, ELP releases newer than `2026-11-19` print the findings of `elp lint` and
`elp eqwalize-all` as GitHub [workflow commands][workflow-commands], with no extra arguments: they
show up as annotations in the workflow run's summary and on the affected lines of the pull
request's "Files changed" tab. With ELP `2026-11-19`, pass `--format github` to get the same.

- `elp lint` then fails on any finding, warnings included: pass `--severity error` to report, and
  fail on, errors only
- pass `--format json` to get JSON lines instead of annotations
- with a job matrix (e.g. several Erlang/OTP versions), run the ELP steps in one job only, or every
  job reports the same annotations

[workflow-commands]: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-commands

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

A complete changelog can be found under [GitHub releases](https://github.com/erlef/setup-elp/releases).

### Code of Conduct

This project's code of conduct is made explicit in [CODE_OF_CONDUCT.md](https://github.com/erlef/.github/blob/main/CODE_OF_CONDUCT.md).

### Contributing

First of all, thank you for contributing with your time and patience.

If you want to request a new feature make sure to
[open an issue](https://github.com/erlef/setup-elp/issues) so we can
discuss it first.

Bug reports and questions are also welcome, but do check you're using the latest version of the
action - if you found a bug - and/or search the issue database - if you have a question, since it
might have already been answered before.

Contributions will be subject to the MIT License.
You will retain the copyright.

For more information check out [CONTRIBUTING.md](CONTRIBUTING.md).

### License

License information can be found inside [LICENSE](LICENSE.md).

### Security

This project's security policy is made explicit in [SECURITY.md](https://github.com/erlef/.github/blob/main/SECURITY.md).
