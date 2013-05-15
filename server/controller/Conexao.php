<?php
	
	$conexao = mysql_connect("localhost", "root", "senha") or die("Não foi possível se conectar :" . mysql_error());
	
	
	mysql_select_db("sagi") or die("Não foi possível selecionar o banco de dados.");