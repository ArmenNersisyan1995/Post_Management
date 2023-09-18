import { ObjectSchema } from 'joi';

export const validateObject = (schema: ObjectSchema, object: { [key: string]: any }) => (// eslint-disable-line
  schema.validate(object)
);
