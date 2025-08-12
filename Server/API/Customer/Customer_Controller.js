let Customer = require('./Customer_Model');



let Customers = async (req, res) => {
    let Data = await Customer.find();
    res.status(200).json(Data);
}




let Create = async (req, res) => {
    try {
        let { name, phone, alt_phone, address, email, profession, comment } = req.body;

        if (!name) { return res.status(400).send('Customer Name is required!'); }
        if (!phone) { return res.status(400).send('Phone is required!'); }
        if (!address) { return res.status(400).send('Address is required!'); }


        let checkPhone = await Customer.findOne({ phone });
        if (checkPhone) { return res.status(400).send('Phone number already exists. Use different one.'); };



        let newData = new Customer({
            name,
            phone,
            alt_phone,
            address,
            email: email ? email.toLowerCase() : "",
            profession,
            comment,
        });

        await newData.save();
        res.status(200).json(newData);
        console.log('Created Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Creation Error!!!');
    }
}






let View = async (req, res) => {
    let viewOne = await Customer.findById(req.params.id);
    res.send(viewOne)
}




let Update = async (req, res) => {
    try {
        let { name, phone, alt_phone, address, email, profession, comment } = req.body;

        if (!name) { return res.status(400).send('Customer Name is required!'); }
        if (!phone) { return res.status(400).send('Phone is required!'); }
        if (!address) { return res.status(400).send('Address is required!'); }


        let checkPhone = await Customer.findOne({ phone: phone, _id: { $ne: req.params.id } });
        if (checkPhone) { return res.status(400).send('Phone number already exists. Use different one.'); }


        let updateData = await Customer.findById(req.params.id);

        updateData.name = name;
        updateData.phone = phone;
        updateData.alt_phone = alt_phone;
        updateData.address = address;
        updateData.email = email ? email.toLowerCase() : "";
        updateData.profession = profession;
        updateData.comment = comment;

        await updateData.save();
        res.status(200).json(updateData);
        console.log('Updated Successfully');

    } catch (error) {
        console.error(error);
        res.status(500).send('Updating Error!!!');
    }
}





let Delete = async (req, res) => {
    await Customer.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted')
}




module.exports = { Customers, Create, View, Update, Delete }