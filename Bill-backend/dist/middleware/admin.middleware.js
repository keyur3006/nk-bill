"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = void 0;
const isAdmin = (req, res, next) => {
    try {
        // 🔍 Debug (optional)
        console.log("CHECK ROLE 👉", req.user);
        // ❌ If not admin
        if (!req.user || req.user.role !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Access Denied - Admin Only",
            });
        }
        // ✅ Admin allowed
        next();
    }
    catch (error) {
        console.log("ADMIN MIDDLEWARE ERROR 👉", error);
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
exports.isAdmin = isAdmin;
