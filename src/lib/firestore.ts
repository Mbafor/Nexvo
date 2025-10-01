import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
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

// Save a CV download record
export const saveCVDownload = async (
  userId: string,
  email: string,
  cvData: CVData,
  templateType: TemplateType
): Promise<string> => {
  const cvDownload: Omit<CVDownload, 'id'> = {
    userId,
    email,
    cvData,
    templateType,
    createdAt: Timestamp.now(),
    downloadedAt: Timestamp.now(),
  };

  const docRef = await addDoc(collection(db, 'cv_downloads'), cvDownload);
  return docRef.id;
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
