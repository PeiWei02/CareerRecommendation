import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./api/authentication/ProtectedRoute.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import Header from "./layout/header.jsx";
import Login from "./pages/authentication/Login.jsx";
import SignUp from "./pages/authentication/SignUp.jsx";
import Landing from "./pages/landing/Landing.jsx";
import Profile from "./pages/profile/Profile";
import Survey from "./pages/survey/Survey.jsx";
import Question from "./pages/survey/components/Question.jsx";
import Result from "./pages/survey/components/Result.jsx";
import CommingSoon from "./pages/commingSoon/CommingSoon.jsx";
import Job from "./pages/job/Job.jsx";
import { ForgotPassword } from "./pages/authentication/ForgotPassword.jsx";
import ResetPassword from "./pages/authentication/ResetPassword.jsx";
import ResetEmail from "./pages/authentication/ResetEmail.jsx";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot_password" element={<ForgotPassword />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/reset_email" element={<ResetEmail />} />

        <Route path="/" element={<Landing />} />

        <Route
          path="/survey"
          element={<ProtectedRoute element={<Survey />} />}
        />
        <Route
          path="/survey/question"
          element={<ProtectedRoute element={<Question />} />}
        />
        <Route
          path="/survey/result"
          element={<ProtectedRoute element={<Result />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route
          path="/setting"
          element={<ProtectedRoute element={<>Setting</>} />}
        />
        <Route path="/job" element={<ProtectedRoute element={<Job />} />} />
      </Routes>
    </>
  );
}

export default App;
