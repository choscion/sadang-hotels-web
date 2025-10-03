import {getHotels} from "@remote/hotels"
import { useSuspenseInfiniteQuery, type InfiniteData} from "@tanstack/react-query"
import type {DocumentData, QueryDocumentSnapshot} from "firebase/firestore"
import {useCallback} from "react"
import type {Hotel} from "../models/hotel"

//function useHotels({onSuccess}: {onSuccess?: () => void} = {}) {
//function useHotels() {
//  const {data, isLoading, ...rest} = useSuspenseQuery({
//    queryKey: useHotels.getKey(), // 저장된 키값
//    queryFn: getHotels,
//  })

//  console.log({data});

//  // suspense는 데이터가 비어있는 경우가 x. 데이터 보장받음
//  // useSuspenseInfiniteQuery는 무한 스트롤에 용이함.

//  //useEffect(() => {
//  //  if (isLoading === false && data != null) {
//  //    onSuccess?.()
//  //  }
//  //}, [data, isLoading, onSuccess])

//  return {data, isLoading, ...rest}
//}

function useHotels() {
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useSuspenseInfiniteQuery<
    {
      hotels: Hotel[]
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>
    },
    Error,
    InfiniteData<{
      hotels: Hotel[]
      lastVisible: QueryDocumentSnapshot<DocumentData, DocumentData>
    }>,
    ReturnType<typeof useHotels.getKey>,
    QueryDocumentSnapshot<DocumentData, DocumentData> | undefined
  >({
    queryKey: useHotels.getKey(),
    queryFn: ({pageParam}) => {
      if (Math.random() < 0.5) {
        throw new Error("에러발생!")
      }

      return getHotels(pageParam)
    },
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
    initialPageParam: undefined,
  })

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const hotels = data?.pages.map(({hotels}) => hotels).flat()

  return {data: hotels, loadMore, isFetching, hasNextPage}
}

useHotels.getKey = () => ["hotels"]

export default useHotels
