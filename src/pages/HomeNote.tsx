import useHotels from "@hooks/useHotels"

// react query, context, provider, consumer
function HomePage() {
  //useEffect(() => {
  //}, []) // 최초 마운트 될 때만, 보통 api 연동할떄 빈 개열로 ㄱㄱ함

  const {data, isLoading} = useHotels({
    onSuccess: () => {
      console.log("????")
    },
  })
  console.log({data})

  // promise, async/await, callback
  return <div>Home</div>
}

export default HomePage
