import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp, orderBy, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { CVData, TemplateType } from '../types/cv';

export interface CVDownload {
  id?: string; // optional, since Firestore doc ID is not in the doc itself
  userId: string;
  email: string;
  cvData: CVData;
  templateType: TemplateType;
  createdAt: Timestamp;
  downloadedAt: Timestamp;
}

export interface CVDownloadRecord {
  id: string;
  cvData: CVData;
  templateType: TemplateType;
  downloadedAt: Date;
  fileName: string;
}

export interface CVDraft {
  id?: string;
  userId: string;
  email: string;
  cvData: CVData;
  lastModified: Timestamp;
  createdAt: Timestamp;
  isDraft: boolean;
}

// Save a CV download record
export const saveCVDownload = async (
  userId: string,
  email: string,
  cvData: CVData,
  templateType: TemplateType
): Promise<string> => {
  console.log('🔥 Firestore: Saving CV download...');
  console.log('👤 User ID:', userId);
  console.log('📧 Email:', email);
  console.log('📄 CV Name:', cvData.personalInfo.fullName);
  console.log('🎨 Template:', templateType);
  
  try {
    const cvDownload: Omit<CVDownload, 'id'> = {
      userId,
      email,
      cvData,
      templateType,
      createdAt: Timestamp.now(),
      downloadedAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, 'cv_downloads'), cvDownload);
    console.log('✅ Firestore: CV saved successfully with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Firestore: Failed to save CV:', error);
    throw error;
  }
};

// Get all CV downloads for a user
export const getUserCVs = async (userId: string): Promise<CVDownload[]> => {
  const q = query(collection(db, 'cv_downloads'), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as CVDownload[];
};

// Get user CV downloads formatted for dashboard
export const getUserCVDownloads = async (userId: string): Promise<CVDownloadRecord[]> => {
  console.log('🔥 Firestore: Getting CV downloads for user:', userId);
  
  try {
    const q = query(
      collection(db, 'cv_downloads'), 
      where('userId', '==', userId),
      orderBy('downloadedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    console.log('📊 Firestore: Found', querySnapshot.docs.length, 'CV records');

    const results = querySnapshot.docs.map((docSnap) => {
      const data = docSnap.data() as Omit<CVDownload, 'id'>;
      const fileName = `${data.cvData.personalInfo.fullName?.replace(/\s+/g, '_') || 'CV'}_${data.templateType}.pdf`;
      
      return {
        id: docSnap.id,
        cvData: data.cvData,
        templateType: data.templateType,
        downloadedAt: data.downloadedAt.toDate(),
        fileName
      };
    });
    
    console.log('✅ Firestore: CV downloads processed successfully');
    return results;
  } catch (error) {
    console.error('❌ Firestore: Failed to get CV downloads:', error);
    throw error;
  }
};

// Delete a CV download record
export const deleteCVDownload = async (downloadId: string): Promise<void> => {
  await deleteDoc(doc(db, 'cv_downloads', downloadId));
};

// Save or update a CV draft (auto-save functionality)
export const saveCVDraft = async (
  userId: string,
  email: string,
  cvData: CVData
): Promise<string> => {
  console.log('🔥 Firestore: Auto-saving CV draft...');
  console.log('👤 User ID:', userId);
  console.log('📧 Email:', email);
  console.log('📄 CV Name:', cvData.personalInfo.fullName);
  
  try {
    // Use a consistent document ID based on user ID for automatic overwriting
    const draftId = `draft_${userId}`;
    const draftRef = doc(db, 'cv_drafts', draftId);
    
    const cvDraft: Omit<CVDraft, 'id'> = {
      userId,
      email,
      cvData,
      lastModified: Timestamp.now(),
      createdAt: Timestamp.now(),
      isDraft: true,
    };

    await setDoc(draftRef, cvDraft, { merge: true });
    console.log('✅ Firestore: CV draft auto-saved successfully');
    return draftId;
  } catch (error) {
    console.error('❌ Firestore: Failed to auto-save CV draft:', error);
    throw error;
  }
};

// Get user's current CV draft
export const getUserCVDraft = async (userId: string): Promise<CVDraft | null> => {
  console.log('🔥 Firestore: Getting CV draft for user:', userId);
  
  try {
    const draftId = `draft_${userId}`;
    const q = query(
      collection(db, 'cv_drafts'), 
      where('userId', '==', userId),
      orderBy('lastModified', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      console.log('📄 Firestore: No CV draft found for user');
      return null;
    }
    
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data() as Omit<CVDraft, 'id'>;
    
    console.log('✅ Firestore: CV draft found, last modified:', data.lastModified.toDate());
    return {
      id: docSnap.id,
      ...data
    };
  } catch (error) {
    console.error('❌ Firestore: Failed to get CV draft:', error);
    return null;
  }
};

// Delete user's CV draft
export const deleteCVDraft = async (userId: string): Promise<void> => {
  const draftId = `draft_${userId}`;
  await deleteDoc(doc(db, 'cv_drafts', draftId));
};
