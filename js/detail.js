app.controller("detailCtrl",["$scope","$http","$timeout",function($scope,$http,$timeout){
//		console.log(factory_getValue.getter());
		var goodsdata = sessionStorage.getItem('goodsdata',goodsdata);
		
		$scope.goodsDetailData = JSON.parse(goodsdata);
		console.log($scope.goodsDetailData)
		$scope.goodsbottomImgUrl = JSON.parse($scope.goodsDetailData[0][5])
		document.querySelector('.info').style.display = 'block';
		
		$scope.goodsNumber = 0;
		var num = 0
		$scope.chooseGoodsNum = function($event){
			var ele = document.querySelectorAll('.goodsSpan')
			var length = ele.length;
			for(var i=0;i<length;i++){
				if(ele[i].classList.contains('active')){
					ele[i].classList.remove('active')
				}
			}
			
			$event.target.classList.add('active')
			var target = $event.target.getAttribute('name');
			
			switch(target){
				case '1':
					$scope.goodsNumber = '1';
					num = 1;
					break;
				case '2':
					$scope.goodsNumber = '2';
					num = 2;
					break;
				case '3':
					$scope.goodsNumber = '3';
					num = 3;
					break;
				case 'reduce':
					num--;
					if(num<=0){
						num = 0;
					}
					$scope.goodsNumber = num;
					break;
				case 'add':
					num++;
					$scope.goodsNumber = num;
					break;
				default:
					console.warn('请检查代码！')
					break;
			}
		}
		
		$scope.addShopCar = function(){
			var goodsID = $scope.goodsDetailData[0].goodsID;
			var userID = localStorage.getItem("userID");
			var goodsNum = num;  
			if(userID){
				console.log(userID);//坑啊！！！！！！！！
//				$http.jsonp("http://datainfo.duapp.com/shopdata/updatecar.php?callback=JSON_CALLBACK&&userID="+userID+"&&goodsID="+goodsID+'&&number='+num).success(function(data){
//					$scope.toolTips = '添加购物车成功，请到个人中心查看！'
//					console.log(data)
//				}).error(function(){
//					console.log('sjji')
//				})
				$scope.addSucess = true;
				$scope.toolTips ='正在添加购物车，请稍后......'
				$http({
					method:"POST",
					url:"http://datainfo.duapp.com/shopdata/updatecar.php",
					data:{
	//					"status":"login",
						"userID": userID,
						"goodsID": goodsID,
						"number": num
					},
					headers:{'Content-Type': 'application/x-www-form-urlencoded'},  
				   	transformRequest: function(obj) {  
				     var str = [];  
				     for(var p in obj){  
				       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
				     }  
				     return str.join("&");  
				   }  							
				}).success(function(data){
					$scope.toolTips ='添加购物车成功，请到个人中心查看，4s后提示消失！'
					$scope.addSucess = true;
					$timeout(function(){
						$scope.addSucess = false;
					},4000)
				}).error(function(){
					$scope.toolTips ='添加购物车失败，请联系管理员,4s后提示消失！';
					$timeout(function(){
						$scope.addSucess = false;
					},4000);
				})
			}else{
				$scope.toolTips ='您还未登录，请先登录，4s后提示消失！'
				$timeout(function(){
						$scope.addSucess = false;
				},4000);
			}
			
		}
}]);