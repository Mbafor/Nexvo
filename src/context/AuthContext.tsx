import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  AuthError,
} from 'firebase/auth';
import {
  auth,
  googleProvider,
  facebookProvider,
  appleProvider,
  microsoftProvider,
} from '../lib/firebase';
import { sendWelcomeMessage } from '../utils/emailService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInWithMicrosoft: () => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔐 Auth state changed:', user ? `Signed in as ${user.email}` : 'Signed out');
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      console.log('🔗 Attempting Google sign-in...');
      const result = await signInWithPopup(auth, googleProvider);
      console.log('✅ Google sign-in successful:', result.user.email);
      
      // Send welcome message for new users
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        sendWelcomeMessage({
          email: result.user.email || '',
          fullName: result.user.displayName || 'Professional',
          signUpMethod: 'google'
        });
      }
    } catch (error) {
      console.error('❌ Google sign-in failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const signInWithFacebook = async () => {
    try {
      console.log('🔗 Attempting Facebook sign-in...');
      const result = await signInWithPopup(auth, facebookProvider);
      console.log('✅ Facebook sign-in successful:', result.user.email);
      
      // Send welcome message for new users
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        sendWelcomeMessage({
          email: result.user.email || '',
          fullName: result.user.displayName || 'Professional',
          signUpMethod: 'facebook'
        });
      }
    } catch (error) {
      console.error('❌ Facebook sign-in failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const signInWithApple = async () => {
    try {
      console.log('🔗 Attempting Apple sign-in...');
      const result = await signInWithPopup(auth, appleProvider);
      console.log('✅ Apple sign-in successful:', result.user.email);
      
      // Send welcome message for new users
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        sendWelcomeMessage({
          email: result.user.email || '',
          fullName: result.user.displayName || 'Professional',
          signUpMethod: 'apple'
        });
      }
    } catch (error) {
      console.error('❌ Apple sign-in failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      console.log('🔗 Attempting Microsoft sign-in...');
      const result = await signInWithPopup(auth, microsoftProvider);
      console.log('✅ Microsoft sign-in successful:', result.user.email);
      
      // Send welcome message for new users
      if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
        sendWelcomeMessage({
          email: result.user.email || '',
          fullName: result.user.displayName || 'Professional',
          signUpMethod: 'microsoft'
        });
      }
    } catch (error) {
      console.error('❌ Microsoft sign-in failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    try {
      console.log('📧 Attempting email sign-up for:', email);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update user profile with full name if provided
      if (fullName) {
        await updateProfile(result.user, {
          displayName: fullName
        });
        console.log('👤 User profile updated with name:', fullName);
      }
      
      // Send email verification
      await sendEmailVerification(result.user, {
        url: `${window.location.origin}/verify-email?verified=true`,
        handleCodeInApp: false
      });
      
      console.log('✅ Email sign-up successful and verification email sent:', result.user.email);
      
      // Send welcome message
      sendWelcomeMessage({
        email: result.user.email || email,
        fullName: fullName || 'Professional',
        signUpMethod: 'email'
      });
      
    } catch (error) {
      console.error('❌ Email sign-up failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      console.log('📧 Attempting email sign-in for:', email);
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Email sign-in successful:', result.user.email);
      
      // Log verification status but don't block the user
      if (!result.user.emailVerified) {
        console.warn('⚠️ User signed in with unverified email:', email);
      } else {
        console.log('✅ Email verified user signed in:', email);
      }
      
    } catch (error) {
      console.error('❌ Email sign-in failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const sendEmailVerificationToUser = async () => {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      if (auth.currentUser.emailVerified) {
        throw new Error('Email is already verified');
      }
      
      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/verify-email?verified=true`,
        handleCodeInApp: false
      });
      
      console.log('✅ Verification email sent to:', auth.currentUser.email);
      
    } catch (error) {
      console.error('❌ Failed to send verification email:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const sendPasswordReset = async (email: string) => {
    try {
      console.log('🔄 Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/`, // Redirect to home page after reset
        handleCodeInApp: false
      });
      
      console.log('✅ Password reset email sent to:', email);
      
    } catch (error) {
      console.error('❌ Failed to send password reset email:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  const signOut = async () => {
    try {
      console.log('🚪 Signing out...');
      await firebaseSignOut(auth);
      console.log('✅ Sign-out successful');
    } catch (error) {
      console.error('❌ Sign-out failed:', error);
      throw handleAuthError(error as AuthError);
    }
  };

  // Enhanced error handling for better user experience
  const handleAuthError = (error: AuthError): Error => {
    let message = 'Authentication failed. Please try again.';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'This email is already registered. Please sign in instead.';
        break;
      case 'auth/weak-password':
        message = 'Password is too weak. Please choose a stronger password.';
        break;
      case 'auth/user-not-found':
        message = 'No account found with this email. Please sign up first.';
        break;
      case 'auth/wrong-password':
        message = 'Incorrect password. Please try again.';
        break;
      case 'auth/invalid-credential':
        message = 'Invalid email or password. Please check your credentials and try again.';
        break;
      case 'auth/invalid-email':
        message = 'Invalid email address. Please check and try again.';
        break;
      case 'auth/missing-password':
        message = 'Password is required. Please enter your password.';
        break;
      case 'auth/invalid-password':
        message = 'Invalid password. Password must be at least 6 characters.';
        break;
      case 'auth/user-disabled':
        message = 'This account has been disabled. Please contact support.';
        break;
      case 'auth/operation-not-allowed':
        message = 'This sign-in method is not enabled. Please contact support.';
        break;
      case 'auth/popup-closed-by-user':
        message = 'Sign-in was cancelled. Please try again.';
        break;
      case 'auth/popup-blocked':
        message = 'Pop-up was blocked by your browser. Please allow pop-ups and try again.';
        break;
      case 'auth/cancelled-popup-request':
        message = 'Only one sign-in pop-up is allowed at a time.';
        break;
      case 'auth/network-request-failed':
        message = 'Network error. Please check your connection and try again.';
        break;
      case 'auth/too-many-requests':
        message = 'Too many failed attempts. Please try again later.';
        break;
      default:
        console.warn('Unhandled auth error code:', error.code);
        message = error.message || message;
    }
    
    return new Error(message);
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signInWithFacebook,
    signInWithApple,
    signInWithMicrosoft,
    signUpWithEmail,
    signInWithEmail,
    sendEmailVerification: sendEmailVerificationToUser,
    sendPasswordReset,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}