"use client"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import ms from "ms"
import {isDev} from "@utils/env"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: ms("5s"),
    },
  },
})

function Provider({children}: {children: React.ReactNode}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {isDev ? <ReactQueryDevtools /> : null}
    </QueryClientProvider>
  )
}

export default Provider
