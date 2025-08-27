import { MaterialReactTable } from 'material-react-table';
import { Button } from '@mui/material';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import './MUI.css';

export default function Datatable({ columns, data, onEdit, onView, onDelete, onMarkRead, permissions }) {

    const excludedFields = ['_id', 'answer', 'password', '__v', 'images', 'createdOn', 'status'];

    const handleExportCsv = () => {
        const filteredData = data.map(row => {
            const filteredRow = { ...row };
            excludedFields.forEach(field => delete filteredRow[field]);

            for (const key in filteredRow) {
                const item = filteredRow[key];
                if (item?.name) {
                    filteredRow[key] = item.name;
                }
            }

            return filteredRow;
        });

        const csvConfig = mkConfig({
            fieldSeparator: ',',
            decimalSeparator: '.',
            useKeysAsHeaders: true,
        });

        const csv = generateCsv(csvConfig)(filteredData);
        download(csvConfig)(csv);
    };


    const dynamicColumns = [
        {
            id: 'serial',
            header: 'SL',
            size: 50,
            Cell: ({ row }) => {
                return data.length - row.index;
            },
        },
        ...columns,
        {
            id: 'actions',
            header: 'Actions',
            size: 120,
            Cell: ({ row }) => (
                <div className="space-x-2 flex">
                    {permissions.canView && (
                        <button
                            className="px-3 rounded shadow hover:shadow-2xl text-xs bg-slate-200 [&>svg]:w-[15px] hover:bg-slate-300"
                            onClick={() => onView(row.original)}
                            title="View"
                        >
                            <VisibilityIcon />
                        </button>
                    )}

                    {permissions.canEdit && (
                        <button
                            className="px-3 rounded shadow hover:shadow-2xl text-xs bg-orange-100 [&>svg]:w-[15px] hover:bg-orange-300"
                            onClick={() => onEdit(row.original)}
                            title="Edit"
                        >
                            <EditIcon />
                        </button>
                    )}

                    {permissions.canDelete && (
                        <button
                            className="px-3 rounded shadow hover:shadow-2xl text-xs text-red-400 bg-red-100 [&>svg]:w-[15px] hover:bg-red-300"
                            onClick={() => onDelete(row.original)}
                            title="Delete"
                        >
                            <DeleteIcon />
                        </button>
                    )}

                    {permissions.canMarkRead && (
                        <button
                            className={`px-3 rounded shadow-md text-xs [&>svg]:w-[16px] transition-all ${row.original.workDone
                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-600 text-white'
                                }`}
                            onClick={() => !row.original.workDone && onMarkRead(row.original)}
                            title="Mark As Read"
                            disabled={row.original.workDone}
                        >
                            <DoneAllIcon fontSize="small" />
                        </button>
                    )}

                </div>
            ),
        },
    ];

    return (
        <MaterialReactTable
            data={data}
            columns={dynamicColumns}
            enableFullScreenToggle={false}
            enableDensityToggle={false}
            initialState={{
                density: 'compact',
                pagination: { pageSize: 20, pageIndex: 0 },
            }}
            muiPaginationProps={{ rowsPerPageOptions: [20, 50, 100] }}
            enableColumnActions={false}
            enableCellActions={true}
            muiTableBodyRowProps={({ row }) => ({
                className: row.original.workDone ? 'bg-gray-100' : '',
            })}
            renderTopToolbarCustomActions={() => (
                <section>
                    <Button
                        className="!text-black !capitalize"
                        onClick={handleExportCsv}
                        startIcon={<DownloadIcon />}
                    >
                        Export
                    </Button>
                </section>
            )}
        />
    );
}
