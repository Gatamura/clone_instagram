module.exports = function(application){
	application.get('/dashboard', function(req, res){
		application.app.controllers.dashboard.dashboard(application,req,res);
	});

	application.get('/sair', function(req,res){
		application.app.controllers.dashboard.sair(application,req,res);
	});

	application.get('/cadastrarDebitos', function(req,res){
		application.app.controllers.dashboard.cadastrarDebitos(application,req,res);
	})

	application.get('/cadastrarCreditos', function(req,res){
		application.app.controllers.dashboard.cadastrarCredito(application,req,res);
	})
	
	application.post('/dashboard', function(req,res){
		application.app.controllers.dashboard.enviarPagamentos(application,req,res);
	})

	application.post('/enviarCreditos', function(req,res){
		application.app.controllers.dashboard.enviarCreditos(application,req,res);
	})

}

