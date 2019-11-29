# Login

Logout API

### Endpoint

`api/v1/account/logout`

### HTTP method`

`GET`

### Parameters

| Parameter   | Description                                         | Data Type | Required |
| ----------- | ----------------------------------------------------| :-------: | :------: |
| token       |                                                     |  string   |   [x]    |

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
        "message": "You have logged out.",
    }
}
```

> Error

```json
{
    "error": {
        "message": "Token invalid.",
        "code": "401"
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