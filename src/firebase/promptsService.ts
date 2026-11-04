import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './config';
import { SavedPrompt } from '../types/prompt';

const COLLECTION_NAME = 'prompts';

export async function fetchPromptsFromCloud(): Promise<SavedPrompt[]> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc'),
      limit(100)
    );
    const snapshot = await getDocs(q);
    const results: SavedPrompt[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      results.push({
        id: docSnap.id,
        title: data.title || 'Untitled Prompt',
        category: data.category || 'website-app',
        targetAi: data.targetAi || 'ChatGPT / Claude',
        content: data.content || '',
        enhancedContent: data.enhancedContent,
        qualityScore: data.qualityScore || 0,
        tags: data.tags || [],
        createdAt: data.createdAt || Date.now(),
        isFavorite: !!data.isFavorite
      });
    });
    return results;
  } catch (error) {
    console.error('Failed to fetch prompts from Cloud Firestore:', error);
    return [];
  }
}

export async function savePromptToCloud(prompt: SavedPrompt): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, prompt.id);
    await setDoc(
      docRef,
      {
        id: prompt.id,
        title: prompt.title,
        category: prompt.category,
        targetAi: prompt.targetAi,
        content: prompt.content,
        enhancedContent: prompt.enhancedContent || null,
        qualityScore: prompt.qualityScore,
        tags: prompt.tags || [],
        isFavorite: prompt.isFavorite,
        isPublic: true,
        createdAt: prompt.createdAt,
        updatedAt: Date.now()
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('Failed to save prompt to Cloud Firestore:', error);
    return false;
  }
}

export async function deletePromptFromCloud(promptId: string): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, promptId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error('Failed to delete prompt from Cloud Firestore:', error);
    return false;
  }
}

export async function getPromptFromCloud(promptId: string): Promise<SavedPrompt | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, promptId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || 'Untitled Prompt',
        category: data.category || 'website-app',
        targetAi: data.targetAi || 'ChatGPT / Claude',
        content: data.content || '',
        enhancedContent: data.enhancedContent,
        qualityScore: data.qualityScore || 0,
        tags: data.tags || [],
        createdAt: data.createdAt || Date.now(),
        isFavorite: !!data.isFavorite
      };
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve prompt by id:', error);
    return null;
  }
}
