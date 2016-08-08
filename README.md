# SNT Media Core Framework for Frontend

This repo is a git submodule repository for modular deployment of core codebase changes across all the SNT Media verticals. This core repo is included as a subdirectory in each of the SNT Media vertical repositories. Changes made to this repo will eventually be reflected across all the other repos, when the core submodule is updated for each respective parent repo. Changes made to this repo directory when inside of another project repo will be ignored on git push unless explicitly specified. The correct way to make changes to this repo is to clone it separately and edit it on its own. Once changes are made to this repo, they can then be pulled into each of the repos that are using this repo as a dependancy.


To include this repo as a git submodule dependancy in a project, follow the steps below, or refer to: https://git-scm.com/book/en/v2/Git-Tools-Submodules


If the parent repo already has the core included simply run:

1. Initialize the parent repo `git clone --recursive https://yourRepoUrl`. And the folder where the submodule was declared will be populated with the submodule


If you are creating a new project and want to include the core submodule:

1. Initialize the parent repo `git clone https://yourRepoUrl`.

2. cd into the parent directory you want to add the core submodule into

3. Initialize the submodule `git submodule add https://github.com/passit/SNT-framework-core-frontend.git`


If you want to update to the latest version of Core Framework in your project that already includes core:

1. cd into the core submodule directory

2. Fetch the latest updates to the core `git fetch`

3. Merge the updated changes into the parent project `git merge origin/<submodule branch you want to merge from>`

4. testing a wild lawrence appeared!!
