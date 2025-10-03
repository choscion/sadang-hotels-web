import useHotels from "@hooks/usehotels"
import withAsyncBoundary from "../../hocs/withAsyncBoundary"

import {Text, ListRow, Skeleton, Flex, Image} from "@choboong/ui"
import InfiniteScroll from "react-infinite-scroll-component"

function HotelList() {
  //const {data, isLoading} = useHotels({
  //  onSuccess: () => {
  //    console.log("request log...")
  //  },
  //})
  const {data, hasNextPage, loadMore} = useHotels()

  console.log("data ", data)

  return (
    <InfiniteScroll
      dataLength={data.length}
      hasMore={hasNextPage}
      loader={<HotelListSkeleton size={3} />}
      next={loadMore}
      scrollThreshold="100px"
    >
      <ul>
        {data.map((hotel) => {
          return (
            <ListRow
              key={hotel.id}
              left={<Image src={hotel.image} width={40} height={40} radius={20} />}
              contents={<ListRow.Texts title={hotel.name} subTitle={hotel.comment} />}
              right={<Text size="t6">{hotel.price}</Text>}
            />
          )
        })}
      </ul>
    </InfiniteScroll>
  )
}

function HotelListSkeleton({size = 20}: {size?: number}) {
  // map함수 index를 key값에 사용 안하는것이 좋다. 리스트가 바뀔 수 있으니. 위 ListRow 참고
  return new Array(size).fill(0).map((_, index) => {
    return (
      <ListRow
        key={index}
        left={<Skeleton width={40} height={40} radius={20} />}
        contents={
          <ListRow.Texts
            title={<Skeleton width={198} height={22} style={{marginBottom: 4}} />}
            subTitle={<Skeleton width={170} height={19} />}
          />
        }
        right={
          <Flex direction="column">
            <Skeleton width={50} height={22} />
          </Flex>
        }
      />
    )
  })
}

export default withAsyncBoundary(HotelList, {
  rejectedFallback: () => <Text color="adaptiveRed300">에러</Text>,
  pendingFallback: <HotelListSkeleton />,
})
