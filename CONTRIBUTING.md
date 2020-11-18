# CONTRIBUTING

Wax is an open source software project, part of the broader [Collaborative Knowledge Foundation](https://coko.foundation/) (Coko) community. We welcome people of all kinds to join the community and contribute with knowledge, skills, expertise. Everyone is welcome in our [chat room](https://mattermost.coko.foundation/coko/channels/town-square).

In order to contribute to Wax, you're expected to follow a few sensible guidelines.

## Search first, ask questions later

If you want to create a new component or if you've experienced a bug or want to discuss something in the issue trackers, please search before you start developing to find out whether it already exists.

## Discuss your contribution before you build

Please let us know about the contribution you plan to make before you start it. Either comment on a relevant existing issue, or open a new issue if you can't find an existing one. This helps us avoid duplicating effort and to ensure contributions are likely to be accepted. You can also ask in the [chat room](https://mattermost.coko.foundation/coko/channels/wax) if you are unsure.

For contributions made as discussions and suggestions, you can at any time open an RFC in our issue tracker and we will be happy to jump into a discussion.

## Branches

We maintain master as the production branch and tag it with release names. If you wish to contribute, then you need to make a branch and then issue a merge request following this procedure:

- Create a user account on Coko GitLab : http://gitlab.coko.foundation
- Clone master with `git clone https://gitlab.coko.foundation/wax/wax-prosemirror.git`
- Create a new branch and work off that. Please name the branch in a way that sensibly identifies the feature you are working on. You can push the branch to Coko Gitlab at anytime.

## Getting your contributions merged

This is a two part process: first ask for comments, then ask for the changes to be merged.
To ask for feedback, generate a Merge Request (Pull Request) from the GitLab interface.
Look at the feedback and alter your branch as necessary.
We encourage feedback and discussion from as many people as possible on Merge Requests!

## Conventional commits

We use conventional commits and verify that commit messages match the pattern, you can read more about it [here](https://conventionalcommits.org/) and [here](https://github.com/conventional-changelog-archived-repos/conventional-changelog-angular/blob/master/convention.md). You can use `yarn cz` to use a command-line tool that helps you with formatting your commit. We use conventional commits so that we can automatically follow semantic versioning and generate changelogs across all packages.

## Bug reports, feature requests, support questions

This is all done through GitLab. Visit the issue tracker for Wax [here](https://gitlab.coko.foundation/wax/wax-prosemirror/issues) and add an issue.

## Code style & guidelines

Linter and code style packages (namely `eslint`, `stylelint` and `prettier`), are provided as part of the repo's `devDependencies`. It is possible that you need to set up your editor to work with these packages. For example, for Visual Studio Code, you would need to add the "ESLint", "Prettier - Code Formatter" and "stylelint" extensions to get the full benefit of these packages. Commits will not be allowed if there is linting issues in the affected files.
