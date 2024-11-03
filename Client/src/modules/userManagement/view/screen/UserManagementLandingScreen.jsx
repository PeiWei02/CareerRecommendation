import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Screen } from '@/platform/customComponents/screen/Screen';
import { useEffect, useState } from 'react';
import { getAllUserService } from '../../data/source/getAllUserService';
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

    const rendeTable = () => (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Country</TableHead>
                    <TableHead>Holland 6</TableHead>
                    <TableHead>The Vark</TableHead>
                    <TableHead>MBTI</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>{userList.map((item) => renderTableListContent(item))}</TableBody>
        </Table>
    );

    const renderTableListContent = (item) => (
        <TableRow
            key={item._id}
            onClick={() => {
                setIsDialogOpen(true);
                setCurrentItem(item);
            }}
        >
            <TableCell className="font-medium">{item.email}</TableCell>
            <TableCell>{item.mobile}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.country}</TableCell>
            <TableCell>done</TableCell>
            <TableCell>done</TableCell>
            <TableCell>done</TableCell>
            <TableCell className="text-right">done</TableCell>
        </TableRow>
    );

    return (
        <Screen>
            <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
                        <p className="text-muted-foreground">Here&apos;s a list of all the user!</p>
                    </div>
                </div>

                {userList.length > 0 ? rendeTable() : <p>Loading...</p>}
            </div>
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
        </Screen>
    );
}
