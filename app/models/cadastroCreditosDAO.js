function CreditosDAO(connection){
    this._connection = connection();
}

//INSERIR USUARIO

CreditosDAO.prototype.cadastrarCredito = function(credito, usuario){

    var creditoInt = parseInt(credito.valor_credito);       

    this._connection.open(function(err, mongoclient){
        mongoclient.collection("contas", function(err, collection){
            collection.update(
                {usuario : usuario},
                    {
                        $push: {
                            creditos : {
                                $each : [{nome_do_credito : credito.nome_credito , credito : creditoInt}]
                            }
                        }
                    }
            )
            // mongoclient.close();
        });
    });
}





module.exports = function(){
    return CreditosDAO;
}

