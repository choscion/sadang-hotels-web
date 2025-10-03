import {BrowserRouter, Routes, Route} from "react-router-dom"

import HomePage from "@pages/Home"
import PlaygroundPage from "@pages/Playground"
import QueryClientProvider from "./contexts/QueryClientProvider"

function App() {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App
