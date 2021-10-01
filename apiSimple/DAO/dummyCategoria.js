let Sample = [
    {"Id": '1', "Name" : 'Categoría 01'},
    {"Id": '2', "Name" : 'Categoría 02'},
    {"Id": '3', "Name" : 'Categoría 03'},
    {"Id": '4', "Name" : 'Categoría 04'},
    {"Id": '5', "Name" : 'Categoría 05'}
];

function getAll(){
    return Sample;
}


const getOne = (id) => {return Sample.find(categoria => categoria.Id === id)}

const save = (datos) =>{
    Sample.push(datos);
    return Sample[Sample.length-1];
}

const update = (id,datos) =>{
    let index = Sample.findIndex(categoria => categoria.Id === id );
    if (index == null){
        return index;
    }
    Sample[index] = datos;
    return Sample[index];
}

const deleteC = (id) => {
    let index = Sample.findIndex(categoria => categoria.Id === id );
    if (index == null){
        return index;
    }
    Sample.splice(index,1)
    return 200;
}
module.exports = {getAll,getOne,save,update,deleteC}