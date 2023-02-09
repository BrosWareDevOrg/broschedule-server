import Joi from 'joi';

export const appointmentsCreateValidation = async (req, res, next) => {
  const appointmentValidation = Joi.object({
    serviceProvider: Joi.string().hex().length(24).required().messages({
      'any.required': 'Appointment should contain a service provider Id',
      'any.empty': 'Appointment should contain a service provider Id',
      'string.hex': 'Appointment invalid pattern',
      'string.length': 'Appointment invalid pattern'
    }),
    client: Joi.string().hex().length(24).required().messages({
      'any.required': 'Appointment must contain a client id',
      'any.empty': 'Appointment must contain a client id',
      'string.hex': 'Appointment invalid pattern',
      'string.length': 'Appointment invalid pattern'
    })
  });

  const appointment = appointmentValidation.validate(req.body, {
    abortEarly: false,
  });

  if (appointment.error) {
    return res.status(400).json({
      message: appointment.error.details,
      error: true,
      data: undefined,
    });
  }

  return next();
};
