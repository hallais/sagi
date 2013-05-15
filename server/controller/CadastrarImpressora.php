<?php
// iso.3.6.1.2.1.25.3.2.1.3.1 = nome/modelo
// iso.3.6.1.2.1.43.5.1.1.16.1 = descricao
//	iso.3.6.1.2.1.2.2.1.6.1/2  = MAC
//	iso.3.6.1.2.1.43.10.2.1.4.1.1  = paginas

	$sucesso = false;

	if(isset($_POST['ip']) || isset($_POST['ips']) || isset($_FILES['arquivo'])){
		if(isset($_REQUEST['ip']))
			$sucesso = cadastrarImpressora($_REQUEST['ip']);
		elseif(isset($_REQUEST['ips'])){
			foreach($_REQUEST['ips'] as $ip)
				cadastrarImpressora($ip);

			$sucesso = true;
		}
		else{
			include('LerArquivo.php');

			$ips = array();
			$ips = lerLinhas();

			foreach($ips as $ip)
				cadastrarImpressora($ip);
				
			$sucesso = true;
		}
	}
	
	echo $sucesso;

	function cadastrarImpressora($ip){
		$cadastrou = false;
	
		$mac = snmpget($ip, 'public', 'iso.3.6.1.2.1.2.2.1.6.1');
		if(!is_null($mac) && $mac != false){
			$modelo = snmpget($ip, 'public', 'iso.3.6.1.2.1.25.3.2.1.3.1');
			$descricao = snmpget($ip, 'public', 'iso.3.6.1.2.1.43.5.1.1.16.1');
		
			if(strcmp($mac, "\"\"") == 0)
				$mac = snmpget($ip, 'public', 'iso.3.6.1.2.1.2.2.1.6.2');
		
			$mac = explode(": ", $mac);
			$modelo = explode(": ", $modelo);
			$descricao = explode(": ", $descricao);

			include('Conexao.php');
		
			$select = sprintf('SELECT * FROM Impressora WHERE mac = "%s"', $mac[1]);
			$resultado = mysql_query($select);

			// Se impressora já estiver cadastrada
			if(mysql_num_rows($resultado) == 1){
				$dados = mysql_fetch_array($resultado);
			
				// Se o ip mudou
				if($dados["ip"] != $ip){
					$query = sprintf('UPDATE Impressora SET ip = "%s" WHERE mac = "%s"', $ip, $mac[1]);
					setcookie("impressorasAtualizadas[$mac[1]]", $ip, time() + 3600);
				}
			}
			else{
				$query = sprintf('INSERT INTO Impressora SET mac = "%s", ip = "%s", modelo = "%s", descricao = %s, estado = true', $mac[1], $ip,
											$modelo[1], $descricao[1]);
			}

			if(isset($query)){
				mysql_query($query) or die("Ocorreu um erro e a impressora não pode ser inserida: " . mysql_error());

				$cadastrou = true;
			}
		}
		
		return $cadastrou;
	}