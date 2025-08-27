import { useState, useEffect } from 'react';
import Datatable from '../Components/Datatable/Datatable';
import View from './View';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CachedIcon from '@mui/icons-material/Cached';
import MailIcon from '@mui/icons-material/Mail';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function OAS_Leads() {
    document.title = 'OAS_Leads';

    const EndPoint = 'leads';

    const userPermissions = {
        canEdit: false,
        canView: true,
        canDelete: false,
        canMarkRead: true,
    };

    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [viewData, setViewData] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState(null);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/${EndPoint}`);
            const reversedData = response.data.reverse();
            setData(reversedData);
        } catch (error) {
            toast.error('Failed to fetch data. Please try again.');
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (row) => {
        if (window.confirm(`Are you sure you want to delete ${row.fullName?.toUpperCase()}?`)) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/${EndPoint}/${row._id}`);
                toast.success(`${row.fullName?.toUpperCase()} deleted.`);
                fetchData();
            } catch (error) {
                toast.error('Failed to delete. Please try again.');
                console.error('Error deleting data:', error);
            }
        }
    };

    const handleView = (row) => {
        setViewData(row);
        setViewModalOpen(true);
    };

    const handleMarkAsRead = async (row) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/${EndPoint}/${row._id}`, {
                workDone: true,
            });
            toast.success(`${row.fullName} marked as read.`);
            fetchData();
        } catch (error) {
            toast.error('Failed to update.');
            console.error('Error updating data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    };

    const columns = [
        { accessorKey: 'fullName', header: 'Name' },
        { accessorKey: 'phone', header: 'Phone', enableClickToCopy: true },
        {
            accessorKey: 'email',
            header: 'Email',
            Cell: ({ cell }) => {
                const email = cell.getValue();
                return email && (
                    <div className="flex items-center text-blue-900 cursor-pointer"
                        onClick={() => window.open(`mailto:${email}`)}>
                        <MailIcon fontSize="small" className="mr-1" />
                        {email}
                    </div>
                );
            }
        },
        { accessorKey: 'address', header: 'Address' },
        { accessorKey: 'propertyType', header: 'Property Type' },
    ];

    return (
        <main className='h-[100vh]'>
            <section className=''>
                <ToastContainer position="bottom-right" autoClose={2000} />

                <section className="flex justify-between px-5 py-2 mb-3 bg-[#127ec1]">
                    <div className='flex justify-center items-center'>
                        <h1 className="font-bold text-sm md:text-lg text-white mr-2">OAS Leads</h1>

                        {loading ? (
                            <div className="flex justify-center items-center text-white">
                                <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="10" strokeDashoffset="75" />
                                </svg>
                            </div>
                        ) : <button className="text-gray-200" onClick={fetchData}><CachedIcon /></button>
                        }

                        <span className="ml-2 text-xs text-gray-300">
                            Total: {data.length}
                        </span>
                    </div>

                    <div>
                        <button className='text-sm text-gray-300 font-bold border border-gray-300 px-2 py-1 rounded' onClick={handleLogout}><LogoutOutlinedIcon /> Logout</button>
                    </div>
                </section>

                <section className='px-6'>
                    {loading ? (
                        <div className="flex justify-center py-4">
                            <svg className="animate-spin p-5 h-32 w-32 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeDashoffset="80" />
                            </svg>
                        </div>
                    ) : (
                        <Datatable
                            columns={columns}
                            data={data}
                            onView={handleView}
                            onDelete={handleDelete}
                            onMarkRead={handleMarkAsRead}
                            permissions={userPermissions}
                        />
                    )}
                </section>

                {modalOpen && (
                    <Add_Edit
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                        data={editData}
                        refreshData={fetchData}
                    />
                )}

                {viewModalOpen && (
                    <View
                        open={viewModalOpen}
                        onClose={() => setViewModalOpen(false)}
                        viewData={viewData}
                    />
                )}
            </section>
        </main>
    );
}
