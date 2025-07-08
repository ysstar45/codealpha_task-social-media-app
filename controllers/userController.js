// backend/controllers/userController.js

const User = require('../models/User');
const AppError = require('../utils/appError');

exports.getAllUsers = async(req, res, next) => {
    try {
        const users = await User.find().select('-password');

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
};

exports.getUser = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return next(new AppError('User not found', 404));
        }

        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};