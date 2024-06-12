# Commitia

Commitia is a simple command line tool to help you write commit messages.

## Requirements
- Git command line installed
- Node v20
- Copy .env.example to .env and add your OPENAI API key as COMMITIA_OPENAI_API_KEY var.

## Installation

```bash
nvm use
npm install
```

## Usage

I use this alias in .bashrc:

```
alias gcmsgia='node path_to_commitia/index.js | tee >(xargs -I {} git commit -m "{}")'
```
