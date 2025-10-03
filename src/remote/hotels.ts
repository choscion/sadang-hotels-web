import {COLLECTIONS} from "@constants/collection"
import {fireStore} from "@utils/firebase"
import {collection, getDocs, limit, query, QueryDocumentSnapshot, startAfter, type DocumentData} from "firebase/firestore"
import type { Hotel } from "../models/hotel";

export async function getHotels(
  pageParams?: QueryDocumentSnapshot<DocumentData, DocumentData>
) {
  const hotelQuery =
    pageParams == null
      ? query(collection(fireStore, COLLECTIONS.HOTELS), limit(10))
      : query(
          collection(fireStore, COLLECTIONS.HOTELS),
          startAfter(pageParams),
          limit(15)
        );

  const snapshot = await getDocs(hotelQuery);

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const hotels = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Hotel;
  });

  return { hotels, lastVisible };
}
