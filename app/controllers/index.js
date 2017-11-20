module.exports.index = function(application,req,res){
    res.render('index.ejs', {validacao : {}});    
}

module.exports.autenticar = function(application,req,res){
    
    var dadosForm = req.body;

    var usuario = dadosForm.usuario

    req.assert('usuario','usuario nao deve ser vazio').notEmpty();
    req.assert('senha','senha nao deve ser vazia').notEmpty();

    var errosValidacao = req.validationErrors();

    if(errosValidacao){
        res.render('index', {validacao: errosValidacao})
        return
    }

    var connection = application.config.dbConnection;
    var UsuariosDAO = new application.app.models.usuariosDAO(connection);
    // var testando = new application.app.models.usuariosDAO(connection);

    // testando.teste();

    UsuariosDAO.autenticar(dadosForm,req,res,errosValidacao);

    
}