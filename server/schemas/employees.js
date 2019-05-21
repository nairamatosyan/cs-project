const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    salary_amount: {
        type: Number,
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    position:[
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Position'
        }
    ]
});

EmployeeSchema.statics.getEmployeesData = async function(positionIds) {
    return Employee.find({position: { '$in': positionIds}});
}

EmployeeSchema.statics.addNewEmployee = async function(data) {
    const employee = new this({
        name: data.name,
        salary_amount: data.salary,
        position: data.position,
        start_date: data['range-picker'][0],
        end_date: data['range-picker'][1]
    });
    employee.save();
}

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;