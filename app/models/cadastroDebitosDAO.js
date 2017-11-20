function DebitosDAO(connection){
    this._connection = connection();
}

//INSERIR USUARIO

DebitosDAO.prototype.cadastrarDebito = function(debito, usuario){
    
    console.log(debito.valor_debito)

    var debitoInt = parseInt(debito.valor_debito)


    

    this._connection.open(function(err, mongoclient){
        mongoclient.collection("contas", function(err, collection){
            collection.update(
                {usuario : usuario},
                    {
                        $push: {
                            debitos : {
                                $each : [{nome_do_debito : debito.nome_debito , debito : debitoInt}]
                            }
                        }
                    }
            )
            // mongoclient.close();
        });
    });
}





module.exports = function(){
    return DebitosDAO;
}

