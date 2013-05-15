'use strict';

function NavbarController($scope, $location) {

	$scope.routeIs = function(routeName) {
		return $location.path() == routeName;
	}
}

function CadastrarController($scope, $location, Impressora){

	$scope.cadastro = {
		sucesso: null,
		mensagem: ''
	};
	
	$scope.setArquivo = function(arquivo){
		$scope.arquivo = arquivo;
	}

	$scope.cadastrarImpressoraArquivo = function(ip){
		$scope.cadastro.sucesso = null;

		Impressora.salvarArquivo(ip, function(salvou){
			var sucesso = false,
			msg = "Impressora(s) não cadastrada(s)";

			if(salvou){
				sucesso = true;
				msg = "Impressora(s) cadastrada(s) com sucesso";
			}

			exibirMsg(sucesso, msg);
		});
	}
	
	$scope.cadastrarImpressora = function(ip){
		$scope.cadastro.sucesso = null;
		
		Impressora.salvar(ip).success(function(data){
			if(data == true){
				$scope.cadastro.sucesso = true;
				$scope.cadastro.mensagem = "Impressora(s) cadastrada(s) com sucesso";
			}
			else{
				$scope.cadastro.sucesso = false;
				$scope.cadastro.mensagem = "Impressora(s) não cadastrada(s)";
			}
		});
	}

	function exibirMsg(sucesso, msg){
		$scope.$apply(function(){
			$scope.cadastro.sucesso = sucesso;
			$scope.cadastro.mensagem = msg;
		});
	}
}

function ListarController($scope, Impressora) {
	$scope.impressoras = Impressora.getImpressoras();
}

function ImpressoesController($scope, Impressora) {
	$scope.impressoras = Impressora.getImpressoras();
	$scope.impressorasSelecionadas = [];
	
	$scope.dataDe = {
      dateFormat: 'dd/mm/yy',
      changeYear: true,
      changeMonth: true,
      yearRange: '2012:-0',
      maxDate: new Date(),
		onClose: function( selectedDate ) {
			$('#ate').datepicker('option', 'minDate', selectedDate );
      }
	};
	$scope.dataAte = {
		dateFormat: 'dd/mm/yy',
      	changeYear: true,
      	changeMonth: true,
      	yearRange: '2012:-0',
		maxDate: new Date(),
		onClose: function( selectedDate ) {
			$('#de').datepicker('option', 'maxDate', selectedDate );
		}
	};

	$scope.selecionado = function(mac){
		return $scope.impressorasSelecionadas.indexOf(mac) >= 0;
	}
	
	$scope.getImpressoes = function(){
		var de = $scope.data.de.toISOString().split("T")[0],
		ate = $scope.data.ate.toISOString().split("T")[0];
	
		Impressora.getImpressoes($scope.impressorasSelecionadas, de, ate).success(function(data){
			$scope.impressoes = data;
		});
	}

	$scope.selecionar = function(mac){
		if(mac == "todos"){
			$scope.todos = ($scope.todos != true);	
			$scope.impressorasSelecionadas = [];
			
			if($scope.todos){
				$scope.impressorasSelecionadas[0] = "%";

				if($scope.todos){
					for(var i = 0; i < $scope.impressoras.length; i++)
						$scope.impressorasSelecionadas[i + 1] = Impressora.impressoras[i].mac;
				}
			}
		}
		else if($scope.selecionado(mac)){
			$scope.impressorasSelecionadas.splice($scope.impressorasSelecionadas.indexOf(mac), 1);
		}
		else
			$scope.impressorasSelecionadas.push(mac);
	}
	
}
