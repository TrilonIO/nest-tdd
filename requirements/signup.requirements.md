# Signup endpoint

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

1. ✅ Returns 200 with id of the new user.

## Exceptions:

1. ⛔ returns **400** when the password and passwordConfirmation don't match.
1. ⛔ returns **400** when the email is invalid.
1. ⛔ returns **409** when the email already exists.
