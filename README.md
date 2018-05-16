# IoT Party Controller 
This project was carried out by eight students at Linköping University as a part of our Bachelor project and is Licensed
under MIT.

The purpose of the controller is to move the users circle on the UI by tilting the phone (or using WASD on a computer). The current iteration supports multiple gamemodes including, **Knock Off**, **Hockey** and **Pass The Bomb**. The descriptions of these gamemodes can be read on the UI. In certain gamemodes the player also has access to certain abilities, in Knock Off the player can become super heavy for a short period of time to easier knock off opponents.

Most of the gamemodes are made to be free for all and therefor anyone can join at any point by connecting to the correct instance. Since it is also webbased the player doesn't need to download or run any application other than their browser.

# Browser/Phone Support
Most of the development was made using the Chrome web browser for android phones. As such we currently encourage the user to use Chrome and android for the best experience. 
During the development we have also tried to support Mozilla Firefox as much as possible, but some there are some things that are not supported.

# Dependencies 
In order to set up a server for this project the user need four different repositories which are listed below:
* [Server](https://github.com/TDDD96-PUM-Grupp1/server) - This runs the deepstream server that handles the network connections.
* [UI](https://github.com/TDDD96-PUM-Grupp1/ui) - This hosts the JavaScript files for the UI.
* [Controller](https://github.com/TDDD96-PUM-Grupp1/services) - This hosts the JavaScript files for the Controller.
* [Service](https://github.com/TDDD96-PUM-Grupp1/services) - This hosts a service that handles all instances that are currently running, this makes it possible to run multiple instance of the UI.

The corresponing setup is described in their respective GitHub repositories.

# Installation
The instructions will be using yarn as package manager. See [npm vs yarn chear sheet](https://shift.infinite.red/npm-vs-yarn-cheat-sheet-8755b092e5cc) for npm equivalents.

To download and install all the JavaScript packages run these commands in your prefered terminal:

```
git clone git@github.com:TDDD96-PUM-Grupp1/controller.git
yarn
```
Now that you have the Controller and all the needed packages you can host the JavaScript files in a few ways depending on your use-case:

## Server using Windows
This will host the JavaScript files and connect to a deepstream server at deepstream.&lt;insert domain>
```
yarn start-pc
```

## Locally using Windows
This will host the JavaScript files and connect to a deepstream server that is running locally within the network.
**NOTE** This will only work if all the users are on the same network as the hosted files.
```
yarn start-pc-local
```

## Server using Linux
This will host the JavaScript files, and connect to a deepstream server at deepstream.&lt;insert domain>
```
yarn start
```

## Locally using Linux
This will host the JavaScript files and connect to a deepstream server that is running locally within the network.
**NOTE** This will only work if all the users are on the same network as the hosted files.
```
yarn start-local
```
