let Client = require('./Client_Model');



let Clients = async (req, res) => {
    let Data = await Client.find();
    res.status(200).json(Data);
}




let Create = async (req, res) => {
    try {
        let { name, phone, alt_phone, address, email, profession, comment, clientType } = req.body;

        if (!name) { return res.status(400).send('Client Name is required!'); }
        if (!phone) { return res.status(400).send('Phone is required!'); }
        if (!address) { return res.status(400).send('Address is required!'); }


        let checkPhone = await Client.findOne({ phone });
        if (checkPhone) { return res.status(400).send('Phone number already exists. Use different one.'); };



        let newData = new Client({
            name,
            phone,
            alt_phone,
            address,
            email: email ? email.toLowerCase() : "",
            clientType,
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
    let viewOne = await Client.findById(req.params.id);
    res.send(viewOne)
}




let Update = async (req, res) => {
    try {
        let { name, phone, alt_phone, address, email, profession, comment, clientType } = req.body;

        if (!name) { return res.status(400).send('Client Name is required!'); }
        if (!phone) { return res.status(400).send('Phone is required!'); }
        if (!address) { return res.status(400).send('Address is required!'); }


        let checkPhone = await Client.findOne({ phone: phone, _id: { $ne: req.params.id } });
        if (checkPhone) { return res.status(400).send('Phone number already exists. Use different one.'); }


        let updateData = await Client.findById(req.params.id);

        updateData.name = name;
        updateData.phone = phone;
        updateData.alt_phone = alt_phone;
        updateData.address = address;
        updateData.email = email ? email.toLowerCase() : "";
        updateData.clientType = clientType;
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
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).send('Deleted')
}




module.exports = { Clients, Create, View, Update, Delete }