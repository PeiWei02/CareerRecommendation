import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/modules/authentication/domain/useCase/useAuth';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import Lottie from 'lottie-react';
import { History } from 'lucide-react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useTheVarkResults } from '../../domain/useCase/useTheVarkResults';
import { theVarkAsset } from '../asset';
import { TheVarkResultListItem } from '../component/TheVarkResultListItem';

export const TheVarkInformationScreen = () => {
    const { user } = useContext(AuthContext);
    const { _id: userId } = user;

    const { data, isSuccess, isFetching } = useTheVarkResults(userId);

    const latestAttemptId = isSuccess ? data[0]?._id : null;

    if (isFetching) {
        return (
            <Screen>
                <LoadingModal />
            </Screen>
        );
    }

    return (
        <Screen>
            <div className="flex flex-row p-8">
                <div
                    className={`flex flex-col ${
                        isSuccess && data.length > 0 ? 'w-4/5' : 'w-full'
                    } items-center space-y-4`}
                >
                    <div className="space-y-5">
                        <h2 className="text-4xl font-bold tracking-tight text-center">The VARK Learning Styles</h2>
                        <p className="px-32 text-muted-foreground text-center">
                            The VARK model categorizes learning preferences into four styles: Visual, Auditory,
                            Reading/Writing, and Kinesthetic. Understanding your learning style can help you adopt
                            effective study strategies and improve your educational experience.
                        </p>
                    </div>
                    <Lottie
                        animationData={theVarkAsset.theVarkLanding}
                        style={{ width: 450, height: 450 }}
                    />
                    <Link to="/theVark/question">
                        <Button>Take Test</Button>
                    </Link>
                </div>

                {isSuccess && data.length > 0 && (
                    <Card className="flex flex-col w-1/5 h-full">
                        <CardHeader>
                            <CardTitle className="flex flex-row space-x-1 items-center text-xl">
                                <History size={24} />
                                <p>Attempts history</p>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {data.map((item) => (
                                <TheVarkResultListItem
                                    key={item._id}
                                    item={item}
                                    latestAttemptId={latestAttemptId}
                                />
                            ))}
                        </CardContent>
                    </Card>
                )}
            </div>
        </Screen>
    );
};
