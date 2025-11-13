import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Home, User, X } from 'lucide-react';
import { useAuth } from '../context';

export default function VerificationSuccess() {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState<'checking' | 'verified' | 'already-verified' | 'error'>('checking');

  useEffect(() => {
    const checkVerification = async () => {
      const verified = searchParams.get('verified');
      
      if (verified === 'true') {
        // User was redirected here after clicking verification link
        setVerificationStatus('verified');
      } else if (user?.emailVerified) {
        setVerificationStatus('already-verified');
      } else {
        setVerificationStatus('error');
      }
      
      setIsChecking(false);
    };

    if (user !== null) {
      checkVerification();
    }
  }, [user, searchParams]);

  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Verifying your email...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {verificationStatus === 'verified' && (
            <>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Email Verified Successfully! 🎉
              </h1>
              
              <p className="text-gray-600 mb-8">
                Your email address has been verified. You now have full access to all features of your professional CV builder.
              </p>
              
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  <User className="h-5 w-5" />
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link
                  to="/"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </>
          )}

          {verificationStatus === 'already-verified' && (
            <>
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="h-8 w-8 text-blue-700" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Already Verified ✅
              </h1>
              
              <p className="text-gray-600 mb-8">
                Your email address is already verified. You have full access to all features.
              </p>
              
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                >
                  <User className="h-5 w-5" />
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link
                  to="/"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <X className="h-8 w-8 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Verification Error
              </h1>
              
              <p className="text-gray-600 mb-8">
                There was an issue verifying your email. Please try signing in to your account or request a new verification email.
              </p>
              
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link
                  to="/"
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Home className="h-5 w-5" />
                  <span>Back to Home</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}