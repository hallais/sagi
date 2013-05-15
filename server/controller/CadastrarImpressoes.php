<?php
	
	include('Conexao.php');

	$resultado = mysql_query("SELECT mac, ip FROM Impressora");

	while ($linha = mysql_fetch_array($resultado, MYSQL_ASSOC))
		numeroPaginas($linha["mac"], $linha["ip"]);

	printf("[*] INFO - Impressões cadastradas com sucesso.");


	function numeroPaginas($mac, $ip){
		$paginas = snmpget($ip, 'public', 'iso.3.6.1.2.1.43.10.2.1.4.1.1');

		if(!is_null($paginas) && $paginas != false){
			$paginas = explode(": ", $paginas);

			$query = sprintf('INSERT INTO Impressoes SET data = "%s", paginas = %d, impressora_id = "%s"', date("Y-m-d H:i:s"), $paginas[1], $mac);

			mysql_query($query) or die("Ocorreu um erro e as impressoes não puderam ser cadastradas. " . mysql_error());

			printf("[*] INFO: %s/%s - Nº de páginas impressas cadastradas com sucesso. \n", $mac, $ip);
		}
		else
			printf("[*] ERRO: %s/%s - Ocorreu um erro e o nº de páginas impressas não pode ser cadastrada. \n", $mac, $ip);
	}