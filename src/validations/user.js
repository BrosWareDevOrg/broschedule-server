import Joi from 'joi';

export const userCreateValidation = (req, res, next) => {
  const userValidation = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z]+\s*[a-zA-Z]*$/)
      .max(20)
      .required()
      .messages({
        'any.required': 'Name is a required field',
        'any.empty': 'Name is a required field',
        'string.max': 'Name must be at most 20 chars',
        'string.pattern.base':
          'Name must be a valid name format (letters and spaces only)',
      }),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+\s*[a-zA-Z]*$/)
      .max(20)
      .required()
      .messages({
        'any.required': 'Last name is a required field',
        'any.empty': 'Last name is a required field',
        'string.max': 'Last name must be at most 20 chars',
        'string.pattern.base':
          'Last name must be a valid last name format (letters and spaces only)',
      }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is a required field',
      'any.empty': 'Email is a required field',
      'string.email': 'Invalid email format',
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        'any.required': 'Phone is a required field',
        'any.empty': 'Phone is a required field',
        'string.length': 'Invalid phone format',
        'string.pattern.base': 'Invalid phone format',
      }),
    appointments: Joi.array()
      .items(Joi.string().hex().length(24))
      .messages({
        'any.only': 'Appointment must be a valid apointment Id',
      }),
  });

  const userValid = userValidation.validate(req.body, { abortEarly: false });

  if (userValid.error) {
    return res.status(400).json({
      message: userValid.error.details,
      error: true,
      data: undefined,
    });
  }

  return next();
};

export const userEditValidation = (req, res, next) => {
  const userValidation = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z]+\s*[a-zA-Z]*$/)
      .max(20)
      .messages({
        'any.required': 'Name is a required field',
        'any.empty': 'Name is a required field',
        'string.max': 'Name must be at most 20 chars',
        'string.pattern.base':
          'Name must be a valid name format (letters and spaces only)',
      }),
    lastName: Joi.string()
      .regex(/^[a-zA-Z]+\s*[a-zA-Z]*$/)
      .max(20)
      .messages({
        'any.required': 'Last name is a required field',
        'any.empty': 'Last name is a required field',
        'string.max': 'Last name must be at most 20 chars',
        'string.pattern.base':
          'Last name must be a valid last name format (letters and spaces only)',
      }),
    email: Joi.string().email().messages({
      'any.required': 'Email is a required field',
      'any.empty': 'Email is a required field',
      'string.email': 'Invalid email format',
    }),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .messages({
        'any.required': 'Phone is a required field',
        'any.empty': 'Phone is a required field',
        'string.length': 'Invalid phone format',
        'string.pattern.base': 'Invalid phone format',
      }),
    appointments: Joi.array().items(Joi.string().hex().length(24)).messages({
      'any.only': 'Appointment must be a valid apointment Id',
    }),
  });

  const userValid = userValidation.validate(req.body, { abortEarly: false });

  if (userValid.error) {
    return res.status(400).json({
      message: userValid.error.details,
      error: true,
      data: undefined,
    });
  }

  return next();
};
