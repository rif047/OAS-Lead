const CommonFormSection = ({ formData, handleChange, loading }) => {
    const FORM_OPTIONS = {
        architecturalDesigns: [
            'Yes',
            'No'
        ],
        buildingRegulations: [
            'Yes',
            'No',
            "I don't know"
        ],
        planningPermission: [
            'Yes',
            'Under permitted development',
            "I don't know",
            'No'
        ],
        budget: [
            '< £30k',
            '£30k - £70k',
            '£70k - £150k',
            '£150k - £250k',
            '£250k +',
            "I don't know"
        ],
        whenStart: [
            'ASAP',
            '3 Months',
            '6 Months',
            '12 Months',
            '18+ Months',
            "I'm not sure",
        ],
        hearAboutUs: [
            "I can't remember",
            "Search engine",
            "Facebook / Instagram",
            "Recommended by a friend / colleague",
            "Press",
            "Blog",
            "Pinterest",
            "LinkedIn",
            "Other",
        ]
    };

    const handleButtonClick = (fieldName, value) => {
        handleChange({ target: { name: fieldName, value } });
    };

    return (
        <div className="space-y-6 mt-20">
            {/* Architectural Designs */}
            <div className="mb-12">
                <h2 className="text-lg font-bold text-[#3E3168] mb-3">Have architectural designs been prepared?</h2>
                <div className="grid grid-cols-2 gap-2">
                    {FORM_OPTIONS.architecturalDesigns.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`text-gray-500 px-4 py-3 rounded-lg border text-sm ${formData.architecturalDesigns === option
                                ? 'border-[3px] border-[#117FC2] bg-[#e8e5f6]'
                                : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                }`}
                            onClick={() => handleButtonClick('architecturalDesigns', option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Building Regulations */}
            <div className="mb-12">
                <h2 className="text-lg font-bold text-[#3E3168] mb-3">Do you have building regulations drawings?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {FORM_OPTIONS.buildingRegulations.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`text-gray-600 px-4 py-3 rounded-lg border text-sm ${formData.buildingRegulations === option
                                ? 'border-[3px] border-[#117FC2] bg-[#e8e5f6]'
                                : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                }`}
                            onClick={() => handleButtonClick('buildingRegulations', option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Planning Permission */}
            <div className="mb-12">
                <h2 className="text-lg font-bold text-[#3E3168] mb-3">Has planning permission been obtained?</h2>
                <div className="grid grid-cols-2 gap-2">
                    {FORM_OPTIONS.planningPermission.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`text-gray-600 px-4 py-3 rounded-lg border text-sm ${formData.planningPermission === option
                                ? 'border-[3px] border-[#117FC2] bg-[#e8e5f6]'
                                : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                }`}
                            onClick={() => handleButtonClick('planningPermission', option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Budget */}
            <div className="mb-12">
                <h2 className="text-lg font-bold text-[#3E3168] mb-3">What is your estimated budget?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {FORM_OPTIONS.budget.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`text-gray-600 px-4 py-3 rounded-lg border text-sm ${formData.budget === option
                                ? 'border-[3px] border-[#117FC2] bg-[#e8e5f6]'
                                : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                }`}
                            onClick={() => handleButtonClick('budget', option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>


            {/* When Start */}
            <div className="mb-12">
                <h2 className="text-lg font-bold text-[#3E3168] mb-3">When are you hoping to start the design process?</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {FORM_OPTIONS.whenStart.map(option => (
                        <button
                            key={option}
                            type="button"
                            className={`text-gray-600 px-4 py-3 rounded-lg border text-sm ${formData.whenStart === option
                                ? 'border-[3px] border-[#117FC2] bg-[#e8e5f6]'
                                : 'border-[#EAEAEC] bg-white hover:bg-[#e8e5f6]'
                                }`}
                            onClick={() => handleButtonClick('whenStart', option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>





            {/* Contact Details */}
            <div>
                <h2 className="text-lg font-bold text-[#3E3168] mb-4">Your Contact Details</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name*"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-2 rounded-lg border border-[#EAEAEC]"
                    />

                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone*"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-2 rounded-lg border border-[#EAEAEC]"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-2 rounded-lg border border-[#EAEAEC]"
                    />

                    <input
                        type="text"
                        name="address"
                        placeholder="Address*"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-2 rounded-lg border border-[#EAEAEC]"
                    />
                    <input
                        type="text"
                        name="postcode"
                        placeholder="Postcode*"
                        value={formData.postcode}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-2 rounded-lg border border-[#EAEAEC]"
                    />
                    <select
                        name="hearAboutUs"
                        value={formData.hearAboutUs}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full p-2 rounded-lg border border-[#EAEAEC]"
                    >
                        <option value="">Where did you hear about us?*</option>
                        {FORM_OPTIONS.hearAboutUs.map(option => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Checkboxes */}
            <div className="mb-2 !mt-12">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        required
                        className="mr-3 h-4 w-4"
                        disabled={loading}
                    />
                    <span className="text-sm">I accept the terms and conditions*</span>
                </label>
            </div>
            {/* <div className="mb-4">
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        name="acceptUpdate"
                        checked={formData.acceptUpdate}
                        onChange={handleChange}
                        className="mr-3 h-4 w-4"
                        disabled={loading}
                    />
                    <span className="text-sm">Keep me updated on news and offers</span>
                </label>
            </div> */}
        </div>
    );
};

export default CommonFormSection;
