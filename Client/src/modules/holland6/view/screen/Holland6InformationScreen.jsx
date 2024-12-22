import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import Lottie from 'lottie-react';
import { History } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useHolland6Results } from '../../domain/useCase/useHolland6Results';
import { holland6Asset } from '../asset';

export const Holland6InformationScreen = () => {
    const { data, isSuccess, isFetching } = useHolland6Results();
    const navigate = useNavigate();

    const latestAttemptId = isSuccess ? data[0]?._id : null;

    const renderHistoryListItem = (item) => {
        const { _id: id, updatedAt, highestCombination, highest } = item;
        const isLatest = id === latestAttemptId;
        return (
            <Card
                key={id}
                className={`flex flex-col py-5 px-5 w-full hover:bg-muted/70 relative ${
                    isLatest && 'bg-violet-950 bg-opacity-60 hover:bg-violet-800 '
                }`}
                onClick={() => navigate('/holland6/result', { state: { highest: highest } })}
            >
                <CardTitle className="flex text-base space-x-2 items-center">
                    <p>{highestCombination}</p>
                    {isLatest && (
                        <span className="flex px-2 py-1 rounded-full text-xs font-medium bg-violet-800 text-white animate-pulse">
                            Latest
                        </span>
                    )}
                </CardTitle>
                <CardDescription>{new Date(updatedAt).toLocaleString()}</CardDescription>
            </Card>
        );
    };

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
                        <h2 className="text-4xl font-bold tracking-tight text-center">
                            Holland&apos;s Six Personality Types
                        </h2>
                        <p className="px-32 text-muted-foreground text-center">
                            Holland&apos;s Theory of Career Choice proposes that people work best in environments that
                            match their preferences. This theory categorizes people and work environments into six
                            types. Understanding these types can help individuals find careers that suit their
                            personality, interests, and skills.
                        </p>
                    </div>
                    <Lottie
                        animationData={holland6Asset.holland6Landing}
                        style={{ width: 450, height: 450 }}
                    />
                    <Link to="/holland6/question">
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
                        <CardContent className="space-y-3">{data.map(renderHistoryListItem)}</CardContent>
                    </Card>
                )}
            </div>
        </Screen>
    );
};
