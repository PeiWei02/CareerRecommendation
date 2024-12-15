import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { Link } from 'react-router-dom';
import { JobManagementCreateJobForm } from '../component/JobManagementCreateJobForm';

export function CreateJobScreen() {
    return (
        <Screen>
            <div className="flex flex-col space-y-4 p-8 md:flex">
                <div className="flex flex-row justify-between ">
                    <div className="flex-col">
                        <h2 className="text-2xl font-bold tracking-tight">Job Management</h2>
                        <p className="text-muted-foreground">Create your new job here</p>
                    </div>
                    <Link to="/job">
                        <Button variant="outline">View Job</Button>
                    </Link>
                </div>
                <Separator />

                <JobManagementCreateJobForm />
            </div>
        </Screen>
    );
}
