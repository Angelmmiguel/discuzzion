# Discuzzion
Talk with other people about something

## Development

To run the project, just execute `docker-compose up`. This command will create three containers:

* client: It's based in react and it's exposed on `3000` port.
* backend: It's based in express and it's exposed on `3001` port.
* mongodb: The databse for the project. It's linked with the backend.