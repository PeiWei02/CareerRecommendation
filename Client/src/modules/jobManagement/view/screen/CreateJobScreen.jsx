import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { Link } from 'react-router-dom';
import { JobManagementCreateJobForm } from '../component/JobManagementCreateJobForm';

export function CreateJobScreen() {
    return (
        <Screen>
            <div className="space-y-4 px-8 ">
                <div className="flex justify-between space-y-2 px-6">
                    <div>
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
