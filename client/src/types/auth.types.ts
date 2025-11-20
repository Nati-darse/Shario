export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface VerifyEmailData {
  email: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: string;
      email: string;
      username: string;
      isVerified: boolean;
    };
    token?: string;
    requiresVerification?: boolean;
  };
}