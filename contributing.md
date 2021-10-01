# Contributing to App-Dash
Please do! This is more of a learning and practice exercise than it is a "product".

## Announce Your Intent
If you find an issue you would like to work on, comment on it. Let others know that you plan to do the work in order to reduce the duplicated PRs for the same issue. 

If you don't see an issue, but would like to make a change, create one!

Create an issue, and mention that you would like to be the one to take care of it.

## Minimize Spelling Error Only PRs
This is not a master's thesis on English Literature. We all make mistakes.

If you do find a spelling error, create an issue for it. This way when another change has to happen to the same file, it can get fixed then.

If you're doing other work, and notice a spelling error, change it. Do include the spelling change in the PR comments, or annotate the diff to call out that it's not related to the code change.

## UI Functionality Changes
If you're making a change to how the UI operates, demonstrate it with a gif in the PR comment.

There are several free to use screen recording tools out there that make this really easy.

## Update The Readme
Always check the `readme.md` file before submitting a PR. If you've added a new feature, or changed how something works, but sure that the readme matches this new functionality.

The readme is the 'cover of the book', and it get judged. Make sure it's accurate, helpful, and easy to understand.

## File Name Changes Or Moving Files
This type of change is difficult to do in a distributed source control system. 

Please only change a file name, or move files if it is absolutely necessary. Be sure to say what changed/moved and the reason for it in the PR comment.

## Rebase And Squash Before Merging
Doing a `git rebase` and `git squash` helps keep the history clean. 

Do make a lot of commits on your fork to keep your changes safe. If it helps, open a new PR before squashing everything. This may make it easier to call out a specific change in a commit for review.

Before it gets merged, squash all the commits, and re-word the commit message to be more clear about what the change's intention is.

[Read more about how to 'rewrite history'](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History)

## Write Clear Commit Messages
A commit message should explain "why" something changed. The "what" is answered by the diff.

Example:
    - A "what" commit:
        - `Changed jwt reset timeout`
    - A better "why" commit:
        - `Login was failing due to auto-renew not functioning as expected`

[Read more about good commit messages](https://chris.beams.io/posts/git-commit/)

## Ask For Help
If you'd like to try and work on something you haven't before, mention it in an issue comment. If you've never done API work, but a new route needs added, let someone know.

> "I've not done API work before, but I'd like to try this. How can I start?"

Again, this project is for learning and practicing. Let's learn together!
