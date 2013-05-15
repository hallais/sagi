'use strict';

/* Factories */

sagi.factory('URLs', function(){
	var padrao = 'server/controller/';

	return {
		listarImpressoes 	: padrao + 'ListarImpressoes.php',
		listarImpressoras 	: padrao + 'ListarImpressoras.php',
		cadastrarImpressora : padrao + 'CadastrarImpressora.php'
	}
});

sagi.factory('ImpressoraJSON', function($resource, URLs){
	return $resource(URLs.listarImpressoras);
});