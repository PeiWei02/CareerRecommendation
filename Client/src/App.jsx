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
import { TheVarkQuestionnaireScreen } from "./modules/theVark/view/screen/TheVarkQuestionnaireScreen.jsx";
import { TheVarkResultScreen } from "./modules/theVark/view/screen/TheVarkResultScreen.jsx";
import { SurveyLandingScreen } from "./modules/survey/view/screen/SurveyLandingScreen.jsx";

function App() {
  return (
    <>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/commingSoon" element={<CommingSoon />} />

        <Route
          path="/survey"
          element={<ProtectedRoute element={<SurveyLandingScreen />} />}
        />
        <Route
          path="/holland6"
          element={<ProtectedRoute element={<Survey />} />}
        />
        <Route
          path="/holland6/question"
          element={<ProtectedRoute element={<Question />} />}
        />
        <Route
          path="/holland6/result"
          element={<ProtectedRoute element={<Result />} />}
        />
        <Route
          path="/theVark"
          element={<ProtectedRoute element={<TheVarkQuestionnaireScreen />} />}
        />
        <Route
          path="/theVark/result"
          element={<ProtectedRoute element={<TheVarkResultScreen />} />}
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
