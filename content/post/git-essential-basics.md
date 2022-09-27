 +++
author = "Gino Osahon"
title = "Git Essential Training - The Basics"
date = "2022-09-24"
description = "This is a training resource on the fundamentals of using Git"
+++

# Git Essential Training: The Basics 

## What is Git?

### Git is a software that allows you to:

* Keeps track of changes you make to your files and directories, it also keeps track of text changes. 
* Git allows you to keep track of versions of your documents, it allows you to move back and forth between the versions of your document.

The primary purpose of all version control systems is to manage source codes, this enables developers to manage the different versions of their codebase as they continue to add features. VCS is also called source code management system. 

### Other examples of version control:

* File naming 
* Microsoft word track changes
* Wikis
* Undo Cmd - z

### History 

There are five important version control systems that predates Git:

* Source code control system - developed in 1972 by AT&T 
* Revision control system - developed in 1982, and was open source 
* Concurrent version system - it allows developers to make changes to multiple files or a project, a feature which was new to previous VCS. It was developed in 1986 - 1990, and was open source. More than one user can work on the same file at the same time, they can work concurrently. CVS also initiated the concept of repositories which can be on a server or local system. 
* Apache subversion (SVN) - developed in the year 2000, and was open source. It could track text and images. 
* BitKeeper SCM - Built in 2000, and was closed source

Git - launched in April 2005. It was created by Linus Torvalds, Git was a replacement for BitKeeper, and was first used to manage Linux kernel source code. Git is a distributed version control system, it is open source and free. GitHub was launched in 2008, it’s purpose was to host Git repositories. GitHub was purchased by Microsoft in 2018.


### Distributed version control.

* Different users each maintain their own repositories instead of working from a central repository. 
* Changes are stored as change set
* Git track changes, and not versions like CVS and SVN
* Change sets can be exchanged between repositories by merging changesets or applying patches 
* There is no single master repository, just many working copies, and each with their own combination of change sets
* Encourages participation and forking of projects
* Developers can work independently, and submit change set for inclusion or rejection 


### Installing Git on Mac

* New Apple Mac systems have pre-installed git
* Git Installer - go to Git website 
* `brew install git`, can be used to install git using homebrew. 
* Using the `"which git"` command to find out which git you are using 
* Using the `"git --version"` to find out the version of git installed 


### Basic configuration of Git

System configuration - configuration applied to every user.

* Using `git config --global user.name "Gino Osahon"`
* Using `git config --global user.email "gino.osahon@gmail.com"`
* Use `git config --list` to list all of your configurations. If you do this, you will also find your user name and email that was set 
* Using `git config user.name` to reveal the username of the user 
* Using `git config user.emai`l to reveal the user email 

### Git autocompletion 

* Autocomplete helps you to type commands like file paths, branch names in Git.
* You start typing a word, and when you hit the tab key, Git then tries to guess based on the context, what the rest of the command is, or the file path. It saves a lot of typing 
* Git auto completion is a separate script, and included inside the git source code repository on Github. github.com/git/git
* Git help is a very useful tool for finding out more information on how to use Git
* The man command brings up manual pages 


### Enable Git Tab Autocomplete for Zsh

New Macs use the Zsh shell by default. If you’re using Zsh, add the following line to the ~/.zshrc file and restart your Terminal application:

`autoload -Uz compinit && compinit`

Alternatively, you can run the following two commands in your Terminal application to add the necessary line to the .zshrc file and restart your shell.

echo 'autoload -Uz compinit && compinit' >> ~/.zshrc
source ~/.zshrc

### Initializing a repository

`git init` command is used to initialize a project 

Where are Git files stored?

* Once you initialize a repository using `git init`, it creates a .git directory 
* `ls -la .git` commands opens the .git directory containing other directories and files. These are the files that git uses to do all it’s tracking 
* `cat .git/config` contains some configurations
* `git add .` command is used to add all the changes that are in the current directory
* Period (.) is a shorthand for the current directory
* To commit the changes in the directory we use the command  `git commit -m “commit message” `
* -m in the command means message

### The different stages of making changes to your repository 

* Make changes
* Add changes 
* Commit changes to the repository with a message

### Writing commit messages (how to write good commit messages/best practices)

