### TODO

- [ ] Test GET /user/:userId
- [ ] POST /user/:userId
- [ ] add validation to post routes
- [ ] keep helper functions in their own files for tests.
- [ ] on /signup route, check for username field if username already registered or not.
- [ ] add more todos

### Routes

- [x] /auth
  - [x] POST /signin
  - [x] POST /signup

- [ ] /chats
  - [x] GET / show all chats till now
  - [x] GET /:chatId will show all the messages till now
  - [x] POST /:chatId will add a new message to the chat
  - [x] DELETE /:chatId will delete the chat
  - [x] GET /user/:userId will check if chat already exist if yes then redirect user to the chat id or null
  - [x] POST /user/:userId will create a new chat and return the chatId

- [x] /users
  - [x] GET / show all users who exist on the platform but user haven't messaged yet
  - [x] GET /:userId show the profile of the user
  - [x] PATCH /me to update the profile of the user
