const Sequelize = require('sequelize');

const tag = sequelize.define('tag',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name :{
        type: Sequelize.STRING
    }
});


const getAll = () =>{}
const save = (datos) =>{}
const getOne = (id) =>{}
const update = (id,datos) =>{}
const deleteC = (id) =>{}


module.exports = {getAll,getOne,save,update,deleteC}