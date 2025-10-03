import {Text} from "@choboong/ui"
import HotelList from "@components/home/HotelList"

function HomePage() {
  return (
    <>
      {/* 로딩 반응 x -> useSuspenseQuery */}
      {/*<ErrorBoundary fallback={() => <Text>에러</Text>}>
        <Suspense fallback={<Text>Loading....</Text>}>
          <HotelList />
        </Suspense>
      </ErrorBoundary>*/}
      <HotelList />
      <Text style={{height: 300, backgroundColor: "#ccc"}}>Footer</Text>
    </>
  )
}

export default HomePage

{
  /*

  return (
    <Text size="t2" color="adaptiveRed400">
      A
    </Text>
  )
}

function B() {
  throw new Error("B error deth")
  return <Text>B</Text>
}

function C() {
  return (
    <Text size="t2" color="adaptiveGrey50">
      C
    </Text>
  )
}
  <ErrorBoundary fallback={() => <Text>A 에러 발생</Text>}>
        <A />
      </ErrorBoundary>
      <ErrorBoundary
        fallback={() => (
          <Text size="t2" color="adaptiveGrey50">
            B 에러 발생
          </Text>
        )}
      >
        <B />
      </ErrorBoundary>
      <ErrorBoundary fallback={() => <Text>C 에러 발생</Text>}>
        <C />
      </ErrorBoundary>
      */
}
