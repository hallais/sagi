<?php
	
	if(isset($_POST["mac"]) && (isset($_POST["de"]) && isset($_POST["ate"]))){
		include('Conexao.php');

		$mac = $_POST["mac"];
		$de = $_POST["de"];
		$ate = $_POST["ate"];

		$impressoesJSON = array();

		for($i = 0; $i < count($mac); $i++){
			$query = sprintf("SELECT mac, ip, descricao, MAX(paginas) AS total, (MAX(paginas) - MIN(paginas)) AS impressoes FROM Impressora impa
				 			  INNER JOIN Impressoes imps ON imps.impressora_id = impa.mac
							  WHERE imps.impressora_id LIKE '%s' AND
							  (data >= '%s' AND data <= '%s 18:00:00')
							  GROUP BY mac, ip, descricao", $mac[$i], $de, $ate);
			
			$resultado = mysql_query($query);
			
			while ($linha = mysql_fetch_array($resultado)){
				$impressora = array('mac' => $linha["mac"], 'ip' => $linha["ip"], 'descricao' => $linha["descricao"],
										  'impressoes_total' => $linha["total"], 'impressoes' => $linha["impressoes"]);
				
				$impressoesJSON[$linha['mac']] = $impressora;
			}
		}
		
		header("Content-Type: application/json");
		echo json_encode($impressoesJSON);
	}
	else {	
		echo "Dados inválidos.";
	}
// SELECT mac, ip, descricao, MAX(paginas) AS total, (MAX(paginas) - MIN(paginas)) AS impressoes FROM Impressora impa
// 				 			  INNER JOIN Impressoes imps ON imps.impressora_id = impa.mac
// 							  WHERE imps.impressora_id LIKE '00 18 FE 9B FA 6C ' AND
// 							  (data >= '2012-12-01' AND data <= '2013-04-26 18:00:00')
// 							  GROUP BY mac, ip, descricao