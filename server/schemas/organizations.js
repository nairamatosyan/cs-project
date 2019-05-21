const mongoose = require('mongoose');

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
});
OrganizationSchema.statics.getUserOrganizations = function(id) {
    return Organization.find({ user: id });
}

OrganizationSchema.statics.addNew = async function(name, id) {
    console.log(1111, name);
    const organization = new this({
        name,
        user: id
    });
    await organization.save();
    
    return organization;
}

OrganizationSchema.statics.getOrganizationData = function(id) {
    return Organization.find({_id: id});
}

const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
