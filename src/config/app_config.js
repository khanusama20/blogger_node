module.exports = {
    errcodes: {
        FIELDS_NOT_FOUND: 203,
        SERVER_ERROR: 208,
        DATABASE_ERROR: 400,
        USER_EXIST: 305,
        USER_FAILED: 603,
        NOT_FOUND: 567,
        SUCCESS: 0,
        INVALID_INPUT: 489,
        FAILED: 303
    },
    errmessages: {
        database: 'Request is failed due to database failure',
        mandatory: 'Mandatory feilds are not found',
        recordFailed: 'Record not added',
        userNotFound: 'User is not found',
        notFound: 'No any records are found'
    },
    type: {
        INFO: 'info',
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error'
    }
}