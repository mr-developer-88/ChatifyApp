import React, { useEffect, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router";
const ChatPage = lazy(() => import("./pages/ChatPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
import { useAuthStore } from "./store/useAuthStore";
import PageLoader from "./components/PageLoader";
import {Toaster} from "react-hot-toast"

function App() {
  const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth) return <PageLoader />
  return (
    <div className="min-h-screen bg-base-300 relative text-base-content overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(var(--b3)/0.1)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--b3)/0.1)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary opacity-10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-secondary opacity-10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full h-screen">

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
          <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />}/>
        </Routes>
      </Suspense>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
