+++
author = "Eze"
title = "Introduction to Command Line Interface "
date = "2022-09-23"
description = "Technical writing mentorship program fourth meetup"
+++

Windows has a shell OS which is CMD.EXE and Powershell. However, some linux command does not work on the windows command line. The windows powershell and CMD has different commands (and some of the same) with Bash, Zsh and other Unix-based shells. Thankfully, there are some Unix-based solution for windows, some of the most popular one’s are the Git-bash and WSL (Windows Subsystem for Linux). You can download and install any of them.

## Why Should You Learn About The Command line

- Speed
- Easy to access remote servers
- Command line tools
- Great skill to have

## Basic-command-line
- `Arrow Up` and `Arrow Down`: This will show your previous and next commands
- `Tab`: This will auto-complete your
- `Ctrl + C`: This will exit the current command
- `Ctrl + D`: This will close the terminal. Note: this command does not work on Command line and Powershell
- `exit`: This will close the terminal on windows command line and powershell
- `help`: This will show you many more options

## Basic Commands
Some of the commands here works well on Bash and ZSH but does not work on `cmd` and `powershell`. I will try to write out all the commands and show the difference

## List Files in Folder
- On windows command line and powershell

> `dir`

- On Bash and Zsh

> `ls`

## Create Folder and File
- Creating a folder is the same across all platform

> `mkdir [folderName]`

- While, creating a file is different. On windows
> `type nul > [filename.extention]`

- On Bash and Zsh
> `touch [filename.extention]`

## Navigating Through Folder
Navigating through folders is the same across all the platform

- To navigate into a folder
>`cd [foldername]`

- To go back to the previous folder
>`cd ..`

- To Clear Screen
This command works on all platform
>`cls`

## Renaming File and Folder
- On windows
>`rename [file] [newfilename] rename [folder] [newfoldername]`

- On Bash and Zsh
>`mv [folder] [newfoldername] mv [file] [newfilename]`

## Copying Files
- On windows
>`xcopy [filetype] [folder]`

- On Bash and Zsh
>`cp [filetype] [foldername]`

## Moving Files
- On windows
>`move [filetype] [folder]`

- On Bash and Zsh
>`mv [filetype] [folder]`

## Deleting File and Folder
- On Bash and Zsh
>`rm [filename.extention] rm -r [folder]`

- On windows
>`del [filename.extention] rmdir [folder]`

## Renaming File and Folder
- On windows
>`ren [oldfilename] [newfilename] ren [oldfoldername] [newfoldername]`

- On Bash and Zsh
>`mv [oldfilename] [newfilename] mv [oldfoldername] [newfoldername]`

## What Next

- Practice the commands here
- Use google to discover new commands

## Resources
- [Linux Command Handbook](https://www.freecodecamp.org/news/the-linux-commands-handbook/#the-linux-rmdir-command)

- [The 50 Most Popular Linux & Terminal Commands](https://www.youtube.com/watch?v=ZtqBQ68cfJc&t=11839s)
