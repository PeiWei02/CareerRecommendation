import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function LoadingModal() {
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
                        <p className="text-2xl font-bold">Hang tight!</p>
                        <p className="text-lg font-light mt-2">We're processing your request. This won't take long.</p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
