import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle } from 'lucide-react'; // Suggested icon for error
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export function ErrorModal({
    title = 'An error occurred',
    description = "We're sorry, but something went wrong. Please try again later.",
    refreshAction,
}) {
    const navigate = useNavigate();
    const { toast } = useToast();

    return (
        <Dialog
            open={true}
            onOpenChange={() => {
                navigate(-1);
                toast({
                    title: 'Dialog Closed',
                    description: 'You’ve closed the dialog. Redirecting you back to the previous page',
                    status: 'info',
                });
            }}
        >
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] bg-black text-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center justify-center space-y-6 p-6">
                    <AlertCircle className="h-12 w-12 text-destructive" />
                    <div className="text-center">
                        <p className="text-2xl font-bold">{title}</p>
                        <p className="text-lg font-light mt-2">{description}</p>

                        <div className="flex pt-4 gap-x-3 justify-center">
                            <Button
                                variant="outline"
                                onClick={refreshAction ? refreshAction : () => window.location.reload()}
                            >
                                Refresh
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

ErrorModal.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    refreshAction: PropTypes.func,
};
