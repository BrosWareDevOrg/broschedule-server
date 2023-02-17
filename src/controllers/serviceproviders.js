import { isValidId } from '../helpers/idValidation.js';
import ServiceProviders from '../models/ServiceProviders.js';
import Users from '../models/User.js';
import firebase from '../helpers/firebase/config.js';

export const createServiceProvider = async (req, res) => {
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

    //Firebase auth new user
    const newFirebaseUser = await firebase.auth().createUser({
      email: req.body.email,
      password: req.body.password,
    });
    await firebase
      .auth()
      .setCustomUserClaims(newFirebaseUser.uid, { isServiceProvider: true });
    //End firebase auth.
    const body = { ...req.body };
    delete body.password;

    const newProvider = await ServiceProviders.create({
      ...body,
      firebaseUid: newFirebaseUser.uid,
    });
    await newProvider.save();
    return res.status(201).json({
      message: `Service provider created successfully`,
      data: newProvider,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unexpected error ${error}.`,
      error: true,
      data: undefined,
    });
  }
};

export const getProviders = async (req, res) => {
  try {
    const providerList = await ServiceProviders.find(req.query).populate(
      'appointments'
    );
    if (providerList.length === 0) {
      return res.status(404).json({
        mesage: 'Service Provider list is empty. Register one first!',
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Service Providers found!',
      error: false,
      data: [...providerList],
    });
  } catch (error) {
    res.status(500).json({
      message: `Unexpected error ${error}.`,
      error: true,
      data: undefined,
    });
  }
};

export const getByIdProvider = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        message: 'Invalid "id" on request',
        error: true,
        data: undefined,
      });
    }
    const provider = await ServiceProviders.findById(id).populate(
      'appointments'
    );
    if (!provider) {
      return res.status(404).json({
        mesage:
          'Service Provider not found. Try with someone else or try later!',
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Service Providers found!',
      error: false,
      data: provider,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unexpected error ${error}.`,
      error: true,
      data: undefined,
    });
  }
};

export const updateProviderInfo = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        message: 'Invalid "id" on request',
        error: true,
        data: undefined,
      });
    }
    const providerToUpdate = await ServiceProviders.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!providerToUpdate) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: 'Provider updated successfully!',
      error: false,
      data: providerToUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unexpected error ${error}.`,
      error: true,
      data: undefined,
    });
  }
};

export const removeProvider = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({
        message: 'Invalid "id" on request',
        error: true,
        data: undefined,
      });
    }
    const provider = await ServiceProviders.findById(id);

    if (!provider) {
      return res.status(404).json({
        message: 'User not found',
        error: true,
        data: undefined,
      });
    }

    const providerRemoved = await ServiceProviders.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );

    return res.status(200).json({
      message: 'Account deleted successfully!',
      error: false,
      data: providerRemoved,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unexpected error ${error}.`,
      error: true,
      data: undefined,
    });
  }
};

export const deleteProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const providerToRemove = await ServiceProviders.findById(id);
    await firebase.auth().deleteUser(providerToRemove.firebaseUid);
    const provider = await ServiceProviders.findByIdAndRemove(id);
    if (!provider) {
      return res.status(404).json({
        message: 'Service Provider not found',
        data: undefined,
        error: true,
      });
    }
    return res.status(204).json();
  } catch (err) {
    return res.status(400).json({
      message: err || 'Error deleting Service Provider',
      data: undefined,
      error: true,
    });
  }
};
