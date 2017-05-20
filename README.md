[![Build Status](https://travis-ci.org/Angelmmiguel/discuzzion.svg?branch=master)](https://travis-ci.org/Angelmmiguel/discuzzion)

> **NOTE**: This project is currently under active development

# Discuzzion

**Talk with random people about something**. This project connects you to random people to talk about the topic you want. You can discuss about videogames, society or a TV serie. Just create a topic or join a current one to start talking with other people.

There aren't accounts nor users in Discuzzion. Every time you enter in the app you get a random identifier. They are stored in memory and removed when you leave the application or the server is restared. About messages, they pass through the server but they are not stored. To sum up, there is no database ;)

Privacy and freedom of expression are the core ideas of this project. You can read our [Manifesto](https://github.com/Angelmmiguel/discuzzion/blob/master/MANIFESTO.md)

# Current technologies

## Client

* [React](https://facebook.github.io/react/)
* [Create-react-app](https://github.com/facebookincubator/create-react-app)
* [Yarn](https://yarnpkg.com/lang/en/)
* [Jest](https://facebook.github.io/jest/)
* [Webpack](https://webpack.js.org/)
* [Socket.io](https://socket.io/)

## Server

* [Express](http://expressjs.com/)
* [Socket.io](https://socket.io/)

## Useful links

Check the [wiki](https://github.com/Angelmmiguel/discuzzion/wiki/Useful-links).

# Development

TODO: Add instructions for development without docker.

## Docker

This project includes a `docker-compose.yml` file that defines the containers you need to run it. Every container has its own process and purpose:

* nginx: expose the full application in the port 8080. The client Are the backend are not exposed directly, so you will need to use this endpoint.
* client: create-react-app development server process. It includes hot-reloading.
* backend: API development server process. It also exports the 5858 port for debugging purposes. There is a [guide in the wiki](https://github.com/Angelmmiguel/discuzzion/wiki/Debug-with-VSCode) to add debugging capabilities to [Visual Studio Code](https://code.visualstudio.com/)

Finally, to run the project just execute `docker-compose up`. The URL of the application will depends on your environment:

| Environment | URL |
| ----  | ---- |
| Docker for Mac  | [http://localhost:8080](http://localhost:8080) |
| Docker on linux  | [http://localhost:8080](http://localhost:8080) |
| Using Docker in a virtual machine | http://VIRTUAL_MACHINE_IP:8080 |
| Dinghy | http://discuzzion.docker |
