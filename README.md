# GIgnoreX

GIgnoreX is a command-line utility for managing .gitignore files without directly modifying them. It allows you to add, remove, and list files to be ignored by Git without adding them to the `.gitignore` file.

## Description

This tool is designed to handle Git-ignore functionality for files that editors or IDEs produce (such as configuration files) that you don't want to push to Git but also don't want to add explicitly to the `.gitignore` file.


## Installation

```bash
npm install -g gignorex

```
## Add files to ignore:
```bash
gignorex add <file/folder name>
```
## Remove files from ignore:
```bash
gignorex remove <file/folder name>
```
## List ignored files:
```bash
gignorex list
```

## Examples
```bash
gignorex add logs/
gignorex add /.vscode/
gignorex remove temp.txt
gignorex list
```

## Contributing
Contributions are welcome! If you have suggestions, enhancements, or bug fixes, feel free to open an issue or create a pull request.

## License
This project is licensed under the [MIT License](https://mit-license.org/).