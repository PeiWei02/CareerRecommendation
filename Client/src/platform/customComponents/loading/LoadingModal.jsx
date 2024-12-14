import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

export function LoadingModal({
    title = 'Hang tight!',
    description = "We're processing your request. This won't take long.",
}) {
    const navigate = useNavigate();
    const { toast } = useToast();

    return (
        <Dialog
            open={true}
            onOpenChange={() => {
                navigate(-1);
                toast({
                    title: 'Action Cancelled',
                    description: 'You’ve canceled the wait. Redirecting you back to the previous page.',
                    status: 'info',
                });
            }}
        >
            <DialogContent className="sm:max-w-[600px] md:max-w-[800px] bg-black text-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center justify-center space-y-6 p-6">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                    <div className="text-center">
                        <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
                        <DialogDescription className="text-lg font-light mt-2">{description}</DialogDescription>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

LoadingModal.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};
