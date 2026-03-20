# Auth API

Base URL: `POST /api/v1/auth`

## Register
`POST /auth/register`
```json
{
  "name": "Rahim Uddin",
  "phone": "+8801712345678",
  "password": "securepass",
  "role": "CUSTOMER"
}
```
Response: `{ accessToken, refreshToken }`

## Login
`POST /auth/login`
```json
{ "phone": "+8801712345678", "password": "securepass" }
```
Response: `{ accessToken, refreshToken }`

## Refresh Token
`POST /auth/refresh`
```json
{ "refreshToken": "..." }
```
Response: `{ accessToken, refreshToken }`
