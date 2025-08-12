import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { NavLink } from 'react-router-dom';
import CommonFormSection from '../Components/CommonFormSection';
import PropertyTypeSection from '../Components/PropertyTypeSection';

export default function FirstFloor() {
    const initialFormState = {
        propertyType: '',
        extensionType: 'Other',
        detailExtensionType: '',
        buildingRegulations: '',
        architecturalDesigns: '',
        planningPermission: '',
        budget: '',
        fullName: '',
        postcode: '',
        email: '',
        address: '',
        phone: '',
        hearAboutUs: '',
        acceptTerms: false,
        acceptUpdate: false
    };

    const [formData, setFormData] = useState(initialFormState);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isFormValid = Object.values(formData).every(value => String(value).trim() !== '');

        if (!isFormValid) {
            alert("Completion of all fields is required.");
            return;
        }

        setLoading(true);

        emailjs.send('service_9kre5yl', 'template_02gpr5d', formData, '3bAooeODKHEgSgupo')
            .then(() => {
                alert("You’re all set! We’ll be in touch shortly.");
                setFormData(initialFormState);
            })
            .catch(() => {
                alert("Something went wrong. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const extensionTypes = [
        { name: 'Ground Floor', icon: '/photos/1.svg', path: '/GroundFloor' },
        { name: 'Loft', icon: '/photos/2.svg', path: '/Loft' },
        { name: 'First Floor', icon: '/photos/3.svg', path: '/FirstFloor' },
        { name: 'Other', icon: '/photos/4.svg' }
    ];

    const detailExtensionTypes = [
        { name: 'Garage - Conversion', icon: '/photos/o1.svg' },
        { name: 'Garden - Annex', icon: '/photos/o2.svg' },
        { name: 'Two Storey - Rear', icon: '/photos/o3.svg' },
        { name: 'Two Storey - Side', icon: '/photos/o4.svg' },
        { name: 'HMO', icon: '/photos/o5.svg' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#08294D] to-[#EBE382] p-5 text-[#312753] font-semibold">
            <div className="max-w-[60rem] mx-auto bg-white p-6 rounded-2xl shadow">
                <h1 className="text-[2rem] font-bold text-[#3E3168] mb-16 text-center uppercase border-b-2 pb-3">
                    Let’s Plan Your Extension
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Property Type Section */}
                    <PropertyTypeSection
                        formData={formData}
                        setFormData={setFormData}
                    />
                    {/* Extension Type Section */}
                    <div className="mb-12">
                        <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-5">
                            Which Floor Is This?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {extensionTypes.map((type) => (
                                type.path ? (
                                    <NavLink
                                        key={type.name}
                                        to={type.path}
                                        type="button"
                                        className={`px-4 py-5 cursor-pointer rounded-[40px] border border-[#EAEAEC] text-[1rem] hover:bg-[#e8e5f6] flex flex-col items-center shadow-md ${formData.extensionType === type.name ? 'border-[4px] !border-[#5F4AD2] bg-[#e8e5f6]' : 'bg-white'}`}
                                        onClick={() => setFormData({ ...formData, extensionType: type.name })}
                                    >
                                        <span className="mb-2">
                                            <img src={type.icon} className="w-[45px]" alt="" />
                                        </span>
                                        {type.name}
                                    </NavLink>
                                ) : (
                                    <button
                                        key={type.name}
                                        type="button"
                                        className={`px-4 py-5 cursor-pointer rounded-[40px] text-[1rem] hover:bg-[#e8e5f6] flex flex-col items-center shadow-md border-[4px] !border-[#5F4AD2] bg-[#e8e5f6]`}
                                        onClick={() => setFormData({ ...formData, extensionType: type.name })}
                                    >
                                        <span className="mb-2">
                                            <img src={type.icon} className="w-[45px]" alt="" />
                                        </span>
                                        {type.name}
                                    </button>
                                )
                            ))}
                        </div>
                    </div>

                    {/* Detail Extension Type Section */}
                    <div className="mb-24">
                        <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-3">
                            Select Other Type:
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {detailExtensionTypes.map((type) => (
                                <button
                                    key={type.name}
                                    type="button"
                                    className={`px-4 py-5 cursor-pointer rounded-[40px] border border-[#EAEAEC] text-[1rem] hover:bg-[#e8e5f6] flex flex-col items-center shadow-md ${formData.detailExtensionType === type.name ? 'border-[4px] !border-[#5F4AD2] bg-[#e8e5f6]' : 'bg-white'}`}
                                    onClick={() => setFormData({ ...formData, detailExtensionType: type.name })}
                                >
                                    <span className="mb-2">
                                        <img src={type.icon} className="w-[45px]" alt="" />
                                    </span>
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Common Form Section */}
                    <CommonFormSection
                        formData={formData}
                        setFormData={setFormData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        loading={loading}
                    />
                </form>
            </div>
        </div>
    );
}