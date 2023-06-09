def ResponseModel(data, rate, message):
    return {
        "data": data,
        "rate": rate,
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}