import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Lottie from 'lottie-react';
import { Link, useLocation } from 'react-router-dom';
import { mbtiResult } from '../../data/entity/mbti';
import { mbtiPersonalityType } from '../../data/entity/mbtiPersonalityType';
import { MBTIResultPDF } from '../component/MBTIResultPDF';

export const MBTIResultScreen = () => {
    const location = useLocation();
    const { highest } = location.state || {};

    if (!highest) {
        return <div>No personality information found.</div>;
    }
    const mbtiPersonalityInfo = mbtiPersonalityType[highest];

    const array = highest.split('');

    const allResults = array.map((type, index) => {
        const result = mbtiResult[type];
        if (!result) {
            return null;
        }

        return (
            <Card
                className="m-5 w-[80vw]"
                key={index}
            >
                <CardHeader>
                    <CardTitle>{result.name}</CardTitle>
                </CardHeader>
                <CardFooter>
                    <div className="grid grid-cols-12 gap-5 justify-center">
                        <div className="col-span-5 flex justify-center items-center">
                            <Lottie
                                animationData={result.animation}
                                style={{ width: '95%', height: '95%' }}
                            />
                        </div>
                        <div className="col-span-7 flex flex-col">
                            <div className="py-2">
                                <CardTitle className="text-3xl">Personality Type: {result.name}</CardTitle>
                                <CardDescription className="my-3">{result.description}</CardDescription>
                            </div>
                            <div className="py-2">
                                <CardTitle className="text-2xl">Cognitive Function</CardTitle>
                                <CardDescription className="my-2">{result.cognitiveFunction}</CardDescription>
                            </div>
                            <div className="py-2">
                                <CardTitle className="text-2xl">Strengths</CardTitle>
                                <CardDescription className="my-2">{result.strengths}</CardDescription>
                            </div>
                            <div className="py-2">
                                <CardTitle className="text-2xl">Weaknesses</CardTitle>
                                <CardDescription className="my-2">{result.weaknesses}</CardDescription>
                            </div>
                            <div className="py-2">
                                <CardTitle className="text-2xl">Interaction</CardTitle>
                                <CardDescription className="my-2">{result.interaction}</CardDescription>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        );
    });

    return (
        <Screen>
            <div className="m-5">
                <div className="px-5 text-2xl font-semibold leading-none tracking-tight">
                    You are a {mbtiPersonalityInfo}
                </div>
                {allResults}
                <div className="flex items-end justify-end px-5 mt-5">
                    <Link to="/mbti/question">
                        <Button
                            variant="outline"
                            className="hover:bg-primary"
                        >
                            Re-attempt
                        </Button>
                    </Link>
                    <PDFDownloadLink
                        document={<MBTIResultPDF MBTIresults={array.map((type) => mbtiResult[type])} />}
                        fileName="MBTI_Report.pdf"
                        className="ml-3"
                    >
                        {({ loading }) =>
                            loading ? 'Loading document...' : <Button variant="outline">Download PDF</Button>
                        }
                    </PDFDownloadLink>
                </div>
            </div>
        </Screen>
    );
};
