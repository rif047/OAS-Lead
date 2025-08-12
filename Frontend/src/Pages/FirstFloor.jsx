import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import CommonFormSection from '../Components/CommonFormSection';
import PropertyTypeSection from '../Components/PropertyTypeSection';

export default function AllExtensions() {
    // Form state initialization
    const initialFormState = {
        propertyType: '',
        selectedExtensions: [], // Stores {floorType, extensionName} objects
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
    const [currentFloorType, setCurrentFloorType] = useState('');

    // Extension categories
    const extensionCategories = [
        { name: 'Ground Floor', icon: '/photos/1.svg' },
        { name: 'Loft', icon: '/photos/2.svg' },
        { name: 'First Floor', icon: '/photos/3.svg' },
        { name: 'Other', icon: '/photos/4.svg' }
    ];

    // Extension options for each category
    const extensionOptions = {
        'Ground Floor': [
            { name: 'Rear', icon: '/photos/g1.svg' },
            { name: 'Side Infill', icon: '/photos/g2.svg' },
            { name: 'Side', icon: '/photos/g3.svg' },
            { name: 'Wraparound', icon: '/photos/g4.svg' },
            { name: 'Side And Rear', icon: '/photos/g5.svg' }
        ],
        'First Floor': [
            { name: 'Side And Rear', icon: '/photos/f1.svg' },
            { name: 'Rear', icon: '/photos/f2.svg' },
            { name: 'Rear Over Outrigger', icon: '/photos/f3.svg' },
            { name: 'Rear Over Ground Floor', icon: '/photos/f4.svg' },
            { name: 'Side', icon: '/photos/f5.svg' }
        ],
        'Loft': [
            { name: 'Main Dormer', icon: '/photos/l1.svg' },
            { name: 'Outrigger Dormer', icon: '/photos/l2.svg' },
            { name: 'Hip To Gable With Dormer', icon: '/photos/l3.svg' },
            { name: 'Hip To Gable With No Dormer', icon: '/photos/l4.svg' },
            { name: 'L Shaped Dormer', icon: '/photos/l5.svg' }
        ],
        'Other': [
            { name: 'Garage - Conversion', icon: '/photos/o1.svg' },
            { name: 'Garden - Annex', icon: '/photos/o2.svg' },
            { name: 'Two Storey - Rear', icon: '/photos/o3.svg' },
            { name: 'Two Storey - Side', icon: '/photos/o4.svg' },
            { name: 'HMO', icon: '/photos/o5.svg' }
        ]
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Toggle extension selection
    const toggleExtensionSelection = (floorType, extensionName) => {
        setFormData(prev => {
            // Check if this extension type exists from any floor
            const existingIndex = prev.selectedExtensions.findIndex(
                ext => ext.extensionName === extensionName
            );

            if (existingIndex >= 0) {
                // If same extension from different floor, replace it
                if (prev.selectedExtensions[existingIndex].floorType !== floorType) {
                    const updated = [...prev.selectedExtensions];
                    updated[existingIndex] = { floorType, extensionName };
                    return { ...prev, selectedExtensions: updated };
                }
                // If same floor and extension, remove it
                return {
                    ...prev,
                    selectedExtensions: prev.selectedExtensions.filter(
                        (_, index) => index !== existingIndex
                    )
                };
            }

            // Add new selection
            return {
                ...prev,
                selectedExtensions: [
                    ...prev.selectedExtensions,
                    { floorType, extensionName }
                ]
            };
        });
    };

    // Check if extension is selected
    const isExtensionSelected = (floorType, extensionName) => {
        return formData.selectedExtensions.some(
            ext => ext.floorType === floorType && ext.extensionName === extensionName
        );
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.selectedExtensions.length === 0) {
            alert("Please select at least one extension type");
            return;
        }

        const isFormValid = Object.entries(formData).every(([key, value]) => {
            if (key === 'selectedExtensions') return value.length > 0;
            if (typeof value === 'boolean') return true;
            return String(value).trim() !== '';
        });

        if (!isFormValid) {
            alert("Completion of all fields is required.");
            return;
        }

        setLoading(true);

        // Prepare data for email submission
        const submissionData = {
            ...formData,
            extensions: formData.selectedExtensions
                .map(ext => `${ext.floorType} - ${ext.extensionName}`)
                .join(', ')
        };

        emailjs.send('service_9kre5yl', 'template_02gpr5d', submissionData, '3bAooeODKHEgSgupo')
            .then(() => {
                alert("You're all set! We'll be in touch shortly.");
                setFormData(initialFormState);
                setCurrentFloorType('');
            })
            .catch(() => {
                alert("Something went wrong. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#08294D] to-[#EBE382] p-5 text-[#312753] font-semibold">
            <div className="max-w-[60rem] mx-auto bg-white p-6 rounded-2xl shadow">
                <h1 className="text-[2rem] font-bold text-[#3E3168] mb-16 text-center uppercase border-b-2 pb-3">
                    Let's Plan Your Extension
                </h1>

                <form onSubmit={handleSubmit}>
                    {/* Property Type Section */}
                    <PropertyTypeSection
                        formData={formData}
                        setFormData={setFormData}
                    />

                    {/* Floor Type Selection */}
                    <div className="mb-12">
                        <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-5">
                            Which Floor Is This?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {extensionCategories.map((category) => (
                                <button
                                    key={category.name}
                                    type="button"
                                    className={`px-4 py-5 cursor-pointer rounded-[40px] border text-[1rem] flex flex-col items-center shadow-md ${currentFloorType === category.name
                                            ? 'border-[4px] !border-[#5F4AD2] bg-[#e8e5f6]'
                                            : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                        }`}
                                    onClick={() => setCurrentFloorType(category.name)}
                                >
                                    <span className="mb-2">
                                        <img src={category.icon} className="w-[45px]" alt="" />
                                    </span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Extension Options */}
                    {currentFloorType && (
                        <div className="mb-24">
                            <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-3">
                                Select {currentFloorType} Extension Types
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {extensionOptions[currentFloorType]?.map((extension) => (
                                    <button
                                        key={extension.name}
                                        type="button"
                                        className={`px-4 py-5 cursor-pointer rounded-[40px] border text-[1rem] flex flex-col items-center shadow-md ${isExtensionSelected(currentFloorType, extension.name)
                                                ? 'border-[4px] !border-[#5F4AD2] bg-[#e8e5f6]'
                                                : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                            }`}
                                        onClick={() => toggleExtensionSelection(currentFloorType, extension.name)}
                                    >
                                        <span className="mb-2">
                                            <img src={extension.icon} className="w-[45px]" alt="" />
                                        </span>
                                        {extension.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Selected Extensions Display */}
                    {formData.selectedExtensions.length > 0 && (
                        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold mb-2">Selected Extensions:</h3>
                            <div className="flex flex-wrap gap-2">
                                {formData.selectedExtensions.map((ext, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#5F4AD2] text-white rounded-full text-sm"
                                    >
                                        {ext.floorType} - {ext.extensionName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

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