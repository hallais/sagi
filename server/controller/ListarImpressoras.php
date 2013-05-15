<?php
	
	include('Conexao.php');

	$query = "SELECT * FROM Impressora";

	$resultado = mysql_query($query);
	$impressoraJSON = array();

	while ($linha = mysql_fetch_array($resultado, MYSQL_ASSOC)){
		$impressora = array('mac' => $linha["mac"], 'ip' => $linha["ip"], 'modelo' => $linha["modelo"], 'descricao' => $linha["descricao"], 
		'ativa' => $linha["estado"]);
		$impressoraJSON[] = $impressora;
	}
	
	header("Content-Type: application/json");
	echo json_encode($impressoraJSON);