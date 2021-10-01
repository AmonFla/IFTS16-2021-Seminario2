const Sequelize = require('sequelize');

const Category = sequelize.define('category',{ 
    catId:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name :{
        type: Sequelize.STRING
    }
});


/* const getAll = async () =>{
    const data = await category
     .findAll()
     .then(categories =>{
          return categories
     }).catch( err =>{
         console.log("Error category.getAll", err)
         return null;
     } )
    return data;
}*/

const getAll = () =>
    Category.findAll()
      .then(categories =>{
          return categories 
        })
      .catch( err =>{
          console.log("Error category.getAll", err);
           return null; 
        } ) 


const getOne = (id) => 
    Category
      .findByPk(id)
      .then(category =>{
        return category 
      })
      .catch( err =>{
        console.log("Error category.getOne", err);
         return null; 
      } ) 

const save = (datos) =>{}

const update = (id,datos) =>{}
const deleteC = (id) =>{}


module.exports = {getAll,getOne,save,update,deleteC}