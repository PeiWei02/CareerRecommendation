import { Screen } from '@/platform/customComponents/screen/Screen';
import { useEffect, useState } from 'react';
import { getAllUserService } from '../../data/source/getAllUserService';
import { DataTable } from '../component/internal/DataTable';
import { UserManagementColumns } from '../component/internal/UserManagementColumns';
import { UserManagementUserDetails } from '../component/UserMangementUserDetails';

export function UserManagementLandingScreen() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [userList, setUserList] = useState([]);

    //TODO: Add modal to let it wait
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllUserService();
            setUserList(data);
        };

        fetchData();
    }, []);

    const handleOpenDialog = (item) => {
        setCurrentItem(item);
        setIsDialogOpen(true);
    };

    return (
        <Screen>
            <div className="h-full flex-1 flex-col space-y-4 p-8 md:flex">
                <div className="flex items-start justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">Here&apos;s a list of all the user!</p>
                    </div>
                </div>

                <DataTable
                    data={userList}
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
                    />
                )}
            </div>
        </Screen>
    );
}
