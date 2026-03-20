### TODO

- [x] add all necessary packages
- [x] design db
- [x] create and run server
- [x] plan all routes
- [ ] add more todos


### Routes

- [ ] /auth
    - [ ] POST /signin
    - [ ] POST /signup
    - [ ] POST /logout

- [ ] /chats
    - [ ] GET / show all users whom the user chatted till now
    - [ ] GET /chats/user/{userId} will show all the messages till now or will return [check what it will return]
    - [ ] POST /chats/user/{userId} will create new chat if the chat don't exist or add a new message to the chat

- [ ] /users
    - [ ] GET / show all users who exist on the platform but user haven't messaged yet
    - [ ] GET /{userId} show the profile of the user
    - [ ] PATCH /{userId} to update the profile of the user