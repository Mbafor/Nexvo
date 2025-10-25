import { collection, addDoc, query, where, getDocs, deleteDoc, doc, Timestamp, orderBy } from 'firebase/firestore';
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
