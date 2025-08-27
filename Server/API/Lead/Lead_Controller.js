let Lead = require('./Lead_Model');



let Leads = async (req, res) => {
    let Data = await Lead.find();
    res.status(200).json(Data);
}




let Create = async (req, res) => {
    try {
        let { phone, address, email, propertyType, selectedExtensions, buildingRegulations, architecturalDesigns, planningPermission, whenStart, budget, fullName, postcode, hearAboutUs, acceptTerms, acceptUpdate, workDone } = req.body;

        let newData = new Lead({
            propertyType,
            selectedExtensions,
            buildingRegulations,
            architecturalDesigns,
            planningPermission,
            whenStart,
            budget,
            fullName,
            postcode,
            email: email ? email.trim().toLowerCase() : "",
            address,
            phone,
            hearAboutUs,
            acceptTerms: Boolean(acceptTerms),
            acceptUpdate: Boolean(true),
            workDone: Boolean(false)
        });


        await newData.save();
        res.status(200).json(newData);
        console.log('Created Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Creation Error!!!');
    }
};






let View = async (req, res) => {
    let viewOne = await Lead.findById(req.params.id);
    res.send(viewOne)
}




let Update = async (req, res) => {
    try {
        let { workDone } = req.body;

        let updateData = await Lead.findById(req.params.id);
        if (!updateData) return res.status(404).send('Lead not found');

        if (workDone !== undefined) {
            updateData.workDone = workDone;
        }

        await updateData.save();
        res.status(200).json(updateData);
        console.log('Updated Successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Updating Error!!!');
    }
};






let Delete = async (req, res) => {
    await Lead.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted')
}




module.exports = { Leads, Create, View, Update, Delete }