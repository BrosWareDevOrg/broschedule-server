import ServiceProviders from "../models/ServiceProviders.js";

export const getProviders = async (req, res) => {
  try {
    const providerList = await ServiceProviders.find();
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
    res.status(400).json({
      message: "Can't access service delivery list. Try in a few minutes.",
      error: true,
    });
  }
};
