import * as process from 'node:process';

export interface AdminUser {
  email: string;
  password: string;
}

const validateEnvVariables = () => {
  const requiredEnvVars = ['ADMIN_USER', 'ADMIN_PASSWORD'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
};

validateEnvVariables();

export const DEFAULT_ADMIN: AdminUser = {
  email: process.env.ADMIN_USER!,
  password: process.env.ADMIN_PASSWORD!,
};

export const authenticate = async (email: string, password: string): Promise<AdminUser | null> => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
}; 