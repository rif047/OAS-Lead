import { useState } from 'react';
import CommonFormSection from '../Components/CommonFormSection';
import PropertyTypeSection from '../Components/PropertyTypeSection';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

const EXTENSION_DATA = {
    categories: [
        { name: 'Ground Floor', icon: '/photos/1.svg' },
        { name: 'Loft', icon: '/photos/2.svg' },
        { name: 'First Floor', icon: '/photos/3.svg' },
        { name: 'Double Storey', icon: '/photos/5.svg' },
        { name: 'Other', icon: '/photos/4.svg' }
    ],
    options: {
        'Ground Floor': [
            { name: 'Rear', icon: '/photos/g1.svg' },
            { name: 'Side Infill', icon: '/photos/g2.svg' },
            { name: 'Side', icon: '/photos/g3.svg' },
            { name: 'Wraparound', icon: '/photos/g4.svg' },
            { name: 'Side And Rear', icon: '/photos/g5.svg' }
        ],
        'First Floor': [
            { name: 'Side And Rear', icon: '/photos/f1.svg' },
            { name: 'Rear-First Floor', icon: '/photos/f2.svg' },
            { name: 'Rear Over Outrigger', icon: '/photos/f3.svg' },
            { name: 'Rear Over Ground Floor', icon: '/photos/f4.svg' },
            { name: 'Side-First Floor', icon: '/photos/f5.svg' }
        ],
        'Double Storey': [
            { name: 'Two Double – Rear', icon: '/photos/d1.svg' },
            { name: 'Two Double – Side', icon: '/photos/d2.svg' },
        ],
        'Loft': [
            { name: 'Main Dormer', icon: '/photos/l1.svg' },
            { name: 'Outrigger Dormer', icon: '/photos/l2.svg' },
            { name: 'Hip To Gable With Dormer', icon: '/photos/l3.svg' },
            { name: 'Hip To Gable No Dormer', icon: '/photos/l4.svg' },
            { name: 'L Shaped Dormer', icon: '/photos/l5.svg' }
        ],
        'Other': [
            { name: 'Garage - Conversion', icon: '/photos/o1.svg' },
            { name: 'Garden - Annex', icon: '/photos/o2.svg' },
            { name: 'Flat Conversion', icon: '/photos/g2.svg' },
            { name: 'Structural Calculation', icon: '/photos/2.svg' },
            { name: 'HMO', icon: '/photos/o5.svg' },
            { name: 'Party Wall Servey', icon: '/photos/o5.svg' },
            { name: 'Regulation Drawing', icon: '/photos/l5.svg' },
            { name: 'Interior Design', icon: '/photos/f5.svg' },
        ]
    }
};

