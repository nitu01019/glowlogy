/**
 * Login Page
 * Connected to Firebase Authentication
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, User } from 'lucide-react';
import { Button, Input } from '../components/ui';
import { SEO } from '../components/common';
import { signIn, signUp, signInWithGoogle, resetPassword } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Password validation (min 6 characters)
  const isValidPassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate email
    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password
    if (!isValidPassword(formData.password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Validate name for signup
    if (!isLogin && !formData.name.trim()) {
      setError('Please enter your full name');
      return;
    }

    setIsLoading(true);

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(formData.email, formData.password);
      } else {
        result = await signUp(formData.email, formData.password, formData.name);
      }

      if (result.error) {
        // Format Firebase error messages
        let errorMessage = result.error;
        if (errorMessage.includes('auth/email-already-in-use')) {
          errorMessage = 'This email is already registered. Please login instead.';
        } else if (errorMessage.includes('auth/invalid-credential') || errorMessage.includes('auth/wrong-password')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (errorMessage.includes('auth/user-not-found')) {
          errorMessage = 'No account found with this email. Please sign up.';
        } else if (errorMessage.includes('auth/too-many-requests')) {
          errorMessage = 'Too many failed attempts. Please try again later.';
        } else if (errorMessage.includes('auth/weak-password')) {
          errorMessage = 'Password is too weak. Use at least 6 characters.';
        }
        setError(errorMessage);
      } else {
        setSuccess(isLogin ? 'Login successful! Redirecting...' : 'Account created successfully!');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err) {
      setError('Google sign-in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await resetPassword(formData.email);
      if (result.error) {
        setError(result.error);
      } else {
        setSuccess('Password reset email sent! Check your inbox.');
        setShowForgotPassword(false);
      }
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO title={isLogin ? 'Login - Glowlogy' : 'Sign Up - Glowlogy'} />
      
      <section className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-secondary via-background to-background-alt py-12">
        <div className="container-custom max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-8 shadow-xl"
          >
            {/* Logo */}
            <div className="text-center mb-6">
              <Link to="/" className="inline-block">
                <span className="text-3xl font-heading font-bold text-primary">Glowlogy</span>
              </Link>
              <p className="text-gray-500 mt-2">
                {showForgotPassword ? 'Reset your password' : (isLogin ? 'Welcome back!' : 'Create your account')}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
              >
                <AlertCircle size={18} className="flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700"
              >
                <CheckCircle size={18} className="flex-shrink-0" />
                <span className="text-sm">{success}</span>
              </motion.div>
            )}

            {/* Forgot Password Form */}
            {showForgotPassword ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  
                  <Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                  </Button>
                  
                  <button
                    type="button"
                    onClick={() => { setShowForgotPassword(false); setError(''); setSuccess(''); }}
                    className="w-full text-sm text-gray-500 hover:text-primary py-2"
                  >
                    ← Back to Login
                  </button>
                </form>
              </motion.div>
            ) : (
              <>
                {/* Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
                  <button
                    type="button"
                    onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      isLogin ? 'bg-white shadow text-primary' : 'text-gray-500'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      !isLogin ? 'bg-white shadow text-primary' : 'text-gray-500'
                    }`}
                  >
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <Input
                      label="Full Name"
                      placeholder="Your full name"
                      icon={User}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  )}
                  
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    icon={Mail}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  
                  <div className="relative">
                    <Input
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min. 6 characters"
                      icon={Lock}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {isLogin && (
                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                        <span className="text-gray-600">Remember me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => { setShowForgotPassword(true); setError(''); setSuccess(''); }}
                        className="text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                  )}

                  <Button type="submit" fullWidth loading={isLoading} disabled={isLoading}>
                    {isLoading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Create Account')}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-gray-500">or</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="font-medium text-gray-700">Continue with Google</span>
                </button>

                {/* Terms for signup */}
                {!isLogin && (
                  <p className="text-xs text-gray-500 text-center mt-4">
                    By signing up, you agree to our{' '}
                    <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                    {' '}and{' '}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
                )}
              </>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Login;
