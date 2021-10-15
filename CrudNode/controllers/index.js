module.exports ={
    getHomePage: (req,res) => {
        let sql = "SELECT * FROM players ORDER BY id ASC";

        //ejecutar la consulta
        db.query(sql, (err, result)=>{
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