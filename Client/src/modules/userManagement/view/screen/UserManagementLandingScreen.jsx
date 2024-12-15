import { ErrorModal } from '@/platform/customComponents/error/ErrorModal';
import { LoadingModal } from '@/platform/customComponents/loading/LoadingModal';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { useState } from 'react';
import { useAllUser } from '../../domain/useCase/useAllUser';
import { DataTable } from '../component/internal/DataTable';
import { UserManagementColumns } from '../component/internal/UserManagementColumns';
import { UserManagementUserDetails } from '../component/UserMangementUserDetails';

export function UserManagementLandingScreen() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const { data, isError, isFetching } = useAllUser();

    if (isError) {
        return (
            <Screen>
                <ErrorModal />
            </Screen>
        );
    }

    if (isFetching) {
        return (
            <Screen>
                <LoadingModal />
            </Screen>
        );
    }

    const handleOpenDialog = (item) => {
        setCurrentItem(item);
        setIsDialogOpen(true);
    };

    return (
        <Screen>
            <div className="flex flex-col space-y-4 p-8 md:flex">
                <div className="flex-col">
                    <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                    <p className="text-muted-foreground">Manage all registered users below.</p>
                </div>

                <DataTable
                    data={data}
                    columns={UserManagementColumns}
                    onRowClick={handleOpenDialog}
                />
                {currentItem && (
                    <UserManagementUserDetails
                        open={isDialogOpen}
                        onClose={() => {
                            setIsDialogOpen(false);
                            setCurrentItem(null);
                        }}
                        item={currentItem}
                        refetch
                    />
                )}
            </div>
        </Screen>
    );
}
