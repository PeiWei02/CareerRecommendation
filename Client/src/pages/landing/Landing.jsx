import { Button } from '@/components/ui/button';
import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import animationData from '../../assets/landing/landing.json';

const Landing = () => {
    return (
        <div>
            <section className="container grid lg:grid-cols-2 place-items-center py-10 md:py-12 gap-10">
                <div className="text-center lg:text-start space-y-6">
                    <main className="text-5xl md:text-6xl font-bold">
                        <h1 className="inline">
                            <span className="inline bg-gradient-to-r from-[#F596D3]  to-[#D247BF] text-transparent bg-clip-text">
                                Unlock Your Potential
                            </span>{' '}
                            The Ultimate
                        </h1>{' '}
                        <h2 className="inline">
                            <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] text-transparent bg-clip-text">
                                Career Recommender
                            </span>{' '}
                            for Youth
                        </h2>
                    </main>

                    <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                        The BEST Career Recommender platform for everyone especially youth
                    </p>

                    <div className="space-y-4 md:space-y-0 md:space-x-4">
                        <Link to="/survey">
                            <Button className="w-full md:w-1/3">Test Now</Button>
                        </Link>
                    </div>
                </div>

                {/* Hero cards sections */}
                <div className="z-10">
                    <Lottie
                        animationData={animationData}
                        style={{ width: '90%', height: '90%' }}
                    />
                </div>

                {/* Shadow effect */}
                <div className="shadow"></div>
            </section>
        </div>
    );
};

export default Landing;
