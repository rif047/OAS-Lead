export default function PropertyTypeSection({ formData, setFormData }) {
    const propertyTypes = [
        { name: 'Detached', icon: '/photos/detached.svg' },
        { name: 'Semi Detached', icon: '/photos/s detached.svg' },
        { name: 'Terrace', icon: '/photos/terrace.svg' },
        { name: 'Flat', icon: '/photos/flat.svg' },
        { name: 'Bungalow', icon: '/photos/bungalow.svg' }
    ];

    return (
        <div className="mb-12">
            <h2 className="text-[1.424rem] font-bold text-[#3E3168] mb-3">
                What kind of property is this?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {propertyTypes.map((type) => (
                    <button
                        key={type.name}
                        type="button"
                        className={`px-4 py-5 cursor-pointer rounded-[30px] border border-[#EAEAEC] text-[1rem] hover:bg-[#e8e5f6] flex flex-col items-center shadow-md ${formData.propertyType === type.name ? 'border-[4px] !border-[#117FC2] bg-[#e8e5f6]' : 'bg-white'}`}
                        onClick={() => setFormData({ ...formData, propertyType: type.name })}
                    >
                        <span className="mb-2">
                            <img src={type.icon} className="w-[45px]" alt="" />
                        </span>
                        {type.name}
                    </button>
                ))}
            </div>
        </div>
    );
};