import Joi from 'joi';

export const appointmentValidation = Joi.object({
  serviceProvider: Joi.string().hex().length(24).messages({
    'any.empty': 'Appointment should contain a service provider Id',
    'string.hex': 'Appointment invalid pattern',
    'string.length': 'Appointment invalid pattern',
  }),
  client: Joi.string().hex().length(24).messages({
    'any.empty': 'Appointment must contain a client id',
    'string.hex': 'Appointment invalid pattern',
    'string.length': 'Appointment invalid pattern',
  }),
  day: Joi.date().greater('now').messages({
    'date.empty': 'Appointment should have a valid day',
  }),
  hourIndex: Joi.number().integer().min(0).messages({
    'string.empty': 'Appointment should have an specific hour',
    'number.integer': 'Hour index must to be integer',
    'number.min': 'Hour index must to be greater or equal to 0',
  }),
  expired: Joi.boolean().messages({
    'boolean.base': 'Invalid expired format (Boolean  only)',
  }),
});

export const appointmentsCreateValidation = async (req, res, next) => {
  const appointmentValidationRequire = Joi.object({
    serviceProvider: Joi.string().hex().length(24).required().messages({
      'any.required': 'Appointment should contain a service provider Id',
      'any.empty': 'Appointment should contain a service provider Id',
      'string.hex': 'Appointment invalid pattern',
      'string.length': 'Appointment invalid pattern',
    }),
    client: Joi.string().hex().length(24).required().messages({
      'any.required': 'Appointment must contain a client id',
      'any.empty': 'Appointment must contain a client id',
      'string.hex': 'Appointment invalid pattern',
      'string.length': 'Appointment invalid pattern',
    }),
    day: Joi.date().greater('now').required().messages({
      'any.required': 'Appointment should have a valid day',
      'date.empty': 'Appointment should have a valid day',
    }),
    hourIndex: Joi.number().integer().min(0).required().messages({
      'any.required': 'Appointment should have an specific hour',
      'string.empty': 'Appointment should have an specific hour',
      'number.integer': 'Hour index must to be integer',
      'number.min': 'Hour index must to be greater or equal to 0',
    }),
    expired: Joi.boolean().messages({
      'boolean.base': 'Invalid expired format (Boolean  only)',
    }),
  });

  const appointment = appointmentValidationRequire.validate(req.body, {
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

export const appointmentsEditValidation = async (req, res, next) => {
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
