"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("firebase-admin/auth");
function UserAuthenticationData(uid) {
    return (0, auth_1.getAuth)()
        .getUser(uid)
        .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        return userRecord;
    })
        .catch((error) => {
        console.log("Error fetching user data:", error);
    });
}
exports.default = UserAuthenticationData;
//# sourceMappingURL=UserAuthenticationData.js.map