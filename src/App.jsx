import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Welcome from "./components/welcome";
import Cozy from "./components/cozy";
import { FaCircleArrowRight } from "react-icons/fa6";

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function PublicPage() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-slate-300">
      <div className='grid grid-cols-2 lg:w-[50%] md:w-[70%] w-[80%] lg:h-[50%] h-[40%] border border-slate-200 shadow-lg bg-white rounded-3xl'>
        <div className='bg-gradient-to-r from-purple-100 to-white flex justify-center items-center rounded-l-3xl'>
          <Welcome />
        </div>
        <div className="text-center flex flex-col justify-center items-center gap-2">
          <p className="font-extrabold text-transparent lg:text-9xl md:text-5xl text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-600">
            Cozy
          </p>
          <i className='text-slate-400'>Your productive buddy</i>
          <a href="/app" className="flex justify-center items-center gap-2 border shadow-md py-2 px-4 rounded-3xl lg:text-2xl text-xl hover:bg-slate-100 mt-8">
            Launch <FaCircleArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}

function ProtectedPage() {
  return (
    <>
      <Cozy />
    </>
  );
}

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route
          path="/sign-in/*"
          element={<SignIn routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp routing="path" path="/sign-up" />}
        />
        <Route
          path="/app"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