* Write a short single line summary of what the changes (less than 50 character)
* Keep each line to less than 72 characters, the reason why is that users maybe viewing it on their computer or mobile device through Github
* Write your commit messages in present tense, and not past tense 
example: “Fix for a bug” or “fixes a bug”, not “fixed a bug”
* The commit message is a label for changes 
* You can develop shorthand for your organization, for example you can begin each commit message with the following for whether you are committing a javascript or css, or is it bug fix
“[css, or js]” “[bugfix]”
* Make sure your commit message is clear and descriptive 
**Bad:** “fix typo”
**Good:** “add mixing hyphen in project section of HTML”
**Bad:** “Update login code”
**Good:** “Change user authentication to use Blowfish”


### How to view commit logs that has been made to a project

* Type the command git log 
* The first number is the unique ID, every commit is given an ID so we can identify a particular commit that we might be interested in.
* Next is the author who made the commit, it shows the name and email
* Date commit was made
* Commit message 
* git help log will show more about the commit command
* git log -n 3; will limit the number of commits given to the command which is 3
* git log —since=2019-01-0, this command will show all commits since 2019. You can limit commits until 
* git log –grep=”init”: grep means we are going to globally search for regular expressions, it helps to search for commit messages. It will return any commits that have the string “init” in it. 


### Key concepts and architecture to enable us understand how Git works

### Git three trees architecture

Two trees architecture is what is being used by previous version control system. We have the repository and working directory, we call them trees because they represent a file structure, at the top you have the project directory, and below, you can have more folders with files inside. We use checkout to create a new working directory, and after making changes to our working directory, we commit the changes back to the repository 

**Git** uses a three tree architecture, it still has the repository, and the working directory or copy of the repository, but in between is another tree called staging index. When you make changes in your working directory, you use `git add .` to add the files before using `git commit -m` to commit to the main repository. The git add . command enables us to stage the files changed, it is possible to commit without using git add command, but that is the way it is done in two tree architecture. 

As we work with git, it is important to keep these three tree architecture in mind. 

* Working directory which contains changes that may not be tracked by git yet
* Staging index, which contains changes we are about to commit 
* Repository, this is what is being tracked by git. 


### Git Workflow  

* `git add .` : the period (.) adds everything in the current working directory to the staging index. 
* `git add <filename>` : adds the specified file or this single file to the staging index 
* `git commit -m “”` is then used to push file to the repository 
* `git log` can then be used to view the commits made


### Hash values (SHA-1) 

* Git generates a checksum for each change set, which is the hash value
* A checksum is a number that is generated by taking data and feeding it into a mathematical algorithm, so the checksum converts data into a simple number, and we call that simple number checksum. 
* Same data put into the same mathematical algorithm, always returns the same result or checksum. This ensures data integrity, and this is inbuilt in git
* Data integrity is fundamental 
* Each hash value is unique and directly tied to the changes inside it. 
* The algorithm that git uses to create checksums is the SHA-1 hash algorithm.
* The number generated from the SHA-1 algorithm is a 40 character hexadecimal string (meaning it contains the numbers 0-9, and the letters a-f)
* git monitors not only our changes but also their history 

### The HEAD Pointer in Git
* The HEAD pointer points to the tip of the current branch in a repository 
* The HEAD references a point to a specific commit in the repository, as we make new commits, the pointer changes, or moves to point to a new commit. 
* The HEAD always points to the parent of the next commit
* A new branch is a new set of code from what we are working on, and it will be separate from our master branch. 
* Inside the .git directory, there is a file called HEAD. Inside it, you will find  (ls -la .git)
  

### Adding file 

Using a text editor to add files. When you add a new file, your editor like VSCode works with git to turn them green, letting you know that the file is new.
Untracked means that they are not in the git repository, git does not know anything about them, changes are not tracked.

`git add .`;  this will add all changes in the working directory into the staging area.
`git add file name`. Can be used to add a single file

### How git handles files that have been edited

The process of committing edits to files, is the same process as adding a new file. After editing a file, and saving it, you can use `git add file-name`, then `git commit -m ""` to move it to the staging area.

### How to view changes in a committed file 

`git diff` command is used to view changes to a file in a common format, so we can see what those changes are. We use git diff to view changes in our working directory

### View only staged changes 

If you want git diff to show you changes in the staging area, you use `git diff –staged`. Staged command is an alias for cached, git diff –cached is used to do the same thing as git diff. 

### How to use git to track files that are deleted

There are two different technique used to delete files:

* The first is to just delete the file yourself from your IDE, or by simply moving the file to trash. You can then use `git rm filename` (same function as git add) to commit the deleted change operation to our repository
* The second technique, is to use `git rm nameOfFile` to remove the file permanently. If you want to keep a file around, you can drag the file to trash, and then use git rm to tell git about it, but if you want to permanently remove a file, you can simply just use `git rm fileName` 


