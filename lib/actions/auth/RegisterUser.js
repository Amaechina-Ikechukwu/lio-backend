"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase-admin/auth");
const doesUserExists = (uid) => {
    return (0, auth_1.getAuth)()
        .getUser(uid)
        .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${JSON.stringify(userRecord)}`);
        return true;
    })
        .catch((error) => {
        console.log("Error fetching user data:", error);
    });
};
function RegisterUser(data) {
    const uid = data;
    if (doesUserExists(uid)) {
        return (0, auth_1.getAuth)()
            .createCustomToken(uid)
            .then((customToken) => {
            return customToken;
        })
            .catch((error) => {
            console.log("Error creating custom token:", error);
        });
    }
    else {
        return "User does not exist";
    }
}
exports.default = RegisterUser;
//# sourceMappingURL=RegisterUser.js.map