import { useState, useEffect } from 'react';
import Layout from '../../Layout';
import Datatable from '../../Components/Datatable/Datatable';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import View from './View';
import 'react-toastify/dist/ReactToastify.css';
import CachedIcon from '@mui/icons-material/Cached';


export default function Solds() {
    document.title = 'Sold';

    const EndPoint = 'properties';


    const [loading, setLoading] = useState(false);
    const [allData, setAllData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [viewData, setViewData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [viewModalOpen, setViewModalOpen] = useState(false);


    const userPermissions = {
        canEdit: false,
        canView: true,
        canDelete: false
    };

    const handleView = row => {
        setViewData(row);
        setViewModalOpen(true);
    };



    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${EndPoint}`);
            const allProperties = res.data.reverse();
            setAllData(allProperties);
            const offeringProperties = allProperties.filter(property => property.status === "Sell");
            setFilteredData(offeringProperties);
        } catch {
            toast.error('Failed to fetch data.');
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => { fetchData(); }, []);



    const columns = [
        { accessorFn: row => `${row.client?.name} (${row.client?.phone})`, header: 'Client', enableClickToCopy: true, size: 80 },
        { accessorFn: row => `${row.customer?.name} (${row.customer?.phone})`, header: 'Customer', enableClickToCopy: true, size: 80 },
        { accessorKey: 'name', header: 'Name', size: 80 },
        { accessorKey: 'code', header: 'Code', size: 80 },
        { accessorKey: 'location', header: 'Location', size: 80 },
        { accessorFn: row => `${row.decimal} dec`, header: 'Size', size: 80 },
        { accessorFn: row => `${row.sell_price} tk`, header: 'Sold Price', size: 80 },
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
                    <h1 className="font-bold text-sm md:text-lg text-white mr-2">Sold Properties</h1>
                    {loading ? (
                        <div className="flex justify-center items-center text-white">
                            <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="3" strokeDasharray="10" strokeDashoffset="75" />
                            </svg>
                        </div>
                    ) : <button className="text-gray-200" onClick={fetchData}><CachedIcon /></button>
                    }
                </div>
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
                        permissions={userPermissions}
                        onView={handleView}
                    />
                )}
            </section>

            {modalOpen && <Add_Edit open={modalOpen} onClose={() => setModalOpen(false)} data={editData} refreshData={fetchData} />}
            {viewModalOpen && <View open={viewModalOpen} onClose={() => setViewModalOpen(false)} viewData={viewData} />}
        </Layout>
    );
}
