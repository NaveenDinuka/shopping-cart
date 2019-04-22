import bcrypt from 'bcrypt';

class UtilsHelper {

    /**
     * Generate Password Hash
     * @param password:String
     * @return resultObject:Promise
     * */
    static GEN_PASSWORD_HASH(password) {
        const saltRounds = 10;
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if(err) return reject({ status: 'error', data: err });
                return resolve({ status: 'success', data: hash });
            });
        });
    }

    /**
     * Compare Password
     * @param password:String
     * @param hash:UUID
     * @return resultObject:Promise
     * */
    static COMPARE_PASSWORD(password, hash) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash, function(err, res) {
                if (err) return reject({ status: 'error', data: err });
                return resolve({ status: 'success', data: res });
            });
        });
    }
}

export default UtilsHelper;
