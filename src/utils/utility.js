var path = require('path');
let _mFile = path.dirname(__dirname);
console.log(_mFile);

module.exports = {
    generatePassword() {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        var passLength = 10;
        for (var x = 0; x < passLength; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    },

    genSalt(howMany = 8, key = '1234567890abcdef') {
        let salt = '';
        for (let x = 0; x < howMany; x++) {
            salt += key.charAt(Math.floor(Math.random() * key.length));
        }
        return salt;
    },

    catchError(message, status) {
        const errorBox = [];
        errorBox.push(message)
        const error = new Error();
        error.data = errorBox[0];
        error.code = status;
        console.log('Error : ', error);
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
                if (this.isDigits(contact_no[i]) == -1) {      // compare with success
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

    /**
     * @param {*} digit 
     * @function isDigits
     * @description This function helps us to validate the whole "39187983" string, All are numbers or mixed with alphabets
     */
    isDigits (digit) {
        let statusCode = 0;
        if(!isNaN(parseInt(digit))) {
            statusCode = -1;      // when no characters are found then it returns -1 for success
        } else {
            statusCode = 1;       // When any alphabets are found then it breaks the loop and returns 1 for failed
        }   
        return statusCode;
    }
}