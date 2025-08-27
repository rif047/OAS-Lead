import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, IconButton, MenuItem } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxWidth: 500,
    bgcolor: '#fdfdfd',
    boxShadow: 24,
    p: 3,
    borderRadius: 2,
    overflowY: 'auto',
};

const countryOptions = [
    { value: 'BD', label: 'Bangladesh (BD)' },
    { value: 'UAE', label: 'United Arab Emirates (UAE)' },
    { value: 'UK', label: 'United Kingdom (London, UK)' },
    { value: 'Other', label: 'Other' },
];

export default function AddEditCustomer({ open, onClose, data, refreshData }) {
    const EndPoint = 'customers';

    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showFullAddressField, setShowFullAddressField] = useState(false);

    useEffect(() => {
        if (data) {
            const initialData = { ...data };
            const countryMatch = countryOptions.find(option =>
                initialData.address?.startsWith(`${option.value}:`)
            );

            if (countryMatch) {
                setFormData({
                    ...initialData,
                    country: countryMatch.value,
                    fullAddress: initialData.address.replace(`${countryMatch.value}:`, '').trim()
                });
                setShowFullAddressField(true);
            } else {
                setFormData(initialData);
            }
        } else {
            setFormData({});
            setShowFullAddressField(false);
        }
        setErrors({});
    }, [data]);

    const validate = () => {
        const newErrors = {};
        const { name, phone, alt_phone, email, country, fullAddress } = formData;

        if (!name) newErrors.name = 'Name is required.';
        if (!/^\d+$/.test(phone || '')) newErrors.phone = 'Phone number must contain numbers.';
        if (alt_phone && !/^\d+$/.test(alt_phone)) newErrors.alt_phone = 'Alternate phone must contain numbers.';
        if (!country) newErrors.country = 'Country is required.';
        if (showFullAddressField && !fullAddress) newErrors.fullAddress = 'Full address is required.';
        if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { newErrors.email = 'Already exist || Invalid email address' }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'country') {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                address: value === 'Other' ? '' : `${value}: `
            }));
            setShowFullAddressField(value !== '');
            if (value !== 'Other') {
                setErrors((prev) => ({ ...prev, country: '', fullAddress: '' }));
            }
        } else if (name === 'fullAddress') {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
                address: prev.country ? `${prev.country}: ${value}` : value
            }));
            setErrors((prev) => ({ ...prev, [name]: '' }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async () => {
        const submitData = {
            ...formData,
            address: formData.country ? `${formData.country}: ${formData.fullAddress || ''}`.trim() : formData.fullAddress
        };

        if (!validate() || loading) return;
        setLoading(true);

        try {
            const url = `${import.meta.env.VITE_API_URL}/api/${EndPoint}${data?._id ? `/${data._id}` : ''}`;
            const method = data?._id ? 'patch' : 'post';
            await axios[method](url, submitData);
            toast.success(data?._id ? 'Updated successfully.' : 'Created successfully.');
            refreshData();
            onClose();
        } catch (error) {
            const backendErrors = error.response?.data || {};
            toast.error('Failed to update data.');
            setErrors({
                ...backendErrors.includes('Phone number already exists') && { phone: 'Phone number already exists.' },
                ...backendErrors.includes('Email already exists') && { email: 'Email already exists.' },
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle} className='max-h-[90vh]'>
                <Box display="flex" justifyContent="space-between" mb={1}>
                    <Typography className='!font-bold' variant="h6">{data ? 'Update Data' : 'Create New'} </Typography>
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <TextField
                    select
                    label="Country*"
                    name="country"
                    fullWidth
                    margin="normal"
                    size="small"
                    value={formData.country || ''}
                    onChange={handleChange}
                    error={!!errors.country}
                    helperText={errors.country}
                >
                    {countryOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

                {showFullAddressField && (
                    <TextField
                        name="fullAddress"
                        label="Write Full Address Here*"
                        fullWidth
                        margin="normal"
                        size="small"
                        multiline
                        rows={2}
                        value={formData.fullAddress || ''}
                        onChange={handleChange}
                        error={!!errors.fullAddress}
                        helperText={errors.fullAddress}
                    />
                )}

                {[
                    { name: 'name', label: 'Customer Name*' },
                    { name: 'phone', label: 'Phone*' },
                    { name: 'alt_phone', label: 'Alternate Phone' },
                    { name: 'email', label: 'Email' },
                    { name: 'profession', label: 'Profession' },
                    { name: 'comment', label: 'Comments' },
                ].map(({ name, label }) => (
                    <TextField
                        key={name}
                        name={name}
                        label={label}
                        type={'text'}
                        fullWidth
                        margin="normal"
                        size="small"
                        value={formData[name] || ''}
                        onChange={handleChange}
                        error={!!errors[name]}
                        helperText={errors[name]}
                    />
                ))}



                <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleSubmit} disabled={loading} className='!bg-slate-600 !font-bold'>
                    {data ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Modal>
    );
}