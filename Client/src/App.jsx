import { Route, Routes } from 'react-router-dom';
import { Toaster } from './components/ui/toaster.jsx';
import { Header } from './layout/header.jsx';
import { AnalyticsLandingScreen } from './modules/analytics/view/screen/AnalyticsLandingScreen.jsx';
import { ProtectedRoute } from './modules/authentication/view/component/ProtectedRoute.jsx';
import { LoginScreen } from './modules/authentication/view/screen/LoginScreen.jsx';
import { SignUpScreen } from './modules/authentication/view/screen/SignUpScreen.jsx';
import { Holland6InformationScreen } from './modules/holland6/view/screen/Holland6InformationScreen.jsx';
import { Holland6QuestionnaireScreen } from './modules/holland6/view/screen/Holland6QuestionnaireScreen.jsx';
import { Holland6ResultScreen } from './modules/holland6/view/screen/Holland6ResultScreen.jsx';
import { CreateJobScreen } from './modules/jobManagement/view/screen/CreateJobScreen.jsx';
import { UpdateJobScreen } from './modules/jobManagement/view/screen/UpdateJobScreen.jsx';
import { ViewJobScreen } from './modules/jobManagement/view/screen/ViewJobScreen.jsx';
import { MBTIInformationScreen } from './modules/mbti/view/screen/MBTIInformationScreen.jsx';
import { MBTIQuestionnaireScreen } from './modules/mbti/view/screen/MBTIQuestionnaireScreen.jsx';
import { MBTIResultScreen } from './modules/mbti/view/screen/MBTIResultScreen.jsx';
import { ProfileLandingScreen } from './modules/profile/view/screen/ProfileLandingScreen.jsx';
import { SurveyAllCompletedScreen } from './modules/survey/view/screen/SurveyAllCompletedScreen.jsx';
import { SurveyLandingScreen } from './modules/survey/view/screen/SurveyLandingScreen.jsx';
import { TheVarkInformationScreen } from './modules/theVark/view/screen/TheVarkInformationScreen.jsx';
import { TheVarkQuestionnaireScreen } from './modules/theVark/view/screen/TheVarkQuestionnaireScreen.jsx';
import { TheVarkResultScreen } from './modules/theVark/view/screen/TheVarkResultScreen.jsx';
import { UserManagementAnalyticScreen } from './modules/userManagement/view/screen/UserManagementAnalyticsScreen.jsx';
import { UserManagementLandingScreen } from './modules/userManagement/view/screen/UserManagementLandingScreen.jsx';
import CommingSoon from './pages/commingSoon/CommingSoon.jsx';
import Landing from './pages/landing/Landing.jsx';

function App() {
    return (
        <>
            <Header />
            <Toaster />
            <Routes>
                <Route
                    path="/"
                    element={<Landing />}
                />
                <Route
                    path="/login"
                    element={<LoginScreen />}
                />
                <Route
                    path="/signup"
                    element={<SignUpScreen />}
                />
                <Route
                    path="/commingSoon"
                    element={<CommingSoon />}
                />

                <Route
                    path="/survey"
                    element={<ProtectedRoute element={<SurveyLandingScreen />} />}
                />
                <Route
                    path="/survey/comprehensiveResult"
                    element={<ProtectedRoute element={<SurveyAllCompletedScreen />} />}
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
                    element={<ProtectedRoute element={<TheVarkInformationScreen />} />}
                />
                <Route
                    path="/theVark/question"
                    element={<ProtectedRoute element={<TheVarkQuestionnaireScreen />} />}
                />
                <Route
                    path="/theVark/result"
                    element={<ProtectedRoute element={<TheVarkResultScreen />} />}
                />
                <Route
                    path="/mbti"
                    element={<ProtectedRoute element={<MBTIInformationScreen />} />}
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
                    element={<ProtectedRoute element={<ProfileLandingScreen />} />}
                />

                <Route
                    path="/setting"
                    element={<ProtectedRoute element={<>Setting</>} />}
                />

                <Route
                    path="/userManagement"
                    element={<ProtectedRoute element={<UserManagementLandingScreen />} />}
                />
                <Route
                    path="/userManagement/individualAnalytics"
                    element={<ProtectedRoute element={<UserManagementAnalyticScreen />} />}
                />

                <Route
                    path="/job"
                    element={<ProtectedRoute element={<ViewJobScreen />} />}
                />

                <Route
                    path="/jobManagement/createJob"
                    element={<ProtectedRoute element={<CreateJobScreen />} />}
                />

                <Route
                    path="/jobManagement/updateJob"
                    element={<ProtectedRoute element={<UpdateJobScreen />} />}
                />

                <Route
                    path="/analytics"
                    element={<ProtectedRoute element={<AnalyticsLandingScreen />} />}
                />
            </Routes>
        </>
    );
}

export default App;
