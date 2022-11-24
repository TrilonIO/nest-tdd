# Signup endpoint

Endpoint used to signup a user in our system.

**Endpoint**: /signup

**Method**: POST

**Body**:

```json
{
  "email": "string",
  "name": "string",
  "password": "string",
  "passwordConfirmation": "string"
}
```

## Success case

1. ✅ Returns 200 with the new user’s id.

## Exceptions:

1. ⛔ Returns **400** when the password and passwordConfirmation don't match.
1. ⛔ Returns **400** when the email is invalid.
1. ⛔ Returns **409** when the email already exists.
