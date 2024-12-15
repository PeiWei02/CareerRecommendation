import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { Link, useLocation } from 'react-router-dom';
import { JobManagementUpdateJobForm } from '../component/JobManagementUpdateJobForm';

export function UpdateJobScreen() {
    const location = useLocation();
    const job = location.state;

    return (
        <Screen>
            <div className="flex flex-col space-y-4 p-8 md:flex">
                <div className="flex flex-row justify-between ">
                    <div className="flex-col">
                        <h2 className="text-2xl font-bold tracking-tight">Job Management</h2>
                        <p className="text-muted-foreground">Update your new job here</p>
                    </div>
                    <Link to="/job">
                        <Button variant="outline">View Job</Button>
                    </Link>
                </div>
                <Separator />

                <JobManagementUpdateJobForm job={job} />
            </div>
        </Screen>
    );
}
