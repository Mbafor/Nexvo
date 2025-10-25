// Download Intent Service
// Manages saving and retrieving download intentions during authentication flow

import { CVData, TemplateType } from '../types/cv';
import { saveCVDownload } from '../lib/firestore';

interface DownloadIntent {
  cvData: CVData;
  templateType: TemplateType;
  timestamp: number;
  redirectPath?: string;
}

const STORAGE_KEY = 'cv_download_intent';
const EXPIRY_TIME = 30 * 60 * 1000; // 30 minutes

export const downloadIntentService = {
  /**
   * Save download intent to localStorage
   */
  saveIntent: (cvData: CVData, templateType: TemplateType, redirectPath?: string): void => {
    const intent: DownloadIntent = {
      cvData,
      templateType,
      timestamp: Date.now(),
      redirectPath
    };
    
    try {
      console.log('💾 Saving download intent...');
      console.log('📄 CV Name:', cvData.personalInfo.fullName);
      console.log('📧 CV Email:', cvData.personalInfo.email);
      console.log('🎨 Template:', templateType);
      console.log('📍 Redirect Path:', redirectPath);
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(intent));
      console.log('✅ Download intent saved successfully');
    } catch (error) {
      console.error('❌ Failed to save download intent:', error);
    }
  },

  /**
   * Retrieve and validate download intent from localStorage
   */
  getIntent: (): DownloadIntent | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;

      const intent: DownloadIntent = JSON.parse(stored);
      
      // Check if intent has expired
      if (Date.now() - intent.timestamp > EXPIRY_TIME) {
        console.log('⏰ Download intent expired, clearing...');
        downloadIntentService.clearIntent();
        return null;
      }

      console.log('✅ Retrieved valid download intent:', { 
        templateType: intent.templateType, 
        age: Math.round((Date.now() - intent.timestamp) / 1000) + 's'
      });
      
      return intent;
    } catch (error) {
      console.error('❌ Failed to retrieve download intent:', error);
      downloadIntentService.clearIntent();
      return null;
    }
  },

  /**
   * Clear download intent from localStorage
   */
  clearIntent: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🗑️ Download intent cleared');
    } catch (error) {
      console.error('❌ Failed to clear download intent:', error);
    }
  },

  /**
   * Check if there's a pending download intent
   */
  hasPendingIntent: (): boolean => {
    return downloadIntentService.getIntent() !== null;
  },

  /**
   * Execute pending download intent and clear it
   * Also saves CV to dashboard for new users
   */
  executePendingIntent: async (
    executeDownload: (cvData: CVData, templateType: TemplateType) => Promise<void>,
    userId?: string,
    userEmail?: string
  ): Promise<{ executed: boolean; redirectPath?: string; savedToDashboard?: boolean }> => {
    const intent = downloadIntentService.getIntent();
    
    console.log('🔍 Checking for pending download intent...');
    console.log('📝 Intent found:', intent ? 'Yes' : 'No');
    console.log('👤 User ID:', userId);
    console.log('📧 User Email:', userEmail);
    
    if (!intent) {
      console.log('❌ No pending intent found');
      return { executed: false };
    }

    try {
      console.log('🚀 Executing pending download intent...');
      
      // Save CV to dashboard first if user info is provided
      let savedToDashboard = false;
      if (userId && userEmail) {
        try {
          console.log('💾 Auto-saving CV to dashboard...');
          console.log('📄 CV Data:', intent.cvData.personalInfo);
          console.log('🎨 Template:', intent.templateType);
          
          await saveCVDownload(userId, userEmail, intent.cvData, intent.templateType);
          savedToDashboard = true;
          console.log('✅ CV auto-saved to dashboard successfully');
        } catch (error) {
          console.error('❌ Failed to auto-save CV to dashboard:', error);
          // Continue with download even if dashboard save fails
        }
      } else {
        console.log('⚠️ Missing user info - cannot save to dashboard');
      }
      
      // Execute the download
      await executeDownload(intent.cvData, intent.templateType);
      
      const redirectPath = intent.redirectPath;
      downloadIntentService.clearIntent();
      
      console.log('✅ Pending download executed successfully');
      return { executed: true, redirectPath, savedToDashboard };
    } catch (error) {
      console.error('❌ Failed to execute pending download:', error);
      // Don't clear intent on failure, allow retry
      return { executed: false };
    }
  }
};