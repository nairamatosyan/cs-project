const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    index: {
        type: Number,
        required: true
    },
    parent:{
        type: Number,
        required: true
    },
    organization:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Organization'}
    ]
});

PositionSchema.statics.savePositions = async function(positions, parents, organizationId) {
    for (const index in positions) {
        const positionObj = new this({
            index,
            name: positions[index], 
            parent: (parents && parents[index] !== null) ? parents[index] : -1,
            organization: organizationId
        });
        await positionObj.save();
    }
    return 1;
}
PositionSchema.statics.getPositionData = async function(organizationId) {
    return Position.find({organization: organizationId}).sort('index');
}
const Position = mongoose.model('Position', PositionSchema);

module.exports = Position;