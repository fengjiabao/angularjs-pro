app.controller("personCtrl",["$scope","$http","$timeout","$window",function($scope,$http,$timeout,$window){
	var svg = document.querySelectorAll('.svgDom')
	if(svg && svg.length>0){
		for(var i=0;i<svg.length;i++){
			svg[i].classList.add('hide');
		}
	}
	document.querySelector('.info').style.display = 'none';
	var userID = localStorage.getItem("userID");
	$http.jsonp("http://datainfo.duapp.com/shopdata/getCar.php?callback=JSON_CALLBACK&&userID="+userID).success(function(data){
					$scope.shopData = data
					console.log(data)
					if(data.length == 0){
						console.warn('购物车空空如也！')
					}
			}).error(function(){
				console.log('查看购物车失败！！')
			})
	$scope.deletegoods = function($event){
		var targetID = $event.target.getAttribute('goodsID');
		var userID = localStorage.getItem("userID");
		$http({
				method:"POST",
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:{
					"userID": userID,
					"goodsID": targetID,
					"number": 0
				},
				headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
			   	transformRequest: function(obj) {  
			     var str = [];  
			     for(var p in obj){  
			       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
			     }  
			     return str.join("&");  
				   }  							
				}).success(function(){
					//$window.location.reload();该方法体验不好！！！！
					$http.jsonp("http://datainfo.duapp.com/shopdata/getCar.php?callback=JSON_CALLBACK&&userID="+userID).success(function(data){
						$scope.shopData = data
					}).error(function(){
						console.log('查看购物车失败！！')
					})
				})
	}
}]);