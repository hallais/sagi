'use strict';

/* Services */

sagi.service('Impressora', function Storage($http, ImpressoraJSON, URLs) {
	var self = this;

	atualizarImpressoras();

	self.getImpressoras = function(){
		atualizarImpressoras();
		
		return self.impressoras;	
	}

	self.get = function(ipOuMac){
		return self.impressoras[getIndex(ipOuMac)];
	}
	
	self.getImpressoes = function(mac, de, ate){
		return $http.post(URLs.listarImpressoes, configurarParametrosImpressoes(mac, de, ate), {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    	});
	}
	
	 self.salvar = function(ip){
		return $http.post(URLs.cadastrarImpressora, configurarParametrosImpressora(ip), {
        	headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    	});
	}
	
	self.salvarArquivo =  function(arquivo, callback){
		var formData = new FormData(),
		xhr = new XMLHttpRequest();

		formData.append('arquivo', arquivo.files[0]);
		xhr.open('POST', URLs.cadastrarImpressora, true);
		xhr.send(formData);
		
		xhr.onloadend = function(){
			callback(xhr.responseText.indexOf(1) > -1);
		}
	}

	function atualizarImpressoras(){
		setImpressoras(ImpressoraJSON.query());
	}

	function configurarParametrosImpressora(ip){
		var parametros = 'ip=' + ip;

		if(ip.indexOf('\n') > 0){
			ip = ip.split('\n');
			
			parametros = 'ips[' + 0 + ']=' + ip[0];
			
			for(var i = 1; i < ip.length; i++)
				parametros += '&ips[' + i + ']=' + ip[i];
		}

		return parametros;
	}
	
	function configurarParametrosImpressoes(mac, de, ate){
		var parametros = 'mac[' + 0 + ']=' + mac[0];
		
		for(var i = 1; i < mac.length; i++)
			parametros += '&mac[' + i + ']=' + mac[i];
		
		return parametros + '&de=' + de + '&ate=' + ate;
	}

	function setImpressoras(impressoras){
		self.impressoras = impressoras;
	}

	function getIndex(ipOuMac){
		for(var i = 0; i < self.tatuadores.length; i++){
			if(self.impressoras[i].ip == ipOuMac || self.impressoras[i].mac == ipOuMac)
				return i;
		}
		
		return -1;
	}
});