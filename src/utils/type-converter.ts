import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

//  Create a Firestore data converter for a specific data type.
export function firestoreConverter<T extends DocumentData>() {
  return {
    //  Converts data of type T to Firestore format.
    toFirestore(data: T): DocumentData {
      return data;
    },

    //  Converts Firestore snapshot data to the specified data type T.
    fromFirestore(snapshot: QueryDocumentSnapshot<DocumentData>): T {
      return snapshot.data() as T;
    },
  };
}
