module.exports.dashboard = function(application,req,res){
    
    if(req.session.autorizado !== true){
        res.send('usuario precisa fazer login');
        return;
    } 

    var connection = application.config.dbConnection;
    var ListarDebitosDAO = new application.app.models.listarDebitosDAO(connection);

    ListarDebitosDAO.consolidado(req.session.usuario, res,req)

        // res.render('dashboard', {nome_usuario : req.session.nome})


}

module.exports.sair = function(application,req,res){

    req.session.destroy(function(error){
        res.render('index',{validacao: {}});    
    });
    

}

module.exports.cadastrarDebitos = function(application,req,res){

    if(req.session.autorizado){
        res.render('cadastrarDebitos', {nome_usuario : req.session.nome})
    } else {
        res.render('index', {validacao : {}})
    }

}

module.exports.cadastrarCredito = function(application,req,res){

    if(req.session.autorizado){
        res.render('cadastrarCreditos', {nome_usuario : req.session.nome})
    } else {
        res.render('index', {validacao : {}})
    }

}

module.exports.enviarPagamentos = function(application,req,res){

    var debito = req.body;
    debito.usuario = req.session.usuario;
    var usuario = debito.usuario;
    
            req.assert('nome_debito', 'Nome da Conta nao pode ser vazio').notEmpty();
            req.assert('data_debito', 'Data do Debito nao pode ser vazio').notEmpty();
            req.assert('valor_debito', 'Valor do Debito nao pode ser vazio').notEmpty();
    
            var erros = req.validationErrors();
    
            if(erros){
                res.render('cadastrarDebitos', {validacao : erros})
                return;
            } else {

            var connection = application.config.dbConnection;
            var CadastroDebitos = new application.app.models.cadastroDebitosDAO(connection);
            var ListarDebitosDAO = new application.app.models.listarDebitosDAO(connection);
            
            
            CadastroDebitos.cadastrarDebito(debito, usuario);

            function teste(){
                
                return ListarDebitosDAO.consolidado(req.session.usuario, res,req)
            }
            
            setTimeout(teste,1500)

            // res.render('dashboard', {nome_usuario : req.session.nome, debitoConsolidado: {}})


            }
}

module.exports.enviarCreditos = function(application,req,res){

    console.log('ok')

    var credito = req.body;
    credito.usuario = req.session.usuario;
    var usuario = credito.usuario;
    
            req.assert('nome_credito', 'Nome do Credito nao pode ser vazio').notEmpty();
            req.assert('data_credito', 'Data do Credito nao pode ser vazio').notEmpty();
            req.assert('valor_credito', 'Valor do Credito nao pode ser vazio').notEmpty();
    
            var erros = req.validationErrors();
    
            if(erros){
                res.render('cadastrarDebitos', {validacao : erros})
                return;
            } else {

            var connection = application.config.dbConnection;

            console.log(credito);

            var CadastroCreditos = new application.app.models.cadastroCreditosDAO(connection);
            var ListarDebitosDAO = new application.app.models.listarDebitosDAO(connection);
            
            
            CadastroCreditos.cadastrarCredito(credito, usuario);

            function teste(){
                
                return ListarDebitosDAO.consolidado(req.session.usuario, res,req)
            }
            
            setTimeout(teste,1500)   

            // res.render('dashboard', {nome_usuario : req.session.nome, debitoConsolidado: {}})


            }
}