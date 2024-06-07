import { Route, Routes } from "react-router-dom";
import Header from "./layout/header.jsx";
import Login from "./pages/authentication/Login.jsx";
import SignUp from "./pages/authentication/SignUp.jsx";
import Profile from "./pages/profile/Profile";
import Survey from "./pages/survey/Survey.jsx";
import Question from "./pages/survey/components/Question.jsx";
import Result from "./pages/survey/components/Result.jsx";
import ProtectedRoute from "./api/authentication/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/" element={<>hero</>} />

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
        <Route path="/job" element={<ProtectedRoute element={<>job</>} />} />
      </Routes>
    </>
  );
}

export default App;
