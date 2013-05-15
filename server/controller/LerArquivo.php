<?php

	function lerLinhas(){
		$ponteiro = fopen($_FILES["arquivo"]["tmp_name"], "r");
		$linha = array();
		$indice = 0;	

		while (!feof ($ponteiro)) {
		  $linha[$indice++] = fgets($ponteiro, 4096);
		}

		fclose ($ponteiro);

		return $linha;
	}