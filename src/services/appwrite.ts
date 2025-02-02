import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Auth functions
export const createAccount = async (email: string, password: string) => {
  try {
    const response = await account.create('unique()', email, password);
    await account.createEmailSession(email, password);
    return response;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  try {
    return await account.createEmailSession(email, password);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    return await account.get();
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Resume functions
export const saveResume = async (userId: string, resumeData: any) => {
  try {
    return await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_RESUMES_COLLECTION_ID,
      'unique()',
      {
        userId,
        ...resumeData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.error('Error saving resume:', error);
    throw error;
  }
};

export const updateResume = async (resumeId: string, resumeData: any) => {
  try {
    return await databases.updateDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_RESUMES_COLLECTION_ID,
      resumeId,
      {
        ...resumeData,
        updatedAt: new Date().toISOString(),
      }
    );
  } catch (error) {
    console.error('Error updating resume:', error);
    throw error;
  }
};

export const getUserResumes = async (userId: string) => {
  try {
    return await databases.listDocuments(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_RESUMES_COLLECTION_ID,
      [
        `userId=${userId}`,
      ]
    );
  } catch (error) {
    console.error('Error getting user resumes:', error);
    throw error;
  }
};

export const deleteResume = async (resumeId: string) => {
  try {
    return await databases.deleteDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_RESUMES_COLLECTION_ID,
      resumeId
    );
  } catch (error) {
    console.error('Error deleting resume:', error);
    throw error;
  }
};

// Storage functions
export const uploadImage = async (file: File) => {
  try {
    return await storage.createFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      'unique()',
      file
    );
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (fileId: string) => {
  try {
    return await storage.deleteFile(
      import.meta.env.VITE_APPWRITE_BUCKET_ID,
      fileId
    );
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

export const getImagePreview = (fileId: string) => {
  return storage.getFilePreview(
    import.meta.env.VITE_APPWRITE_BUCKET_ID,
    fileId
  );
};