function UsuariosDAO(connection){
    this._connection = connection();
    
}

//INSERIR USUARIO

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    // console.log(usuario);
    // this._connection.open(function(err, mongoclient){
    //     mongoclient.collection("usuarios", function(err, collection){
    //         collection.insert(usuario);
    //         mongoclient.close();
    //     });
    // });
    // this._connection.query('insert into usuarios values (null, ?, ?, "teste@teste", ?, "17/02/1996" '),[usuario.nome,usuario.username, usuario.senha], (erro,resposta) => {
    //     console.log('usuario inserido com sucesso')
    // }

    // console.log(this._connection)

    this._connection.query('select * from usuarios', (err) => {
        console.log('teste')
    })
}

//AUTENTICA LOGIN

UsuariosDAO.prototype.autenticar = function(usuario,req,res,errosValidacao){
    this._connection.open(function(error,mongoclient){
        mongoclient.collection('usuarios', function(error,collection){
            collection.find({usuario : {$eq : usuario.usuario},
                            senha : {$eq : usuario.senha}})
                            .toArray(function(error, results){
                                
                                if(results[0] != undefined){

                                    req.session.autorizado = true;
                                    req.session.usuario = results[0].usuario
                                    req.session.nome = results[0].nome;


                                }

                                if(!req.session.autorizado){
                                    res.render('index', {validacao: errosValidacao})
                                    
                                } else {
                                    
                                    res.redirect("dashboard");
                                }

                            });
            
            mongoclient.close();
        })
    })
}

module.exports = function(){
    return UsuariosDAO;
}

