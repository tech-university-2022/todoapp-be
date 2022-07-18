/auth
- POST /signup
    - PAYLOAD: email, password, first name, last name, avatar
    - RETURN: token
- POST /login
    - PAYLOAD: email, password
    - RETURN: token
- POST /logout
    - PAYLOAD: token
    - RETURN: {}

/user
- GET /
    - PAYLOAD: token
    - RETURN: {user information}
- PATCH /
    - PAYLOAD: token, first name, last name, avatar
    - RETURN: {user information}
- PATCH /
    - PAYLOAD: token, oldPassword, newPassword
    - RETURN: token

/todos
- GET /
    - PAYLOAD: token, pagination (take, page)
    - RETURN: array of respective todos, pagination (take, page, haveNextPage, totalTodos).
- POST /
    - PAYLOAD: token, content of todo
    - RETURN: respective todo
- GET /{todoId}
    - PAYLOAD: token
    - RETURN: respective todo
- PATCH /{todoID}
    - PAYLOAD: token, new content of todo
    - RETURN: respective todo
- DELETE /{todoId}
    - PAYLOAD: token
    - RETURN: {}

/files
- GET /{fileId}
    - PAYLOAD: token
    - RETURN: respective file


RestFul API

RestLess
    