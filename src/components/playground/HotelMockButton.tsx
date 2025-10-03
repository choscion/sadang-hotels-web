//import { Button } from "@choboong/ui";
import {collection, doc, writeBatch} from "firebase/firestore"
import {fireStore} from "@utils/firebase"

import {HOTEL_NAMES, IMAGES, HOTEL, ROOMS, EVENTS} from "@constants/mock"
import {COLLECTIONS} from "@constants/collection"

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function HotelMockButton() {
  const handleButtonClick = async () => {
    const batch = writeBatch(fireStore) // 한꺼번에 밀어넣는 용도. 한번의 요청으로 100개를 밀어넣는 작업

    const hotels = HOTEL_NAMES.map((name, idx) => ({
      name,
      image: IMAGES[Math.floor(Math.random() * IMAGES.length)],
      images: IMAGES,
      price: random(120_000, 500_000), // 500000 = 500_000
      starRating: random(1, 5),
      ...HOTEL,
      ...(EVENTS[idx] != null && {event: EVENTS[idx]}),
    }))

    hotels.forEach((hotel) => {
      // 컬렉션 안에 컬렉션을 만드는건가?
      const docRef = doc(collection(fireStore, COLLECTIONS.HOTELS))
      batch.set(docRef, hotel) // batch에 docRef를 hotel에 저장한다

      ROOMS.forEach((room) => {
        const subDocRef = doc(collection(docRef, COLLECTIONS.ROOMS))
        batch.set(subDocRef, room)
      })
    })

    await batch.commit()

    alert("목 데이터 추가 성공")
  }

  return (
    <button type="button" onClick={handleButtonClick}>
      호텔 리스트 목데이터 추가
    </button>
  )
}

export default HotelMockButton
