import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import OtpInput from '../components/auth/OtpInput';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'form' | 'verification'>('form');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  const { register, verifyEmail, resendOtp, pendingVerification } = useAuth();
  const navigate = useNavigate();

  // Countdown timer for resend OTP
  React.useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      setStep('verification');
      setCountdown(60); // 60 seconds countdown for resend
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setIsLoading(true);

    try {
      await verifyEmail(formData.email, otp);
      navigate('/resources');
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;

    setIsLoading(true);
    try {
      await resendOtp(formData.email);
      setCountdown(60);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToForm = () => {
    setStep('form');
    setError('');
    setOtp('');
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `url('/src/assets/auth-bg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="max-w-md w-full space-y-8 bg-white rounded-3xl shadow-2xl p-8 relative z-10 transform hover:scale-105 transition-transform duration-300">
        
        {step === 'form' ? (
          <>
            {/* Registration Form */}
            <div className="text-center">
              <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                  📚
                </div>
                <span className="text-2xl font-black text-gray-900">Shario</span>
              </Link>
              
              <h2 className="text-4xl font-black text-gray-900 mb-2">
                Join Shario
              </h2>
              <p className="text-gray-600 mb-8">
                Start sharing and discovering learning resources
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Create a password (min. 6 characters)"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="text-center mt-8">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200">
                  Sign in
                </Link>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* OTP Verification */}
            <div className="text-center">
              <Link to="/" className="inline-flex items-center space-x-2 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl text-white">
                  📚
                </div>
                <span className="text-2xl font-black text-gray-900">Shario</span>
              </Link>
              
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                ✉️
              </div>
              
              <h2 className="text-3xl font-black text-gray-900 mb-2">
                Verify Your Email
              </h2>
              <p className="text-gray-600 mb-2">
                We sent a 6-digit code to
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-6">
                {formData.email}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleVerify}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                  Enter verification code
                </label>
                <OtpInput onOtpChange={handleOtpChange} />
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={countdown > 0 || isLoading}
                  className="text-blue-600 hover:text-blue-500 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {countdown > 0 ? `Resend code in ${countdown}s` : 'Resend verification code'}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify Email'
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <button
                onClick={goBackToForm}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                ← Back to registration
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;