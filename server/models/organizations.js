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
    // const employees = await Employee.getEmployeesData(positionIds);
    const data = {data: [], nodes: []};
    for (positionParent of positions) {
        for (positionChild of positions) {
            if (positionParent.index === positionChild.parent) {
                data.data.push([positionParent.name, positionChild.name]);
            }
        }
        data.nodes.push({
            id: positionParent.name,
            title: positionParent.name
        })
    }
    return { organization, positionData, data };
}

module.exports = {
    getAllOrganizations,
    addNewOrg,
    getOrganizationData
}