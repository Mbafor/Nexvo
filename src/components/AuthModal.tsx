import { useState, useEffect } from 'react';
import { X, Loader2, Download, Shield, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { downloadIntentService } from '../utils/downloadIntent';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [hasPendingDownload, setHasPendingDownload] = useState(false);

  const {
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    sendPasswordReset,
  } = useAuth();

  // Check for pending download on modal open
  useEffect(() => {
    if (isOpen) {
      setHasPendingDownload(downloadIntentService.hasPendingIntent());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (mode === 'reset') {
      // Handle password reset
      if (!email) {
        setError('Please enter your email address');
        return;
      }

      setIsLoading(true);
      try {
        await sendPasswordReset(email);
        setSuccessMessage(`📧 Password reset link sent to ${email}!\n\nPlease check your email and follow the instructions to reset your password.`);
        setEmail('');
        // Switch back to sign-in after 3 seconds
        setTimeout(() => {
          setMode('signin');
          setSuccessMessage('');
        }, 3000);
      } catch (err: any) {
        setError(err.message || 'Failed to send password reset email. Please try again.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password);
        setSuccessMessage(`✅ Account created successfully!\n\n📧 Please check your email (${email}) for a verification link.`);
        // Clear form after successful signup
        setEmail('');
        setPassword('');
        // Switch to sign in mode after signup
        setTimeout(() => {
          setMode('signin');
          setSuccessMessage('');
        }, 3000);
      } else {
        await signInWithEmail(email, password);
        onSuccess();
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please sign in instead.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check your credentials and try again.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Invalid email address');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 lg:p-8 relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-600 transition-colors touch-manipulation p-2 hover:bg-slate-100 rounded-lg"
          aria-label="Close authentication modal"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="mb-4 sm:mb-6">
          {hasPendingDownload && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
                <span className="font-medium text-blue-900 text-sm sm:text-base">CV Download Ready</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">
                Sign in to download your CV and access your personal dashboard.
              </p>
            </div>
          )}
          
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            {hasPendingDownload 
              ? 'Sign in to download' 
              : mode === 'signin' ? 'Sign In' 
              : mode === 'signup' ? 'Create Account'
              : 'Reset Password'
            }
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {hasPendingDownload
              ? 'Your CV is ready! Sign in to download and access your dashboard.'
              : mode === 'signin'
              ? 'Welcome back! Sign in to access your dashboard.'
              : mode === 'signup'
              ? 'Join thousands of professionals who trust our CV builder.'
              : 'Enter your email address and we\'ll send you a link to reset your password.'}
          </p>
        </div>

        {mode !== 'reset' && (
          <>
            <div className="space-y-3 mb-4 sm:mb-6">
              <button
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-3 px-4 py-3 sm:py-4 bg-white border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base touch-manipulation min-h-[48px]"
              >
            <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="relative mb-4 sm:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 sm:px-3 bg-white text-slate-500">Or continue with email</span>
          </div>
        </div>
        </>
        )}

        <form onSubmit={handleEmailAuth} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base touch-manipulation"
              placeholder="your.email@example.com"
              required
              disabled={isLoading}
            />
          </div>

          {mode !== 'reset' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent text-base touch-manipulation"
                placeholder="••••••••"
                required
                disabled={isLoading}
                minLength={6}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-red-600">{error}</p>
            </div>
          )}

          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
              <div className="flex items-start space-x-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm text-green-700 whitespace-pre-line">{successMessage}</p>
                  <p className="text-xs text-green-600 mt-1">You can now sign in with your credentials.</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 sm:py-4 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm sm:text-base touch-manipulation min-h-[48px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>
                {mode === 'signin' ? 'Sign In' 
                : mode === 'signup' ? 'Create Account' 
                : 'Send Reset Link'}
              </span>
            )}
          </button>
        </form>

        {/* Benefits section for download intent */}
        {hasPendingDownload && (
          <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
              <span className="font-semibold text-blue-900 text-sm sm:text-base">What you get:</span>
            </div>
            <ul className="space-y-1 text-xs sm:text-sm text-blue-800">
              <li>• Instant CV download in high quality</li>
              <li>• Personal dashboard to manage all your CVs</li>
              <li>• Download history and re-download anytime</li>
              <li>• Multiple professional templates</li>
            </ul>
          </div>
        )}

        <div className="mt-3 sm:mt-4 text-center space-y-2">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin');
              setError('');
              setSuccessMessage('');
            }}
            className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 touch-manipulation py-2 px-3 rounded hover:bg-slate-50 transition-colors block w-full"
          >
            {mode === 'signin'
              ? "Don't have an account? Sign up"
              : mode === 'signup'
              ? 'Already have an account? Sign in'
              : 'Back to sign in'}
          </button>
          
          {mode === 'signin' && (
            <button
              onClick={() => {
                setMode('reset');
                setError('');
                setSuccessMessage('');
              }}
              className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 touch-manipulation py-2 px-3 rounded hover:bg-slate-50 transition-colors"
            >
              Forgot your password?
            </button>
          )}
        </div>

        {/* Professional Terms & Privacy Links */}
        {mode !== 'reset' && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-2 sm:mb-3">
              By {mode === 'signin' ? 'signing in' : 'creating an account'}, you agree to our
            </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs">
            <a 
              href="/terms" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 underline touch-manipulation py-1 px-2 rounded hover:bg-slate-50"
            >
              Terms of Service
            </a>
            <span className="text-slate-400">•</span>
            <a 
              href="/privacy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 underline touch-manipulation py-1 px-2 rounded hover:bg-slate-50"
            >
              Privacy Policy
            </a>
            <span className="text-slate-400">•</span>
            <a 
              href="/contact" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 underline touch-manipulation py-1 px-2 rounded hover:bg-slate-50"
            >
              Support
            </a>
          </div>
            <p className="text-xs text-slate-400 text-center mt-2 sm:mt-3">
              Secure authentication powered by Firebase
            </p>
          </div>
        )}
      </div>
    </div>
  );
}