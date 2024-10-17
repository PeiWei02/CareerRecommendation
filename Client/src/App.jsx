import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./api/authentication/ProtectedRoute.jsx";
import { Toaster } from "./components/ui/toaster.jsx";
import Header from "./layout/header.jsx";
import Login from "./pages/authentication/Login.jsx";
import SignUp from "./pages/authentication/SignUp.jsx";
import Landing from "./pages/landing/Landing.jsx";
import Profile from "./pages/profile/Profile";
import CommingSoon from "./pages/commingSoon/CommingSoon.jsx";
import Job from "./pages/job/Job.jsx";
import { TheVarkQuestionnaireScreen } from "./modules/theVark/view/screen/TheVarkQuestionnaireScreen.jsx";
import { TheVarkResultScreen } from "./modules/theVark/view/screen/TheVarkResultScreen.jsx";
import { SurveyLandingScreen } from "./modules/survey/view/screen/SurveyLandingScreen.jsx";
import { MBTIQuestionnaireScreen } from "./modules/mbti/view/screen/MBTIQuestionnaireScreen.jsx";
import { MBTIResultScreen } from "./modules/mbti/view/screen/MBTIResultScreen.jsx";
import { Holland6QuestionnaireScreen } from "./modules/holland6/view/screen/Holland6QuestionnaireScreen.jsx";
import { Holland6ResultScreen } from "./modules/holland6/view/screen/Holland6ResultScreen.jsx";
import { Holland6InformationScreen } from "./modules/holland6/view/screen/Holland6InformationScreen.jsx";

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
          element={<ProtectedRoute element={<Holland6InformationScreen />} />}
        />
        <Route
          path="/holland6/question"
          element={<ProtectedRoute element={<Holland6QuestionnaireScreen />} />}
        />
        <Route
          path="/holland6/result"
          element={<ProtectedRoute element={<Holland6ResultScreen />} />}
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
          path="/mbti/question"
          element={<ProtectedRoute element={<MBTIQuestionnaireScreen />} />}
        />

        <Route
          path="/mbti/result"
          element={<ProtectedRoute element={<MBTIResultScreen />} />}
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
