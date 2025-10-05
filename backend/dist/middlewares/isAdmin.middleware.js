"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdminMiddleware = void 0;
const isAdminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};
exports.isAdminMiddleware = isAdminMiddleware;
