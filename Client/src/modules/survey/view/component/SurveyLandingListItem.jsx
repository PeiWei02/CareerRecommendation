import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import Lottie from 'lottie-react';
import { CheckCircle } from 'lucide-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export const SurveyLandingListItem = (props) => {
    const { title, description, animation, link, isCompleted } = props;

    return (
        <Link
            to={link}
            className="block transform transition duration-300 ease-in-out hover:scale-105"
        >
            <Card
                className={`py-2 transition duration-300 ease-in-out shadow-md hover:shadow-lg ${
                    isCompleted ? 'bg-violet-950 bg-opacity-60 hover:bg-violet-800' : 'hover:bg-gray-800'
                }`}
            >
                <div className="h-full w-full grid grid-cols-12 gap-5 items-center">
                    <div className="col-span-8 px-6">
                        <CardTitle className="flex flex-row items-center text-xl">
                            {title}
                            {isCompleted && (
                                <CheckCircle
                                    className="ml-2 text-green-500"
                                    size={24}
                                />
                            )}
                        </CardTitle>
                        <CardDescription className="text-sm">{description}</CardDescription>
                    </div>
                    <div className="col-span-4 flex justify-center items-center">
                        <div className="h-36 w-36">
                            <Lottie
                                animationData={animation}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

SurveyLandingListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    animation: PropTypes.object.isRequired,
    link: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
};
