import { useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  DocumentData,
  Query,
  WhereFilterOp,
  OrderByDirection,
} from "firebase/firestore";
import { db } from "../utils/firebase";

interface UseFirebaseResult<T> {
  loading: boolean;
  error: Error | null;
  success: boolean;
  data: T | null;
}

export function useFirebase() {
  const [state, setState] = useState<{
    loading: boolean;
    error: Error | null;
    success: boolean;
    data: DocumentData | null;
  }>({
    loading: false,
    error: null,
    success: false,
    data: null,
  });

  // Add a document to a collection
  const addDocument = async <T extends Record<string, unknown>>(
    collectionName: string,
    data: T
  ): Promise<UseFirebaseResult<DocumentData>> => {
    setState({ loading: true, error: null, success: false, data: null });

    try {
      const docRef = await addDoc(collection(db, collectionName), {
        ...data,
        createdAt: serverTimestamp(),
      });

      const result = { id: docRef.id, ...data };
      setState({ loading: false, error: null, success: true, data: result });
      return { loading: false, error: null, success: true, data: result };
    } catch (error) {
      const firebaseError = error as Error;
      console.error(
        `Error adding document to ${collectionName}:`,
        firebaseError
      );
      setState({
        loading: false,
        error: firebaseError,
        success: false,
        data: null,
      });
      return {
        loading: false,
        error: firebaseError,
        success: false,
        data: null,
      };
    }
  };

  // Get documents from a collection with optional query
  const getDocuments = async <T>(
    collectionName: string,
    options?: {
      whereField?: string;
      whereOperator?: WhereFilterOp;
      whereValue?: unknown;
      orderByField?: string;
      orderDirection?: OrderByDirection;
      limitCount?: number;
    }
  ): Promise<UseFirebaseResult<T[]>> => {
    setState({ loading: true, error: null, success: false, data: null });

    try {
      const collectionRef = collection(db, collectionName);
      let queryRef: Query<DocumentData> = collectionRef;

      if (options) {
        const constraints = [];

        if (
          options.whereField &&
          options.whereOperator &&
          options.whereValue !== undefined
        ) {
          constraints.push(
            where(options.whereField, options.whereOperator, options.whereValue)
          );
        }

        if (options.orderByField) {
          constraints.push(
            orderBy(options.orderByField, options.orderDirection || "asc")
          );
        }

        if (options.limitCount) {
          constraints.push(limit(options.limitCount));
        }

        if (constraints.length > 0) {
          queryRef = query(collectionRef, ...constraints);
        }
      }

      const querySnapshot = await getDocs(queryRef);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      setState({ loading: false, error: null, success: true, data: documents });
      return { loading: false, error: null, success: true, data: documents };
    } catch (error) {
      const firebaseError = error as Error;
      console.error(
        `Error getting documents from ${collectionName}:`,
        firebaseError
      );
      setState({
        loading: false,
        error: firebaseError,
        success: false,
        data: null,
      });
      return {
        loading: false,
        error: firebaseError,
        success: false,
        data: null,
      };
    }
  };

  // Specific function for contact requests
  const addContactRequest = async (formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    message: string;
  }) => {
    return addDocument("contact_requests", formData);
  };

  return {
    ...state,
    addDocument,
    getDocuments,
    addContactRequest,
  };
}
