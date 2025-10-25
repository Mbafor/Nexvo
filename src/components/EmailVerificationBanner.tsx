import { useState } from 'react';
import { Mail, AlertCircle, CheckCircle2, Loader2, X } from 'lucide-react';
import { useAuth } from '../context';

interface EmailVerificationBannerProps {
  onDismiss?: () => void;
}

export default function EmailVerificationBanner({ onDismiss }: EmailVerificationBannerProps) {
  const { user, sendEmailVerification } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [justSent, setJustSent] = useState(false);
  const [error, setError] = useState('');

  if (!user || user.emailVerified) {
    return null;
  }

  const handleResendVerification = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await sendEmailVerification();
      setJustSent(true);
      
      // Reset the "just sent" state after 30 seconds
      setTimeout(() => setJustSent(false), 30000);
    } catch (err: any) {
      setError(err.message || 'Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    setIsRefreshing(true);
    setError('');
    
    try {
      // Simply reload the page to check verification status
      window.location.reload();
    } catch (err: any) {
      setError('Failed to check verification status. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-amber-900">
              Email Verification Required
            </h3>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-amber-600 hover:text-amber-800 transition-colors p-1"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          <p className="text-sm text-amber-800 mt-1">
            Please verify your email address ({user.email}) to secure your account and access all features.
          </p>

          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {justSent && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <p className="text-sm text-green-700">
                  Verification email sent! Check your inbox and spam folder.
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={handleResendVerification}
              disabled={isLoading || justSent}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-md hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              <span>
                {isLoading ? 'Sending...' : justSent ? 'Email Sent' : 'Resend Verification'}
              </span>
            </button>

            <button
              onClick={handleCheckVerification}
              disabled={isRefreshing}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-amber-700 text-sm font-medium rounded-md border border-amber-300 hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRefreshing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <span>
                {isRefreshing ? 'Checking...' : 'I\'ve Verified'}
              </span>
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-amber-200">
            <details className="group">
              <summary className="text-xs text-amber-700 cursor-pointer hover:text-amber-900 list-none flex items-center space-x-1">
                <span>Didn't receive the email?</span>
                <span className="ml-1 group-open:rotate-90 transition-transform">▶</span>
              </summary>
              <div className="mt-2 text-xs text-amber-600 space-y-1">
                <p>• Check your spam/junk folder</p>
                <p>• Make sure {user.email} is correct</p>
                <p>• Wait a few minutes for delivery</p>
                <p>• Try resending the verification email</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}