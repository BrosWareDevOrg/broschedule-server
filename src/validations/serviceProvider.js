import Joi from 'joi';

export const providerCreateValidation = async (req, res, next) => {
  const providerSchemaValidation = Joi.object({
    name: Joi.string()
      .regex(/^([a-zA-Z]+\s)*([a-zA-z])*$/)
      .required()
      .messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is not allowed to be empty',
        'string.base': 'Name can only contain letters',
        'string.min': 'Name must have a minimum of 3 letters',
        'string.max': 'Name can not be longer than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Name field is required',
      }),
    email: Joi.string().email().required().messages({
      'any.required': 'An email is required',
      'string.email': 'Insert a valid email',
      'string.empty': 'Email field is not allowed to be empty',
      'string.required': 'Email field is required',
    }),
    workDescription: Joi.string()
      .regex(/([a-zA-Z])*\s*/)
      .required()
      .min(25)
      .max(500)
      .messages({
        'any.required': 'You must provide a description',
        'string.empty': 'You must provide a description',
        'string.min': 'Description must have at least 25 chars',
        'string.max': 'Description must have at most 500 chars',
      }),
    avaibleDays: Joi.array()
      .items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6))
      .required()
      .messages({
        'any.required':
          'You must indicate your avaibles days to provide your service.',
        'any.only': 'Your days avaibles must be [0, 1, 2, 3, 4, 5, 6] only.',
      }),
    location: Joi.string()
      .regex(/^([a-zA-Z]+\s)*([a-zA-z])*$/)
      .required()
      .messages({
        'any.required': 'You must provide a location',
        'string.pattern.base': 'Location must be a valid location',
      }),
    timeUnit: Joi.number()
      .integer()
      .sign('positive')
      .multiple(10)
      .min(10)
      .max(180)
      .required()
      .messages({
        'any.required':
          'You must provide the number of minute your services will last',
        'number.positive': 'You must provide a positive number',
        'number.min': "Your turns can't be lower than 10 minutes",
        'number.max': "Your turns can't be greater than 180 minutes",
        'number.multiple':
          'Your turns amount in minutes should be a multiple of 10',
      }),
    appointments: Joi.array().items(Joi.string().hex().length(24)).messages({
      'any.only': 'Appointments should contains only appointments Id',
    }),
  });

  const validProvider = providerSchemaValidation.validate(req.body, {
    abortEarly: false,
  });

  if (validProvider.error) {
    return res.status(400).json({
      message: validProvider.error.details,
      error: true,
      data: undefined,
    });
  }

  return next();
};

export const providerEditValidation = async (req, res, next) => {
  const providerSchemaValidation = Joi.object({
    name: Joi.string()
      .regex(/^([a-zA-Z]+\s)*([a-zA-z])*$/)
      .messages({
        'string.empty': 'Name is not allowed to be empty',
        'string.base': 'Name can only contain letters',
        'string.min': 'Name must have a minimum of 3 letters',
        'string.max': 'Name can not be longer than 30 letters',
        'string.pattern.base': 'Name can only contain letters',
        'string.required': 'Name field is required',
      }),
    email: Joi.string().messages({
      'string.email': 'Insert a valid email',
      'string.empty': 'Email field is not allowed to be empty',
      'string.required': 'Email field is required',
    }),
    workDescription: Joi.string()
      .regex(/([a-zA-Z])*\s*/)
      .min(25)
      .max(500)
      .messages({
        'string.empty': 'You must provide a description',
        'string.min': 'Description must have at least 25 chars',
        'string.max': 'Description must have at most 500 chars',
      }),
    avaibleDays: Joi.array()
      .items(Joi.number().valid(0, 1, 2, 3, 4, 5, 6))
      .messages({
        'any.only': 'Your days avaibles must be [0, 1, 2, 3, 4, 5, 6] only.',
      }),
    location: Joi.string()
      .regex(/^([a-zA-Z]+\s)*([a-zA-z])*$/)
      .messages({
        'string.pattern.base': 'Location must be a valid location',
      }),
    timeUnit: Joi.number()
      .integer()
      .sign('positive')
      .multiple(10)
      .min(10)
      .max(180)
      .messages({
        'number.positive': 'You must provide a positive number',
        'number.min': "Your turns can't be lower than 10 minutes",
        'number.max': "Your turns can't be greater than 180 minutes",
        'number.multiple':
          'Your turns amount in minutes should be a multiple of 10',
      }),
    appointments: Joi.array().items(Joi.string().hex().length(24)).messages({
      'any.only': 'Appointments should contains only appointments Id',
    }),
  });

  const validProvider = providerSchemaValidation.validate(req.body, {
    abortEarly: false,
  });

  if (validProvider.error) {
    return res.status(400).json({
      message: validProvider.error.details,
      error: true,
      data: undefined,
    });
  }

  return next();
};
