import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageLayout from "./pages/PageLayout"
import PageSignin from "./pages/PageSignin"
import PageUsers from "./pages/PageUsers"
import PageEmployees from "./pages/PageEmployees"
import PagePayrolls from "./pages/PagePayrolls"


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout/>}>
            <Route index element={<PageSignin/>}></Route>
            <Route path="/users" element={<PageUsers />} />
            <Route path="/employees" element={<PageEmployees />} />
            <Route path="/payrolls" element={<PagePayrolls />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
