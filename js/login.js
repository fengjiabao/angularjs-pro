app.controller("loginCtrl",function($scope,$http,$timeout,$location){
	$scope.loginmessage = "欢迎登录!";
	document.querySelector('.info').style.display = 'none';
	$scope.toLogin = function(){
		if($scope.userid == undefined || $scope.passwd == undefined){
			$scope.loginmessage = "请填写完整用户信息";
		}else{
			$scope.loginmessage = "正在登录，稍安勿躁";
			$http({
				method:"POST",
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					"status":"login",
					"userID":$scope.userid,
					"password":$scope.passwd
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
				console.log(data)
				if(data == "0"){
					$scope.loginmessage = "用户名不存在";
				}else if(data == "2"){
					$scope.loginmessage = "密码错误";
				}else{
					localStorage.setItem("isLogin",true);
					localStorage.setItem("userID",$scope.userid);
					$scope.nav_show = true;
					$timeout(function(){
						$scope.loginmMessage = "登录成功,3s之后进入首页";
						$timeout(function(){
							$scope.loginmessage = "登录成功,2s之后进入首页";
							$timeout(function(){
								$scope.loginmessage = "登录成功,1s之后进入首页";
								$location.path("/home");
							},1000)
						
						},1000)
					},1000)
				}
				
				
			})
			
		}
}})
