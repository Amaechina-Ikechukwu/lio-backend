"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
function RequestValidator(requiredFields) {
    return function (req, res, next) {
        const missingFields = [];
        for (const field of requiredFields) {
            if (!req.body.hasOwnProperty(field)) {
                missingFields.push(field);
            }
        }
        if (missingFields.length > 0) {
            throw new Error(`Missing fields: ${missingFields.join(", ")}`);
        }
        next(); // Ensure we call next() to pass control to the next middleware or route handler
    };
}
exports.RequestValidator = RequestValidator;
//# sourceMappingURL=RequestValidator.js.map