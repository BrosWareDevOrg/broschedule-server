import Users from '../models/User.js';
import { isValidObjectId } from 'mongoose';

export const getUsers = async (req, res) => {
    try{
        const users = await Users.find(req.query);
        if(!users) {
            throw new Error({
                message: 'Users not found',
                status: 404,
            });
        }
        if (users.length === 0) {
            return res.status(200).json({
                message: 'Users list is empty',
                data: users,
                error: false,
            })
        }
        return res.status(200).json({
            message: 'Users list found successfully',
            data: users,
            error: false,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || error,
            error: true,
        })
    }
};

export const getUserById = async (req, res) => {
    try{
        const { id } = req.params;
        if(!isValidObjectId(id)) {
            throw new Error({
                message: 'Invalid User ID',
                status: 400,
            })
        }
        const user = await Users.findById(id);
        if(!user){
            throw new Error({
                message: 'User not found',
                status: 404,
            });
        };
        return res.status(200).json({
            message: 'User found successfully',
            data: user,
            error: false,
        })
    } catch(error){
        return res.status(error.status || 500).json({
            message: error.message || error,
            error: true,
        })
    }
};

export const createUser = async(req, res) => {
    try{
        const newUser = new Users({
            name: req.body.name,
            lastName: req.body.lastName,
            phone: req.body.phone,
            email: req.body.email,
        });
        const result = await newUser.save();
        return res.status(201).json({
            message: 'User created successfully',
            data: result,
            error: false,
        });
        } catch (error) {
            return res.status(error.status || 500).json({
                message: error.message || error,
                error: true,
            })
        }
}