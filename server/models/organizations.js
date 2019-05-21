const path = process.cwd();
const Organization = require(`${path}/schemas/organizations.js`);
const Position = require(`${path}/schemas/positions.js`);
const Employee = require(`${path}/schemas/employees.js`);

const getAllOrganizations = async id => {
    if (!id) {
        return [];
    }
    return await Organization.getUserOrganizations(id);
}

const addNewOrg = async ({ data }, id) => {
    const organization = await Organization.addNew(data.name, id);
    return await Position.savePositions(data.positions, data.parents, organization._id)
}

const addNewPosition = async (data) => {
    const parent = await Position.find({ _id: data.parent });
    const maxIndexPosition = await Position.find({organization: parent[0].organization}).sort({index: -1}).limit(1);
    const position = new Position({
        name: data.name,
        index: maxIndexPosition[0].index + 1,
        parent: parent[0].index,
        organization: parent[0].organization
    })
    await position.save();
}

const getOrganizationData = async (id) => {
    const organization = await Organization.getOrganizationData(id);
    const positions = await Position.getPositionData(id);
    const positionIds = [];
    const positionData = [];
    for (position of positions) {
        positionIds.push(position._id);
        positionData.push({
            id: position._id,
            name: position.name
        })
    }
    const employees = await Employee.getEmployeesData(positionIds) || [0];
    const data = {data: [], nodes: []};
    let flag = false;
    for (positionParent of positions) {
        if (positionParent.parent == -1) {
            rootEmployees = employees.filter(item => item.position[0] == String(positionParent._id));
            if (rootEmployees.length) {
                flag = true;
                for (key in rootEmployees) {
                    rootEmployee = rootEmployees[key];
                    data.nodes.push({
                        id: positionParent.name,
                        title: rootEmployee.name,
                        description: rootEmployee.salary_amount
                    })
                }
            }
        }
        for (positionChild of positions) {
            if (positionParent.index === positionChild.parent) {
                positionEmployees = employees.filter(item => item.position[0] == String(positionChild._id));
                
                if (positionEmployees.length) {
                    for (key in positionEmployees) {
                        positionEmployee = positionEmployees[key];
                        data.data.push([positionParent.name, positionChild.name + key]);
                        const startDate = new Date(positionEmployee.start_date);
                        const endDate = new Date(positionEmployee.end_date);
                        data.nodes.push({
                            id: positionChild.name + key,
                            title: positionEmployee.name,
                            description: 'Date Range: ' + startDate.toLocaleDateString("en-US") + ' - ' + endDate.toLocaleDateString("en-US") + 
                            ' Salary Amount: ' + positionEmployee.salary_amount
                        })
                    }
                } else {
                    data.data.push([positionParent.name, positionChild.name]);
                    if (positionParent.parent != -1 || !flag) {
                        data.nodes.push({
                            id: positionParent.name,
                            title: positionParent.name
                        })
                    }
                }
            }
        }
    }
    if (!data.data.length) {
        data.data.push([positions[0].name, positions[0].name]);
    }
    return { organization, positionData, data };
}

module.exports = {
    getAllOrganizations,
    addNewOrg,
    getOrganizationData,
    addNewPosition
}