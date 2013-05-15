sagi.directive('fixo', function($compile){
	return {
		restrict: 'C',
		link: function(scope, element, attrs) {
			var elementoFixo = element[0],
			navPosicaoTop = elementoFixo.offsetTop + 100;
			
			window.onscroll = function(){
				if (window.pageYOffset > navPosicaoTop && elementoFixo.className.indexOf("navFixo") == -1)
					elementoFixo.className += " navFixo";
				else if(window.pageYOffset <= navPosicaoTop)
					elementoFixo.className = elementoFixo.className.replace(" navFixo", "");
			}

		}
	}
});