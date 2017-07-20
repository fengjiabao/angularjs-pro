app.controller("kindCtrl", function($scope,$http,$location){
	var svg = document.querySelectorAll('.svgDom')
	if(svg && svg.length>0){
		for(var i=0;i<svg.length;i++){
			svg[i].classList.add('hide');
		}
	}
	
	$scope.indexshow= true;
	document.querySelector('.info').style.display = 'none'
	$scope.search2=function(){
		var search=$scope.searchProTxt;
		console.log(search)
		$http.jsonp("http://datainfo.duapp.com/shopdata/selectGoodes.php?callback=JSON_CALLBACK&selectText="+search).success(function(data){
				console.log(data);
		})
	}
	
	
	$scope.pageIndex = function($event){
		var index = null;
		var target = $event.target.getAttribute('name');
		console.log(target);
		switch(target){
			case 'last':
				index = 0;
				break;
			case 'next':
				index = 1;
				break;
			
		}
		$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK&&classID=1&&pageCode="+index+'"').success(function(data){
			$scope.prolist = data;
		})
	}
	
	//详情
	$scope.goodsDetail = function($event){
		var target = $event.target.getAttribute('goodsDetail');
		var id = $event.target.getAttribute('goodId');
		console.log(target);
		console.log(id);
		$http.jsonp("http://datainfo.duapp.com/shopdata/getGoods.php?callback=JSON_CALLBACK&&goodsID="+id).success(function(data){
			console.log(data);
			var goodsdata = JSON.stringify(data);
			sessionStorage.setItem('goodsdata',goodsdata);
			$location.path("/detail");
		})
	};
})