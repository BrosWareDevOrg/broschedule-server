import Users from '../models/User.js';
import ServiceProviders from '../models/ServiceProviders.js';
import { isValidObjectId } from 'mongoose';
import firebase from '../helpers/firebase/config.js';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find(req.query).populate('appointments');
    if (!users) {
      return res
        .status(404)
        .json({ message: 'Users not found', error: true, data: undefined });
    }
    if (users.length === 0) {
      return res.status(200).json({
        message: 'Users list is empty',
        data: users,
        error: false,
      });
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
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: 'Invalid User ID', error: true, data: undefined });
    }
    const user = await Users.findById(id).populate('appointments');
    if (!user) {
      return res
        .status(404)
        .json({ message: 'User not found', error: true, data: undefined });
    }
    return res.status(200).json({
      message: 'User found successfully',
      data: user,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const providerExist = await ServiceProviders.findOne({
      email: req.body.email,
    });
    const userExist = await Users.findOne({ email: req.body.email });
    if (providerExist || userExist) {
      return res.status(451).json({
        message: 'This email has already been registered',
        error: true,
        data: providerExist || userExist,
      });
    }

    //Firebase auth new User
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { isServiceProvider: false });
    //End firebase auth new user
    const body = { ...req.body };
    delete body.password;

    const newUser = new Users({
      ...body,
      appointments: [],
      firebaseUid: newFirebaseUser.uid,
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
    });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: 'Invalid User ID', error: true, data: undefined });
    }
    const result = await Users.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );
    if (!result) {
      return res
        .status(404)
        .json({ message: 'User not found', error: true, data: undefined });
    }
    return res.status(200).json({
      message: 'Account deleted successfully!',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToRemove = await Users.findById(id);
    await firebase.auth().deleteUser(userToRemove.firebaseUid);
    const user = await Users.findByIdAndRemove(id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(400).json({
      message: err || 'Error deleting User',
      data: undefined,
      error: true,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
      return res
        .status(400)
        .json({ message: 'Invalid User ID', error: true, data: undefined });
    }
    const result = await Users.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    ).populate('appointments');

    if (!result) {
      return res
        .status(404)
        .json({ message: 'User not found', error: true, data: undefined });
    }
    return res.status(200).json({
      message: 'User updated successfully',
      data: result,
      error: false,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.message || error,
      error: true,
    });
  }
};
