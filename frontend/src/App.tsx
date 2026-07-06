import { BrowserRouter, Route, Routes } from "react-router";
import { AuthProvider } from "./context/auth/AuthProvider";
import { SignInPage } from "./pages/SignInPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
