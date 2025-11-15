import { useState, useEffect } from 'react';
import { X, Loader2, Download, Shield, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { downloadIntentService } from '../utils/downloadIntent';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const { t } = useTranslation();
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
      setError(err.message || t('auth2.errors.generic'));
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
        setError(t('auth2.errors.email_required'));
        return;
      }

      setIsLoading(true);
      try {
        await sendPasswordReset(email);
        setSuccessMessage(t('auth2.success.reset_sent', { email }));
        setEmail('');
        // Switch back to sign-in after 3 seconds
        setTimeout(() => {
          setMode('signin');
          setSuccessMessage('');
        }, 3000);
      } catch (err: any) {
        setError(err.message || t('auth2.errors.reset_failed'));
      } finally {
        setIsLoading(false);
      }
      return;
    }

    if (!email || !password) {
      setError(t('auth2.errors.fill_all'));
      return;
    }

    if (password.length < 6) {
      setError(t('auth2.errors.password_length'));
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await signUpWithEmail(email, password);
        setSuccessMessage(t('auth2.success.account_created', { email }));
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
        setError(t('auth2.errors.email_in_use'));
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError(t('auth2.errors.invalid_credentials'));
      } else if (err.code === 'auth/invalid-email') {
        setError(t('auth2.errors.invalid_email'));
      } else if (err.code === 'auth/too-many-requests') {
        setError(t('auth2.errors.too_many_requests'));
      } else {
        setError(err.message || t('auth2.errors.generic'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Dynamic Title Helper
  const getModalTitle = () => {
    if (hasPendingDownload) return t('auth2.titles.download');
    if (mode === 'signin') return t('auth2.titles.signin');
    if (mode === 'signup') return t('auth2.titles.signup');
    return t('auth2.titles.reset');
  };

  // Dynamic Description Helper
  const getModalDescription = () => {
    if (hasPendingDownload) return t('auth2.descriptions.download'); // Fixed prefix
    if (mode === 'signin') return t('auth2.descriptions.signin');
    if (mode === 'signup') return t('auth2.descriptions.signup');
    return t('auth2.descriptions.reset');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-4 sm:p-6 lg:p-8 relative max-h-[95vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-slate-600 transition-colors touch-manipulation p-2 hover:bg-slate-100 rounded-lg"
          aria-label={t('common2.close')}
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        <div className="mb-4 sm:mb-6">
          {hasPendingDownload && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="flex items-center space-x-2">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700 flex-shrink-0" />
                {/* Fixed prefix from auth to auth2 */}
                <span className="font-medium text-blue-700 text-sm sm:text-base">{t('auth2.download_ready.title')}</span>
              </div>
              <p className="text-xs sm:text-sm text-blue-700 mt-1">
                {t('auth2.download_ready.message')}
              </p>
            </div>
          )}
          
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            {getModalTitle()}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            {getModalDescription()}
          </p>
        </div>

        <form onSubmit={handleEmailAuth} className="space-y-3 sm:space-y-4">
          <div>
            {/* Fixed prefix */}
            <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">{t('auth2.labels.email')}</label>
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
              {/* Fixed prefix */}
              <label className="block text-sm font-medium text-slate-700 mb-1 sm:mb-2">{t('auth2.labels.password')}</label>
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
                  <p className="text-xs text-green-600 mt-1">{t('auth2.success.can_signin')}</p>
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
                <span>{t('common2.processing')}</span>
              </>
            ) : (
              <span>
                {mode === 'signin' ? t('auth2.buttons.signin') 
                : mode === 'signup' ? t('auth2.buttons.signup') 
                : t('auth2.buttons.send_reset')}
              </span>
            )}
          </button>
        </form>

        {mode !== 'reset' && (
          <>
            <div className="relative mb-4 sm:mb-6 ">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                {/* Fixed prefix */}
                <span className="px-2 sm:px-3 bg-white text-slate-500 py-5">{t('auth2.or_google')}</span>
              </div>
            </div>

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
                <span>{t('auth2.continue_google')}</span>
              </button>
            </div>
          </>
        )}

        {/* Benefits section for download intent */}
        {hasPendingDownload && (
          <div className="mt-4 sm:mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2 sm:mb-3">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-700 flex-shrink-0" />
              {/* Fixed prefix */}
              <span className="font-semibold text-blue-700 text-sm sm:text-base">{t('auth2.benefits.title')}</span>
            </div>
            <ul className="space-y-1 text-xs sm:text-sm text-blue-700">
              <li>• {t('auth2.benefits.item1')}</li>
              <li>• {t('auth2.benefits.item2')}</li>
              <li>• {t('auth2.benefits.item3')}</li>
              <li>• {t('auth2.benefits.item4')}</li>
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
            className="text-xs sm:text-sm text-slate-600 hover:underline py-2 px-3 rounded block w-full"
          >
            {mode === 'signin'
              ? t('auth2.links.no_account')
              : mode === 'signup'
              ? t('auth2.links.have_account')
              : t('auth2.links.back_signin')}
          </button>
          
          {mode === 'signin' && (
            <button
              onClick={() => {
                setMode('reset');
                setError('');
                setSuccessMessage('');
              }}
              className="text-xs sm:text-sm hover:underline py-2 px-3 rounded"
            >
              {t('auth2.links.forgot_password')}
            </button>
          )}
        </div>

        {/* Professional Terms & Privacy Links */}
        {mode !== 'reset' && (
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center mb-2 sm:mb-3">
              {mode === 'signin' ? t('auth2.terms.agree_signin') : t('auth2.terms.agree_signup')}
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs">
              <a 
                href="/terms" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 underline touch-manipulation py-1 px-2 rounded hover:bg-slate-50"
              >
                {t('common2.terms')}
              </a>
              <span className="text-slate-400">•</span>
              <a 
                href="/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 underline touch-manipulation py-1 px-2 rounded hover:bg-slate-50"
              >
                {t('common2.privacy')}
              </a>
              <span className="text-slate-400">•</span>
              <a 
                href="/contact" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-slate-900 underline touch-manipulation py-1 px-2 rounded hover:bg-slate-50"
              >
                {t('common2.support')}
              </a>
            </div>
            <p className="text-xs text-slate-400 text-center mt-2 sm:mt-3">
              {t('auth2.powered_by')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}