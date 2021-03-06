const FIELDS_NOT_FOUND = 203
const SERVER_ERROR = 208
const DATABASE_ERROR = 400
const USER_EXIST = 305
const USER_FAILED = 603
const NOT_FOUND = 567
const FOUND = -1
const INVALID_INPUT = 489

module.exports =  {
    FIELDS_NOT_FOUND: FIELDS_NOT_FOUND,
    SERVER_ERROR: SERVER_ERROR,
    DATABASE_ERROR: DATABASE_ERROR,
    USER_EXIST: USER_EXIST,
    USER_FAILED: USER_FAILED,
    NOT_FOUND: NOT_FOUND,
    FOUND: FOUND,
    INVALID_INPUT: INVALID_INPUT
}

console.log('error-codes.js loaded successfully');