export default function AllExtensions() {
    const [formData, setFormData] = useState({
        propertyType: '',
        selectedExtensions: [],
        buildingRegulations: '',
        architecturalDesigns: '',
        planningPermission: '',
        whenStart: '',
        budget: '',
        fullName: '',
        postcode: '',
        email: '',
        address: '',
        phone: '',
        hearAboutUs: '',
        acceptTerms: false,
        acceptUpdate: false
    });

    const [loading, setLoading] = useState(false);
    const [currentFloorType, setCurrentFloorType] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleExtension = (floorType, extensionName) => {
        setFormData(prev => {
            const existingIndex = prev.selectedExtensions.findIndex(
                ext => ext.extensionName === extensionName
            );

            if (existingIndex >= 0) {
                if (prev.selectedExtensions[existingIndex].floorType !== floorType) {
                    const updated = [...prev.selectedExtensions];
                    updated[existingIndex] = { floorType, extensionName };
                    return { ...prev, selectedExtensions: updated };
                }
                return {
                    ...prev,
                    selectedExtensions: prev.selectedExtensions.filter((_, i) => i !== existingIndex)
                };
            }

            return {
                ...prev,
                selectedExtensions: [...prev.selectedExtensions, { floorType, extensionName }]
            };
        });
    };

    const isSelected = (floorType, extensionName) => {
        return formData.selectedExtensions.some(
            ext => ext.floorType === floorType && ext.extensionName === extensionName
        );
    };

    const validateForm = () => {
        const {
            propertyType,
            selectedExtensions,
            buildingRegulations,
            architecturalDesigns,
            planningPermission,
            budget,
            fullName,
            postcode,
            email,
            address,
            phone,
            hearAboutUs,
            acceptTerms
        } = formData;

        if (
            !propertyType ||
            selectedExtensions.length === 0 ||
            !buildingRegulations ||
            !architecturalDesigns ||
            !planningPermission ||
            !budget ||
            !fullName ||
            !postcode ||
            !email ||
            !address ||
            !phone ||
            !hearAboutUs ||
            !acceptTerms
        ) {
            alert('Please fill in all required fields and select at least one extension.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://server.onlinearchitecturalservices.com/api/leads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    email: formData.email.trim().toLowerCase(),
                    acceptTerms: Boolean(formData.acceptTerms),
                    acceptUpdate: Boolean(true),
                    workDone: Boolean(false)
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            alert("Thank you for your submission! We'll be in touch shortly.");

            setFormData({
                propertyType: '',
                selectedExtensions: [],
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
            });

            setCurrentFloorType('');
        } catch (error) {
            console.error('Submission failed:', error);
            alert("There was an error submitting your form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-[#eeebfb] to-[#EBE3C0] p-2 md:p-5 text-[#312753] font-semibold">
            <div className="max-w-[56rem] mx-auto bg-white p-4 md:p-12 rounded-2xl shadow-2xl">
                <div className=''>
                    <a href='https://onlinearchitecturalservices.com' className='border px-5 py-2 bg-slate-200 shadow-md rounded-lg hover:shadow-xl'>
                        <ArrowBackOutlinedIcon />
                        <span className='ml-1'>Home</span>
                    </a>

                    <h1 className="text-[2rem] font-bold text-[#3E3168] mb-16 text-center uppercase border-b-2 pb-3 mt-4">
                        Let's Plan For Your Project
                    </h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <PropertyTypeSection
                        formData={formData}
                        setFormData={setFormData}
                    />

                    <div className="mb-12">
                        <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-5">
                            Where is this?
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {EXTENSION_DATA.categories.map((category) => (
                                <button
                                    key={category.name}
                                    type="button"
                                    className={`px-4 py-5 cursor-pointer rounded-[30px] border text-[1rem] flex flex-col items-center shadow-md ${currentFloorType === category.name
                                        ? 'border-[4px] !border-[#117FC2] bg-[#e8e5f6]'
                                        : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                        }`}
                                    onClick={() => setCurrentFloorType(category.name)}
                                >
                                    <span className="mb-2">
                                        <img src={category.icon} className="w-[45px]" alt={category.name} />
                                    </span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {currentFloorType && (
                        <div className="mb-12">
                            <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-3">
                                Select {currentFloorType} extension types
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {EXTENSION_DATA.options[currentFloorType]?.map((extension) => (
                                    <button
                                        key={extension.name}
                                        type="button"
                                        className={`px-4 py-5 cursor-pointer rounded-[30px] border text-[1rem] flex flex-col items-center shadow-md ${isSelected(currentFloorType, extension.name)
                                            ? 'border-[4px] !border-[#117FC2] bg-[#e8e5f6]'
                                            : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                            }`}
                                        onClick={() => toggleExtension(currentFloorType, extension.name)}
                                    >
                                        <span className="mb-2">
                                            <img src={extension.icon} className="w-[45px]" alt={extension.name} />
                                        </span>
                                        {extension.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {formData.selectedExtensions.length > 0 && (
                        <div className="mb-24 px-4 py-6 bg-gray-100 rounded-xl shadow-md">
                            <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-5">Selected Extensions:</h2>
                            <div className="flex flex-wrap gap-2">
                                {formData.selectedExtensions.map((ext, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-[#117FC2] text-white rounded-full text-sm"
                                    >
                                        {ext.floorType} - {ext.extensionName}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <CommonFormSection
                        formData={formData}
                        handleChange={handleChange}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-12 w-full py-3 rounded-lg text-[1rem] bg-[#117FC2] text-white font-bold px-8 text-lg transition-colors duration-300 hover:bg-white hover:text-[#117FC2] border hover:border-[#117FC2]"
                    >
                        {loading ? 'Submitting...' : 'Get me build quotes'}
                    </button>
                </form>
            </div>
        </div>
    );
}