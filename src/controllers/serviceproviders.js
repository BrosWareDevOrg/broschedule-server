import ServiceProviders from "../models/ServiceProviders.js";

export const createServiceProvider = async (req, res) => {
  try {
    const providers = await ServiceProviders.find().populate("appointments");
    const newProvider = await ServiceProviders.create(req.body);
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
      message: `Unespected error ${error}.`,
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
      message: "Can't access service delivery list. Try in a few minutes.",
      error: true,
    });
  }
};

export const getOneProvider = async (req, res) => {
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
      message: "Can't access service delivery list. Try in a few minutes.",
      error: true,
    });
  }
};
