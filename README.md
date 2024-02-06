# API

![](https://img.shields.io/badge/coverage-80%25-success)

### About Development

- Technologies: Node, express, typescript, jest, prisma, swagger
- Design patterns: Interactors/Facade, Factory, Repository
- DDD

#### Functionalities

Implement secure authentication using (JWT).
Enable users to register and manage profiles along with associated addresses.

#### Structure

- **Entities:** Data exclusively related to business logic.

- **Use Cases (Heritage and Polymorphism):** These have the freedom to modify entities as needed.

- **Interactors:** Responsible for communication with use cases.

- **Controllers:** Utilized by the router and interact with use cases.

- **Errors:** Represents various error types encountered in the application.

#### Tests

Unit testing and integration testing.

To run test use the follow command: ```$ npm run test```
To get test coverage use the follow command: ```$ npm run test-ci```

#### Start

To run application:
```
$ npm i
$ npm run start
$ http://localhost:4568
