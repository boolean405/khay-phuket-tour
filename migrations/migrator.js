const fs = require('fs');
const Helper = require('../utils/helper');
const UserDB = require('../models/user');
const RoleDB = require('../models/role');
const PermitDB = require('../models/permit');

const migrate = async () => {
    let data = fs.readFileSync('./migrations/users.json');
    if (data) {
        let users = JSON.parse(data);
        users.forEach(async (user) => {
            user.password = Helper.encode(user.password);
            let dbUserName = await UserDB.findOne({ name: user.name });
            if (dbUserName) {
                console.log(`${user.name} User is already exist, so skipped`);
            } else {
                let result = await new UserDB(user).save();
                console.log(`${user.name} User migration success`);
            }
        })
    }
}

const rolePermitMigrate = () => {
    let data = fs.readFileSync('./migrations/role_permit.json');
    if (data) {
        let rolePermit = JSON.parse(data);
        rolePermit.roles.forEach(async (role) => {
            let dbRoleName = await RoleDB.findOne({ name: role.name });
            if (dbRoleName) {
                console.log(`${role.name} Role is already exist, so skipped`)
            } else {
                let result = await new RoleDB(role).save();
                console.log(`${role.name} Role migration success`);
            }
        });

        rolePermit.permits.forEach(async (permit) => {
            let dbPermitName = await PermitDB.findOne({ name: permit.name });
            if (dbPermitName) {
                console.log(`${permit.name} Permit is already exist, so skipped`)
            } else {
                let result = await new PermitDB(permit).save();
                console.log(`${permit.name} Permit migration success`);
            }
        });
    }
}

const addRoleToUser = async (roleName, userName) => {
    let dbOwner = await UserDB.findOne({ name: roleName });
    let ownerRole = await RoleDB.findOne({ name: userName });
    if (dbOwner && ownerRole) {
        let result = await UserDB.findByIdAndUpdate(dbOwner._id, { $addToSet: { roles: ownerRole._id } }).populate('roles');
        console.log(`${roleName} Role is added to ${userName} User`);
    }
}

const backup = async () => {
    let users = await UserDB.find();
    let roles = await RoleDB.find();
    let permits = await PermitDB.find();
    
    fs.writeFileSync('./migrations/backups/users.json', JSON.stringify(users));
    fs.writeFileSync('./migrations/backups/roles.json', JSON.stringify(roles));
    fs.writeFileSync('./migrations/backups/permits.json', JSON.stringify(permits));
    console.log('All Databases Backup Finished');
}
module.exports = {
    migrate,
    rolePermitMigrate,
    addRoleToUser,
    backup
}

