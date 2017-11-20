function PagamentosDAO(connection){
    this._connection = connection();
}

//INSERI DEBITO ZERADO

PagamentosDAO.prototype.cadastrarPagamentos = function(usuario){
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("contas", function(err, collection){
            collection.insert({
                usuario : usuario,
                creditos : [{
                    nome_do_credito: "credito inicial",
                    credito: 0,
                    
                }],
                debitos : [{
                    nome_do_debito: "debito inicial",
                    debito: 0,
                }]
            });
            mongoclient.close();
        });
    });
}

module.exports = function(){
    return PagamentosDAO;
}

