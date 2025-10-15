import mongoose from 'mongoose';

// Cache the connection across hot-reloads and serverless invocations
// to prevent creating multiple connections.
type GlobalWithMongoose = typeof global & {
  __mongooseConnPromise?: Promise<typeof mongoose>;
  __mongooseConnected?: boolean;
};

const globalWithMongoose = global as GlobalWithMongoose;

export const connectDatabase = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    // Throw so the platform logs the error; do not exit the process in serverless
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  if (globalWithMongoose.__mongooseConnected) {
    return; // Already connected
  }

  if (!globalWithMongoose.__mongooseConnPromise) {
    // Initialize once per cold start
    globalWithMongoose.__mongooseConnPromise = mongoose.connect(mongoUri).then((conn) => {
      globalWithMongoose.__mongooseConnected = true;
      console.log('MongoDB connected successfully');
      return conn;
    });
  }

  try {
    await globalWithMongoose.__mongooseConnPromise;
  } catch (error) {
    // Reset the promise flag on failure to allow retries in subsequent invocations
    globalWithMongoose.__mongooseConnPromise = undefined;
    console.error('MongoDB connection error:', error);
    throw error;
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    globalWithMongoose.__mongooseConnected = false;
    globalWithMongoose.__mongooseConnPromise = undefined;
    console.log('MongoDB disconnected successfully');
  } catch (error) {
    console.error('MongoDB disconnection error:', error);
  }
};