### How to track moved or renamed file using git

The are two techniques for moving and renaming files:

* First is to make a change directly to the file name in the operating system.
* The second technique, we can do from command line, we can rename a file from command line. Moving a file, and renaming a file is the same thing, because moving a file to a new part is the same thing as renaming it. We can use `git mv fileName.txt newFileName.txt` to rename the file 


**A shortcut that allows you to stage and commit **

If you already know that you want to commit everything, then you can skip the staging step, that is what the shortcut does. Instead of using `git add .`, and then `git commit`. You can use the shortcut. `git commit -a` option. `git commit -a` is same as `git commit –all`
`git commit -a`: stages and commits all changes to tracked files 
`git commit -a`: does not include untracked files 

### How to view a previous commit 

* use "`git checkout -- <file>...`" to discard changes in working directory
* Type `git diff` to see what changes have been made 
* `git diff –color-words` will show you what exactly got changed 
* Use git commit -am “changes you’ll like” to stage and commit the changes 
* To view what is inside a commit, or what were the changes, use `git show <SHA or ID of the commit>`. Example, git show c4dc2ebf4dfe19f6e7d6fe1e72a60fb4efa7dc19 or c4dc2eb


### How to compare two commits 

You can use `git diff old commit..new commit`, to view the differences between two commits. Example: `git diff c4c2ebf..e34ge56 –color-words`. This will create a diff file, The HEAD will always point to the latest commit in a list of commits 


### Multiline commit messages 

Use `git commit -a`, and hit enter 
It will open your text editor and a file where you can enter your commits messages.You can use git log –oneline to view only commit messages of all commits 
While git log shows a longer version of all commits.

### Making Atomic commits

* An atomic commit is just a small commit 
* Atomic commit only affect a single aspect 
* Atomic commits makes commit easier to understand,  to work with and to find bugs
* It also improves collaboration with others 
* To rename a file, use `git mv oldFileName NewFileName`
* Use `git add fileName` to add multiple files to the staging area
* Use global search on your IDE to find a text in your project, and you can replace all at once 
* Use `git status` always to see files that have changed 
* Use atomic commits to separate changes made to a project, it makes it easier for collaborators to pull specific commits containing interested features 
* Use `git diff fileName` to view changes to a file
* Always commit little changes, instead of committing bulk changes.

### Techniques to undo changes to your working directory 

* Use `git checkout  –fileName` to undo or discard changes to a file 
* Undo changes made to staging area (unstagging)
* Use `git add fileName`* to add all files in the fileName directory 
* Use `git reset HEAD fileName` to undo or discard changes made to the file
* Use `git checkout – `, to discard changes to the working directory

### Amending commits already in the repository

Git only allow amending or editing the most recent commit, the HEAD.
Use `git commit –amend -m “new commit message”`,  to amend a commit message. The SHA for this commit will change 

### Retrieving old versions of files 

Edits which undo changes should be a new commit 
Sometimes, it is helpful to retrieve an old version of a file, to go back into our commits, and find out what the file is about, and they go back to it
Use `git checkout – commitSHA fileName`, to revert back to the original/old file before some other commits were made.

### Reverting a commit

In case you make a change to a file, and then commit, and you then realize that the changes in the commit was a mistake, you simply need to make a new commit that reverses it, since git creates SHA or ID for every commit. Use `git revert nameOfSHA` to revert to the commit with the SHA

### Removing Untracked files

Use `git clean -n or -f`, to remove untracked files
-n will let you know that it would remove the following files, while -f permanently deletes the files 
`git clean -f or -n` will not remove files that have been staged using git add 

### Use .gitignore files 

* .gitignore file contains a list of rules to determine which files that git should ignore. You can include the name of the files that you want git to ignore inside the .gitignore file
* Use # sign to leave a comment in the .gitignore file
* Blank lines are ignored 
* Create a .gitignore file, and include all files that you want git to ignore like .log, .zip, .DS_Store, .gz, .log/ files for example 

### Ideas on what to gitignore

* Compiled source code
* Packages and compressed files 
* Logs and databases 
* Operating system generated files 
* User-uploaded assets (images, PDFs, videos)
* Visit github.com/github/gitignore to get access to gitignore templates 

### Globally ignore files

Ignoring files in all repositories 
Ignore files globally 
git config –global core.excludefiles ~/.gitignore_globally 