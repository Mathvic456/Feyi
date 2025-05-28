import { useState } from "react";
import AuthPage from "./components/AuthPage";
import MainPage from "./components/MainPage";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {!isAuthenticated ? (
        <AuthPage onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <MainPage />
      )}
    </>
  );
}