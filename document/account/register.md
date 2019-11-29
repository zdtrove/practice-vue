# Register

Register API

### Endpoint

`api/v1/account/register`

### HTTP method`

`POST`

### Parameters

| Parameter             | Description                                         | Data Type | Required |
| ----------------------| ----------------------------------------------------| :-------: | :------: |
| type                  | [profile,admin]                                   |  string   |   [x]    |
| register_type         | [email,facebook,google,uuid]                        |  string   |   [x]    |
| google                | require when register_type = [google]               |  string   |   [x]    |
| facebook              | require when register_type = [facebook]             |  string   |   [x]    |
| uuid                  | require when register_type = [uuid]                 |  string   |   [x]    |
| email                 | require when register_type = [email]                |  string   |   [x]    |
| password              | require when register_type = [email]                |  string   |   [x]    |
| password_confirmation | require when register_type = [email]                |  string   |   [x]    |
| name                  | name for profile                                    |  string   |          |

### Data Response

| Response item | Type    | Description                                  |
| ------------- | ------- | -------------------------------------------- |
| data          | array   | Return data when success                     |
| ---- message  | string  | Message when success                         |
| error         | array   | Return error when failed                     |
| ---- message  | string  | Error message                                |
| ---- code     | integer | Error code  [#here](#error-and-status-codes) |


### Sample response

> Success

```json
{
    "data": {
        "message": "You have registered successfully.",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93YW50ZWRseS50dWFubGguaWNkXC9hcGlcL3YxXC9hY2NvdW50XC9sb2dpbiIsImlhdCI6MTU3NDc0OTM3NywiZXhwIjoxODg1Nzg5Mzc3LCJuYmYiOjE1NzQ3NDkzNzcsImp0aSI6IlNCTmJJdW1JYWVOSlM5TVkiLCJzdWIiOjEsInBydiI6ImY1MjZhZjE4ODJlOTQ1NmMxYjYyYTUzNGFiMDM5ODE0MmZjYWU1OTUiLCJndWFyZCI6InByb2ZpbGUtYXBpIn0._LPXmQkKxlmRvv2ncZXBKc_3NelExYkL0BoE6sIS0ZU",
        "expires_in": 5184000,
    }
}
```

> Error

```json
{
    "error": {
        "message": {
            "email" : [
                "入力されたメールアドレスは既に存在しています。"
            ]
        },
        "code": "422"
    }
}
```

### Error and status codes

The following table lists the status and error codes related to this request.

| HTTP Status              | Code | Description                                                  |
| ------------------------ | ---- | ------------------------------------------------------------ |
| 200 OK                   | 200  | Indicates success, but may also be returned when an invalid resource name and/or an invalid parameter combination has been used in the request. |
| 201 Created              | 201  | The request has been fulfilled and new content   being created. |
| 204 No Content           | 204  | Indicates that the request was valid but there   is no traffic data available. |
| 400 Bad request          | 400  | Invalid parameter value in the request.                      |
| 401 Unauthorized         | 401  | Token is invalid or blacklisted. User is not   logged in.    |
| 403 Forbidden            | 403  | Token is valid but don't have permission to   access.        |
| 404 Not found            | 404  | The request URL is invalid.                                  |
| 405 Method not allow     | 405  | Method not allow.                                            |
| 422 Unprocessable Entity | 422  | Failed validation.                                           |
| 500 Internal error       | 500  | The service is not available or server   configuration issue. |
| 503 Service Unavailable  | 503  | Indicates that the services is temporarily   unavailable due to system overload or maintenance. |

------

[Back to API List](README.md)