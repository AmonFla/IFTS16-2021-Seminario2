module.exports ={
    getHomePage: (req,res) => {
        let query = "SELECT * FROM players ORDER BY id ASC";

        //ejecutar la consulta
        db.query(query, (err, result)=>{
            if(err){
                res.redirect('/');
            }
            res.render('index.ejs',{
                title: 'Hola Mundo',
                players: result
            });
        });
    },

};