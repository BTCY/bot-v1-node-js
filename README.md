# Telegram Bot V1 (test project)

## Table of Contents
+ [About](#about)
+ [Getting Started](#getting_started)
+ [Usage](#usage) 

## About <a name = "about"></a>
Test project with telegram bot.

## Getting Started <a name = "getting_started"></a>
These instructions will help you run a copy of the project on your local machine for development and testing purposes..

### Prerequisites
For the project to work, the following dependencies must be installed on your system.

### Main dependencies
+ Node.JS and NPM — <a href="https://docs.npmjs.com/downloading-and-installing-node-js-and-npm" target="_blank">Documentation</a>
+ Nodemon — <a href="https://github.com/remy/nodemon" target="_blank">Documentation</a>

### Installing project
0. Copy this repository to your local machine
1. Run the command in the project folder
    ```
    npm install
    ```
 2. Create a telegram bot token — <a href="https://core.telegram.org/bots/tutorial#obtain-your-bot-token" target="_blank">Documentation</a>
 3. Create a .env file at the root of the project (on the same level as package.json)
 4. Add a telegram bot token to the .env file
    ```
    TELEGRAM_TOKEN="YOUR_TOKEN" 
    ```
 5. Start the project
    ```
    npm start 
    ```

## Usage <a name = "usage"></a>
Go to telegram, find there the bot you created to which the specified API token is attached.
Get a list of available commands by writing to it:
```
/help
```
