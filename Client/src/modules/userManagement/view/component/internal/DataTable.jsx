import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Search } from 'lucide-react';
import PropTypes from 'prop-types';
import { useState } from 'react';

export function DataTable({ columns, data, onRowClick }) {
    const [sorting, setSorting] = useState([]);
    const [columnFilters, setColumnFilters] = useState([]);
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    return (
        <div className="space-y-2 py-2">
            <div className="flex items-center py-2 space-x-2">
                <Input
                    placeholder="Search by email"
                    value={table.getColumn('email')?.getFilterValue() || ''}
                    onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <Search className="text-slate-500" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    onClick={() => onRowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            accessorFn: PropTypes.func,
            header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
            cell: PropTypes.func,
        }),
    ).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    onRowClick: PropTypes.func.isRequired,
};
