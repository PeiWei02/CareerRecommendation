import { Screen } from '@/platform/customComponents/screen/Screen';
import { TheVarkQuestionList } from '../component/TheVarkQuestionList';

export const TheVarkQuestionnaireScreen = () => {
    return (
        <Screen>
            <div className="text-3xl font-semibold mb-6">The VARK Learning Styles</div>
            <TheVarkQuestionList />
        </Screen>
    );
};
