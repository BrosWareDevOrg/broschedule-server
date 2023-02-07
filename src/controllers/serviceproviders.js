import ServiceProviders from "../models/ServiceProviders.js";

export const createServiceProvider = async (req, res) => {
  try {
    const providers = await ServiceProviders.find().populate("appointments");
    const newProvider = await ServiceProviders.create({
      ...req.body,
      isActive: true,
    });
    const isProviderRegister = providers.some(
      (prov) => prov.email === newProvider.email
    );
    if (isProviderRegister) {
      return res.status(451).json({
        message: "This email has already register",
        error: true,
        data: req.body,
      });
    }
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
    const providerList = await ServiceProviders.find().populate("appointments");
    if (providerList.length === 0) {
      return res.status(404).json({
        mesage: "Service Provider list is empty. Register one first!",
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: "Service Providers found!",
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
    const { id } = req.body;
    const provider = await ServiceProviders.findById(id).populate(
      "appointments"
    );
    if (!provider) {
      return res.status(404).json({
        mesage:
          "Service Provider not found. Try with someone else or try later!",
        error: true,
        data: undefined,
      });
    }
    return res.status(200).json({
      message: "Service Providers found!",
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
    const provider = await ServiceProviders.findByID(id);

    if (!provider) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
    }

    const providerToUpdate = await ServiceProviders.findByIdAndUpdate(id, body);

    return res.status(200).json({
      message: "Provider updated successfully!",
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
    const provider = await ServiceProviders.findById(id);

    if (!provider) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        data: undefined,
      });
    }

    const providerDeleted = await ServiceProviders.findByIdAndUpdate(
      id,
      {
        isActive: false,
      }
    );

    return res.status(200).json({
      message: "Account deleted successfully!",
      error: false,
      data: providerDeleted,
    });
  } catch (error) {
    res.status(500).json({
      message: `Unexpected error ${error}.`,
      error: true,
      data: undefined,
    });
  }
};
