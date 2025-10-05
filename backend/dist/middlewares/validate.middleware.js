"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    var _a;
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        return res.status(400).json({ message: (_a = err.errors) !== null && _a !== void 0 ? _a : err.message });
    }
};
exports.validate = validate;
