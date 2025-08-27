import { useState, useEffect } from 'react';
import Layout from '../../Layout';
import Datatable from '../../Components/Datatable/Datatable';
import Add_Edit from './Add_Edit';
import View from './View';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CachedIcon from '@mui/icons-material/Cached';
import { TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button, Autocomplete } from '@mui/material';
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';


export default function Properties() {
    document.title = 'Property';

    const EndPoint = 'properties';


    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [tickModalOpen, setTickModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [sellPrice, setSellPrice] = useState('');
    const [sellDate, setSellDate] = useState('');
    const [sellCustomer, setSellCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showAll, setShowAll] = useState(false);


    const userPermissions = {
        canEdit: true,
        canView: true,
        canDelete: true
    };



    const capitalizeWords = str => str.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ');



    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${EndPoint}`);
            const allProperties = res.data.reverse();
            setAllData(allProperties);
            const offeringProperties = allProperties.filter(property => property.status === "Pending");
            setFilteredData(offeringProperties);
            setShowAll(false);
        } catch {
            toast.error('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };




    const handleDelete = async row => {
        if (!window.confirm(`Delete ${row.name.toUpperCase()}?`)) return;
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/${EndPoint}/${row._id}`);
            toast.success(`${row.name.toUpperCase()} deleted.`);
            fetchData();
        } catch {
            toast.error('Failed to delete.');
        }
    };


    const handleAdd = () => {
        setEditData(null);
        setModalOpen(true);
    };


    const handleEdit = row => {
        setEditData(row);
        setModalOpen(true);
    };


    const handleView = row => {
        setViewData(row);
        setViewModalOpen(true);
    };


    const handleTickClick = async row => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/customers`);
            setCustomers(res.data.reverse());
        } catch {
            toast.error('Failed to fetch customers.');
        } finally {
            setSelectedRow(row);
            setSellPrice(row.sell_price || '');
            setSellDate(row.date || '');
            setSellCustomer(row.customer?._id || '');
            setTickModalOpen(true);
        }
    };

    const handleTickSubmit = async () => {
        try {
            const updateData = {
                sell_price: sellPrice,
                customer: sellCustomer,
                date: sellDate,
                status: selectedRow.property_for
            };

            await axios.patch(
                `${import.meta.env.VITE_API_URL}/api/${EndPoint}/offering/${selectedRow._id}`,
                updateData
            );

            toast.success('Status updated successfully!');

            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${EndPoint}`);
            const allProperties = res.data.reverse();
            setAllData(allProperties);
            setFilteredData(allProperties.filter(property => property.status === "Pending"));

            setTickModalOpen(false);
        } catch (error) {
            console.error('Error updating property:', error);
            toast.error('Failed to update property.');
        }
    };


    useEffect(() => { fetchData(); }, []);



    const columns = [
        { accessorFn: row => `${row.client.name} (${row.client.phone})`, header: 'Client', enableClickToCopy: true, size: 80 },
        { accessorKey: 'name', header: 'Name', size: 80 },
        { accessorKey: 'code', header: 'Code', size: 80 },
        { accessorKey: 'location', header: 'Location', size: 80 },
        { accessorFn: row => `${row.decimal} dec`, header: 'Size', size: 80 },
        { accessorFn: row => `${row.agree_price} tk`, header: 'Agreed', size: 80 },
        { accessorFn: row => `${row.sell_price} tk`, header: 'Sell', size: 80 },
        {
            accessorKey: 'images',
            header: 'Image',
            size: 70,
            Cell: ({ cell }) => {
                const images = cell.getValue();
                return Array.isArray(images) && images.length > 0 ? (
                    <img
                        src={`${import.meta.env.VITE_API_URL}/api/Images/${EndPoint}/${images[0]}`}
                        alt="Image"
                        style={{ width: '50px', height: '30px', objectFit: 'cover', borderRadius: '4px', display: 'block', margin: '0 auto' }}
                    />
                ) : (
                    <div style={{ textAlign: 'center' }}>No Image</div>
                );
            },
        },
        {
            accessorKey: 'property_for',
            header: 'Status',
            size: 80,
            Cell: ({ row }) => (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span>{row.original.property_for}</span>
                    {!showAll && row.original.status === "Pending" && (
                        <button
                            className='text-green-900 ml-3'
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTickClick(row.original);
                            }}
                        >
                            <span className='text-[10px] mr-1'>Under Offer</span>
                            <FileDownloadDoneOutlinedIcon fontSize='small' />
                        </button>
                    )}
                </div>
            )
        }
    ];


    columns.forEach(col => {
        if (!['images', 'property_for'].includes(col.accessorKey)) {
            col.Cell = ({ cell }) => {
                const val = String(cell.getValue() || '');
                return <span title={val}>{val.slice(0, 30)}{val.length > 30 && '...'}</span>;
            };
        }
    });






    return (
        <Layout>
            <ToastContainer position="bottom-right" autoClose={2000} />

            <section className="flex justify-between px-5 py-2 mb-3 bg-[#4c5165]">
                <div className='flex items-center'>
                    <h1 className="font-bold text-sm md:text-lg text-white mr-2 text-center">Property List</h1>
                    {loading ? (
                        <div className="flex justify-center items-center text-white">
                            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="10" strokeDashoffset="75" />
                            </svg>
                        </div>
                    ) : (
                        <>

                            <button className="text-gray-200" onClick={fetchData}><CachedIcon /></button>

                            <div className="flex items-center">
                                <button className="text-gray-200 ml-4 font-bold text-sm" onClick={() => { setFilteredData(allData); setShowAll(true); }}>
                                    Show All
                                </button>
                                <span className="ml-2 text-xs text-gray-300">
                                    ({filteredData.length} Pending / {allData.length} Total)
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <button onClick={handleAdd} className="bg-white text-gray-800 px-6 py-1 rounded-md font-bold text-sm hover:bg-gray-200">
                    Create +
                </button>
            </section>

            <section>
                {loading ? (
                    <div className="flex justify-center py-4">
                        <svg className="animate-spin p-5 h-32 w-32 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="50" strokeDashoffset="80" />
                        </svg>
                    </div>
                ) : (
                    <Datatable
                        columns={columns}
                        data={filteredData}
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        permissions={userPermissions}
                    />
                )}
            </section>

            {modalOpen && <Add_Edit open={modalOpen} onClose={() => setModalOpen(false)} data={editData} refreshData={fetchData} />}
            {viewModalOpen && <View open={viewModalOpen} onClose={() => setViewModalOpen(false)} viewData={viewData} />}

            <Dialog open={tickModalOpen} onClose={() => setTickModalOpen(false)}>
                <DialogTitle><b>Update Property</b></DialogTitle>
                <DialogContent>
                    <Autocomplete
                        fullWidth size="small"
                        options={customers}
                        value={customers.find(c => c._id === sellCustomer) || null}
                        getOptionLabel={option => capitalizeWords(option.name)}
                        onChange={(e, newVal) => setSellCustomer(newVal?._id || '')}
                        isOptionEqualToValue={(a, b) => a._id === b._id}
                        renderInput={params => <TextField {...params} label="Select Customer*" />}
                        style={{ marginBottom: 20 }}
                    />
                    <TextField
                        label="Expected Price"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={sellPrice}
                        onChange={e => setSellPrice(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />

                    <TextField
                        label="Deal Date"
                        type="date"
                        fullWidth
                        variant="standard"
                        InputLabelProps={{ shrink: true }}
                        value={sellDate}
                        onChange={e => setSellDate(e.target.value)}
                        style={{ marginBottom: 20 }}
                    />

                </DialogContent>


                <DialogActions>
                    <Button fullWidth variant="contained" onClick={handleTickSubmit} className='!bg-slate-600 !font-bold'>Done</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
}
