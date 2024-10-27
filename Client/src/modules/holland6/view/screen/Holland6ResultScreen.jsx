import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Lottie from 'lottie-react';
import { Link, useLocation } from 'react-router-dom';
import { holland6Result } from '../../data/entity/holland6Result';
import { Holland6ResultPDF } from '../component/Holland6ResultPDF';

export const Holland6ResultScreen = () => {
    const location = useLocation();
    const { state } = location;
    const { highest } = state || {};
    const selectedResult = holland6Result[highest];

    return (
        <div className="flex items-center justify-center">
            <Card className="m-5 h-[85vh] w-[80vw]">
                <CardHeader>
                    <CardTitle className="text-xl ml-5">
                        Fresh Out of the Oven: Your Holland Code Results Are Here!
                    </CardTitle>
                </CardHeader>
                <div className="grid grid-cols-12 gap-5 h-[67vh] justify-center">
                    <div className="col-span-5 flex justify-center items-center">
                        <Lottie
                            animationData={selectedResult.animationData}
                            style={{ width: '95%', height: '95%' }}
                        />
                    </div>
                    <div className="col-span-7">
                        <CardFooter className="flex flex-col items-start m-5">
                            <div className="py-2">
                                <CardTitle className="text-3xl">You are a {selectedResult.title}!</CardTitle>
                                <CardDescription className="my-3">{selectedResult.description}</CardDescription>
                            </div>
                            <div className="py-2">
                                <CardTitle className="text-2xl">Characteristics</CardTitle>
                                <CardDescription className="my-2">{selectedResult.characteristics}</CardDescription>
                            </div>
                            <div className="py-2">
                                <CardTitle className="text-2xl">Suitable Careers</CardTitle>
                                <CardDescription className="my-2">
                                    <ul className="list-disc pl-5">
                                        {selectedResult.careers.map((profession, index) => (
                                            <li key={index}>{profession}</li>
                                        ))}
                                    </ul>
                                </CardDescription>
                            </div>
                        </CardFooter>
                    </div>
                </div>
                <div className="flex items-end justify-end px-5">
                    <Link to="/holland6/question">
                        <Button
                            variant="outline"
                            className="hover:bg-primary"
                        >
                            Re-attempt
                        </Button>
                    </Link>
                    <PDFDownloadLink
                        document={<Holland6ResultPDF holland6Result={selectedResult} />}
                        fileName="Holland6Report.pdf"
                        className="ml-3"
                    >
                        {({ loading }) =>
                            loading ? 'Loading document...' : <Button variant="outline">Download PDF</Button>
                        }
                    </PDFDownloadLink>
                </div>
            </Card>
        </div>
    );
};
