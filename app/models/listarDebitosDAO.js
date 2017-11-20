function ListarDebitosDAO(connection){
    this._connection = connection();
}

//INSERIR USUARIO

ListarDebitosDAO.prototype.consolidado = function(usuario,res,req){
    
    this._connection.open(function(err, mongoclient){
        mongoclient.collection("contas", function(err, collection){
            collection.aggregate([{
                $match : {usuario : usuario}
            },
                {
                  $project: {
                    _id: 1,
                    usario: 1,
                    debitos: {
                      $reduce: {
                        input: "$debitos",
                        initialValue: 0,
                        in: { $add: [ "$$value", "$$this.debito" ] }
                      }
                    },
                    creditos: {
                      $reduce: {
                        input: "$creditos",
                        initialValue: 0,
                        in: { $add: [ "$$value", "$$this.credito" ] }
                      }
                    }
                  }
                }
               ])
            
            .toArray(function(error, results){

                console.log(results)
                
                var debitoConsolidado = results[0].debitos;
                var creditoConsolidado = results[0].creditos;

                

                res.render('dashboard', {debitoConsolidado,nome_usuario: req.session.nome,creditoConsolidado})

            });
            // mongoclient.close();
        });
    });  
}


module.exports = function(){
    return ListarDebitosDAO;
}



// this._connection.open(function(err, mongoclient){
//     mongoclient.collection("contas", function(err, collection){
//         collection.aggregate([{
//             $match : {usuario : usuario}},{
//             $unwind: "$debitos" 
//         },{
//             $unwind: "$creditos"
//         }, {
//             $group: {
//                 "_id" : usuario,
//                 "debitos": {
//                     $sum: "$debitos.debito"
//                 },
//                 "creditos" : {
//                     $sum: "$creditos.credito"
//                 }

//             }
//         }])
//         .toArray(function(error, results){

//             console.log(results)
            
//             var debitoConsolidado = results[0].debitos;
//             var creditoConsolidado = results[0].creditos;

//             res.render('dashboard', {debitoConsolidado,creditoConsolidado,nome_usuario: req.session.nome,creditoConsolidado})

//         });
//         // mongoclient.close();
//     });
// }); 