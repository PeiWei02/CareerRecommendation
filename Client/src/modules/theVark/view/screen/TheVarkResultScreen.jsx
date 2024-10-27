import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Lottie from 'lottie-react';
import { Link, useLocation } from 'react-router-dom';
import { theVarkResult } from '../../data/entity/theVarkResult';
import { VarkResultPDF } from '../component/VarkResultPDF';

export const TheVarkResultScreen = () => {
    const location = useLocation();
    const { highest } = location.state || {}; // Safely access state

    if (!highest) {
        return <div>No personality information found.</div>;
    }

    const personalityInfo = theVarkResult[highest];

    if (!personalityInfo) {
        return <div>No personality information found for this personality.</div>;
    }

    return (
        <Screen>
            <Card className="m-5 h-[75vh] w-[80vw]">
                <CardHeader>
                    <CardTitle>Fresh Out of the Oven: Your The Vark Results Are Here!</CardTitle>
                </CardHeader>
                <CardFooter>
                    <div className="grid grid-cols-12 gap-5 justify-center">
                        <div className="col-span-5 flex justify-center items-center">
                            <Lottie
                                animationData={personalityInfo.animation}
                                style={{ width: '95%', height: '95%' }}
                            />
                        </div>

                        <div className="col-span-7 flex flex-col">
                            <div className="py-2">
                                <CardTitle className="text-3xl">You are a {personalityInfo.name}!</CardTitle>
                                <CardDescription className="my-3">{personalityInfo.description}</CardDescription>
                            </div>

                            <div className="py-2">
                                <CardTitle className="text-2xl">Traits</CardTitle>
                                <CardDescription className="my-2">{personalityInfo.traits}</CardDescription>
                            </div>

                            <div className="py-2">
                                <CardTitle className="text-2xl">Techniques</CardTitle>
                                <CardDescription className="my-2">{personalityInfo.techniques}</CardDescription>
                            </div>

                            <div className="py-2">
                                <CardTitle className="text-2xl">Feedbacks</CardTitle>
                                <CardDescription className="my-2">{personalityInfo.feedback}</CardDescription>
                            </div>

                            <div className="flex items-end justify-end px-5">
                                <Link to="/theVark">
                                    <Button
                                        variant="outline"
                                        className="hover:bg-primary"
                                    >
                                        Re-attempt
                                    </Button>
                                </Link>
                                <PDFDownloadLink
                                    document={<VarkResultPDF varkResult={personalityInfo} />}
                                    fileName="TheVarkReport.pdf"
                                    className="ml-3"
                                >
                                    {({ loading }) =>
                                        loading ? (
                                            'Loading document...'
                                        ) : (
                                            <Button variant="outline">Download PDF</Button>
                                        )
                                    }
                                </PDFDownloadLink>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Screen>
    );
};
