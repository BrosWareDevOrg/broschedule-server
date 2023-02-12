import { connect, set } from 'mongoose';

export const mongooseConnect = async () => {
  try {
    set('strictQuery', false);
    await connect(`${process.env.MONGO_URL}`);
    console.log('Database connected correctly!');
  } catch (error) {
    console.log('Failed connection to database', error);
  }
};
