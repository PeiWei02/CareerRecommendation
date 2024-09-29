import { Screen } from "@/platform/customComponents/screen/Screen";
import { SurveyLandingListItem } from "../component/SurveyLandingListItem";
import { surveyAsset } from "../asset";

export const SurveyLandingScreen = () => {
  return (
    <Screen>
      <div className="text-3xl font-semibold mb-6">
        Explore Your Career Path Surveys
      </div>
      <div className="flex flex-col pt-2 gap-6 justify-center items-center">
        <SurveyLandingListItem
          title="Holland 6"
          description="Discover your career interests based on Holland's six personality types and find professions that align with your strengths."
          animation={surveyAsset.Holland6}
          link="/holland6"
        />
        <SurveyLandingListItem
          title="The Vark"
          description="Understand your learning preferences with the VARK model to enhance your study or work productivity."
          animation={surveyAsset.TheVark}
          link="/theVark"
        />
        <SurveyLandingListItem
          title="Myers-Briggs Type Indicator (MBTI)"
          description="Explore your personality type with the Myers-Briggs Type Indicator and unlock insights into your career and interpersonal strengths."
          animation={surveyAsset.MBTI}
          link="/commingSoon"
        />
      </div>
    </Screen>
  );
};
