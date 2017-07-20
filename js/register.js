app.controller("registerCtrl",function($scope,$location,$timeout ,$http){
	 document.querySelector('.info').style.display = 'none';
	 $scope.registermessage = "欢迎注册!";
	 $scope.regist=function(){
	 	if($scope.userid == undefined || $scope.passwd == undefined){
			$scope.registermessage = "请填写完整用户信息";
		}else{
			$scope.registermessage = "正在注册";
			//如果输入合法
			$http.get("http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+$scope.userid+"&password="+$scope.passwd).then(function(data){
				console.log(data)
				$timeout(function(){
					$scope.registermessage = "注册成功,3s之后进入登录页面";
					$timeout(function(){
						$scope.registermessage = "注册成功,2s之后进入登录页面";
						$timeout(function(){
							$scope.registermessage = "注册成功,1s之后进入登录页面";
							$location.path("/login");
						},1000)
					
					},1000)
				},1000)
				
			});
			
		}
		
	 }
})
