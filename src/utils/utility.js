// let path = require('path');
// let _mFile = path.dirname(__dirname);
// console.log(_mFile);
let crypto = require('crypto');
let AdminUser = require('../models/admin_user');
let mongoose = require('mongoose');
let mongo = require('../../mongo-connect');

let ObjectId = mongoose.Types.ObjectId;



/**
 * @param {*} digit 
 * @function isDigits
 * @description This function helps us to validate the whole "39187983" string, All are numbers or mixed with alphabets
 */
let isDigits = function (digit) {
    let statusCode = 0;
    if(!isNaN(parseInt(digit))) {
        statusCode = -1;      // when no characters are found then it returns -1 for success
    } else {
        statusCode = 1;       // When any alphabets are found then it breaks the loop and returns 1 for failed
    }   
    return statusCode;
}

module.exports = {
    generatePassword() {
        var chars = "abcdefotwxvzsumnrk0123456789";
        var pass = "";
        var passLength = 10;
        for (var x = 0; x < passLength; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    },

    genSalt(howMany = 6, key = 'abcdefotwxvzsumnrk0123456789') {
        let salt = '';
        for (let x = 0; x < howMany; x++) {
            salt += key.charAt(Math.floor(Math.random() * key.length));
        }
        return salt;
    },
    randomId(howMany = 7, key = 'abcdef0123456789') {
        let salt = '';
        for (let x = 0; x < howMany; x++) {
            salt += key.charAt(Math.floor(Math.random() * key.length));
        }
        return salt;
    },

    catchError(message, status) {
        const errorBox = [];
        errorBox.push(message)
        let error = new Error();
        error = Object.assign({data: errorBox[0], code: status}, error);
        throw error;
    },

    validateMobileNo: contact_no => {
        let bool = false;
        if (contact_no.length < 10) {
          return bool;
        }
      
        if(contact_no.startsWith('6') || contact_no.startsWith('7') || contact_no.startsWith('8') || contact_no.startsWith('9')) {
            contact_no = contact_no.split('');

            resume:
            for (let i = 0 ; i < contact_no.length; i++) {
                if (isDigits(contact_no[i]) == -1) {      // compare with success
                    bool = true;
                    continue resume;
                } else {
                    bool = false;    // when failed then it stops the excution    
                    break;                   
                }
            }
        }
        return bool;
    },
    appendId(document) {
        let _id = document._id.toString();
        delete document._id;
        document = Object.assign({_id: _id}, document);
        return document;
    },
    sendResponse(statusCode, success, message, errCode, result) {
        return Object.assign({
            code: statusCode,
            message: message,
            success: success,
            errCode: errCode,
        }, result);
    },
    
    hash(plainText, public_key) {
        let data = plainText.concat(public_key);
        let hash_algo = crypto.createHash('sha1');
        hash_algo.update(data + '', 'ascii')
        return hash_algo.digest('hex');
    },

    isValidString(text) {
        let split_text = text.split('');
        let bool = true;
        for(let element of split_text) {
            if (!isNaN(element)) {
                bool = false;
                break;
            } else if (this.isSymbol(element) === true) {
                bool = false;
                break;
            }
        }
        return bool;
    },

    isSymbol(character) {
        let symbols = ['1', '~', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=', '[', ']', '|', '{', '}',
        ':', ';', '"', '?', '>', '<', '/', '.']

        let bool = false;
        for (let i = 0; i < symbols.length; i++) {
            if (character === symbols[i]) {
                bool = true;
                break;
            }
        }
        return bool
    },
    documentId(lastId) {
        
    },
    filterUserInfo(document) {
        return {
            _id: document._id.toString(),
            firstName: document.firstName,
            lastName: document.lastName,
            admin_id: document.admin_id,
            contact: document.contact
        }
    },
    authenticatAdminUser(admin_id) {
        let query = {};

        if (admin_id.length > 20) {
            query = { _id: ObjectId(admin_id) }
        } else {
            query = { admin_id: admin_id }
        }

        return new Promise(async function (resolve, reject) {
            await mongo.connect();
            AdminUser.find(query).lean().exec(function (err, document) {
                if (err) {
                    throw new Error(err);
                } else if (document.length > 0) {
                    resolve({err_code: -1, msg: document[0]});
                } else {
                    resolve({err_code: 10, msg: null});
                }
            });
        });
    }
}

