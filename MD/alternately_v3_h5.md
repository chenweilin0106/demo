/**********************************************h5与ios/android原生交互*******************************************************/

/********************************************android端*********************************************************/
### 充值
@交互：/wealth/activity
@写法：window.external.action('/wealth');

###点击“>>前往商城”，在上层打开商城-道具-积分tab页。
@交互：/shop/activity
@写法：window.external.action('/shop?uid='+uid+"&access_token="+access_token+"&pageIndex=2int");

### 微信分享
@交互：/weChatShare/activity
@写法：window.external.action('/weChatShare');

### 抽奖返钻
@交互：/lottery/activity
@写法：window.external.action('/lottery?tuid='+uid);
@HTTP GET参数：
	@uid	用户id	

### 任务
@交互：/mission/activity
@写法：window.external.action('/mission');

###跳转“签到”和“任务”
###新版本-556以及之后
@签到交互：/sign?taskInitPos
@任务交互：/mission
###（556之前）
@写法： window.external.action('/mission?initPos=1int'); //initPos = 1 任务参数


### 会员
###非会员
@写法： window.external.action('/vip')
###会员（需传vipStatus）
@写法：window.external.action('/vip?index=' + vipStatus)

### 关闭页面
@交互：/quitWebView/activity
@写法：window.external.action('/quitWebView?uid='+uid+"&access_token="+access_token);
@HTTP GET参数：
	@uid			用户id	
	@access_token	access_token	
	
### 分享（图片）
@交互：/shareImage/activity
@写法：window.external.action('/shareImage?uid='+uid+"&access_token="+access_token+"&shareType="+shareType+"&bgUrl="+bgUrl);
@HTTP GET参数：
	@uid			用户id	
	@access_token	access_token	
	@shareType      (0--微信、1--朋友圈、2--QQ好友、3--QQ空间)
	@bgUrl			背景图地址（OSS路径）

### 举报跳转自动拉黑引导
@交互：/quitWebView/activity
@写法：window.external.action('/quitWebView?uid='+uid+"&access_token="+access_token+"&block=auto");
@HTTP GET参数：
	@uid		    用户id	
	@access_token	access_token	
	@block	        auto

### 跳转和用户的聊天页面
@交互：/chat/activity
@写法： window.external.action('/chat?tuid='+uid);
@HTTP GET参数：
	@uid		    用户id	

### 跳转背包页面
@交互：/my/knapsack
@写法： window.external.action('/my/knapsack?tuid='+uid);
@HTTP GET参数：
	@uid		    用户id	

### 打开用户主页
@交互：/user/info/activity 
@写法： window.external.action('/user/info?tuid='+tuid);
@HTTP GET参数：
	@uid		    用户id	

### 面部识别
@交互：/userCancel
@写法： window.external.action('/userCancel?uid='+uid+"&access_token="+access_token);
@HTTP GET参数：
	@uid		    用户id	
	@access_token	access_token	

### 开播协议同意
@交互：/openRoom
@写法： window.external.action('/openRoom?tuid='+uid+'&isAgree=true');
@HTTP GET参数：
	@uid		  用户id	
	@isAgree	  （true-进入申请活动流程，false-退出页面）
	
### 打开婚姻页面
@交互：/marriage/activity 
@写法： window.external.action('/marriage?tuid='+tuid);
@HTTP GET参数：
	@uid		    用户id	
	
### 自主反馈申诉
@交互：/appealSubmit
@写法： window.external.action('/appealSubmit?tuid='+tuid);
@HTTP GET参数：
	@uid		  用户id	
	@did	      did信息
	@device_name  当前设备信息
	
### 分享 [整合]
@交互：/socialShare
@写法：window.external.action('/socialShare?uid='+uid+"&access_token="+access_token+"&shareType="+shareType+"&shareBy="+shareBy);
@HTTP GET参数：
	@uid			用户id	
	@access_token	access_token	
	@shareType      (0--微信、1--朋友圈、2--QQ好友、3--QQ空间)
	@shareBy		(1-用户 2-聊天室 3-邀请） 现在一般直接用3

### 钻石不足弹窗
@交互：/shortDiamond
@写法： window.external.action('/shortDiamond?tuid='+uid+'&carat='+carat+'');
@HTTP GET参数：
	@uid		  用户id
	@carat	      用户需要用到的钻石数

### 跳转在线客服
@交互：/online/service
@写法： window.external.action('/online/service?tuid='+tuid);
@HTTP GET参数：
	@uid		  用户id

### 跳转家族战页面
@交互：/family/war
@写法： window.external.action('/family/war?tuid='+tuid);
@HTTP GET参数：
	@uid		  用户id

### 打开聊天室 （根据room_type来）
###room_type=2
@交互：/chatRoom
@写法：  window.external.action('/chatRoom?tuid='+tuid+"&room_id="+room_id);
@HTTP GET参数：
	@uid		  用户id
	@room_id	  聊天室id
###room_type=3
@交互：/chatRoom
@写法：  window.external.action('/chatNormalRoom?tuid='+tuid+"&room_id="+room_id);
@HTTP GET参数：
	@uid		  用户id
	@room_id	  聊天室id

### 保存图片
@交互：/saveImage
@写法：  window.external.action('/saveImage=' + imageUrl);

/********************************************ios端*********************************************************/
### 充值
@交互：DDWalletViewController
@写法：window.webkit.messageHandlers.DDWalletViewController.postMessage(params);
@HTTP GET参数：
	@uid	用户id	

###点击“>>前往商城”，在上层打开商城-道具-积分tab页。
###name就定为showPropVC，参数里面加一个type的字段，传0/1/2,0时钻石tab，1是元宝tab，2是积分tab
@写法：window.webkit.messageHandlers.showPropVC.postMessage(params);
@HTTP GET参数：
	@uid	用户id
	@type	num

### 分享 [整合]
@交互：share	
@写法：window.webkit.messageHandlers.share.postMessage(params)
@HTTP GET参数：
	@uid	   用户id	
	@shareType      (0--微信、1--朋友圈、2--QQ好友、3--QQ空间)
	@version   3.0

### 抽奖返钻
@交互：lottery_activity
@写法：window.webkit.messageHandlers.lottery_activity.postMessage(params);
@HTTP GET参数：
	@uid	用户id	

### 任务
@交互：DDTaskViewController
@写法：window.webkit.messageHandlers.DDTaskViewController.postMessage(params);
@HTTP GET参数：
	@uid	用户id	

###跳转“签到”和“任务”
###新版本-556以及之后
签到：DDSignInViewController
任务：DDTaskViewController
@写法：window.webkit.messageHandlers.PushView.postMessage(params);
@HTTP GET参数：
	@uid	用户id
###556之前
@写法：window.webkit.messageHandlers.PushView.postMessage(params);
@HTTP GET参数：
	@vcName	DDSignInTaskContainerViewController
	@parameters	uid、curIndex:"1"

### 会员
@交互：vip_activity
@写法：window.webkit.messageHandlers.vip_activity.postMessage(params);
@HTTP GET参数：
	@uid	用户id
	@index	vipStatus

### 关闭页面
@交互：quitWebView
@写法：window.webkit.messageHandlers.quitWebView.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	@access_token	access_token	
	
### 分享（图片）
@交互：shareImage
@写法：window.webkit.messageHandlers.shareImage.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	@access_token	access_token	
	@shareType      (0--微信、1--朋友圈、2--QQ好友、3--QQ空间)
	@bgUrl			背景图地址（OSS路径）
	
### 举报跳转自动拉黑引导
@交互：quitWebView
@写法：window.webkit.messageHandlers.quitWebView.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	@access_token	access_token	
	@type	        report	
	
### 跳转和用户的聊天页面
@交互：DDChat
@写法：window.webkit.messageHandlers.DDChat.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	
### 跳转背包页面
@交互：DDMinePackageViewController
@写法： window.webkit.messageHandlers.DDMinePackageViewController.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	
### 打开用户主页
@交互：DDUserInfo
@写法： window.webkit.messageHandlers.DDUserInfo.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	
### 面部识别
@交互：onAuthentication
@写法：window.webkit.messageHandlers.onAuthentication.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	
### 开播协议同意
@交互：openRoom
@写法： window.webkit.messageHandlers.openRoom.postMessage(params);
@HTTP GET参数：
	@uid		  用户id	
	@isAgree	  （true-进入申请活动流程，false-退出页面）
	
### 打开婚姻页面
@交互：DDMarriageMainViewController
@写法： window.webkit.messageHandlers.DDMarriageMainViewController.postMessage(params);
@HTTP GET参数：
	@uid			用户id	
	
### 自主反馈申诉
@交互：didAppeal
@写法： window.webkit.messageHandlers.didAppeal.postMessage(params);
@HTTP GET参数：
	@uid		  用户id	
	@did	      did信息
	@device_name  当前设备信息

### 钻石不足弹窗
@交互：DDRechargeAlert
@写法：window.webkit.messageHandlers.DDRechargeAlert.postMessage(params);
@HTTP GET参数：
	@uid		  用户id
	@carat	      用户需要用到的钻石数

### 跳转在线客服
@交互：DDServiceViewController
@写法：window.webkit.messageHandlers.DDServiceViewController.postMessage(params);
@HTTP GET参数：
	@uid		  用户id

### 打开聊天室
@交互：DDchatRoom
@写法：window.webkit.messageHandlers.DDchatRoom.postMessage(params);
@HTTP GET参数：
	@uid		  用户id
	@room_type    聊天室类型
	@room_id      聊天室id

### 跳转家族战页面
@交互：PushView
@写法：window.webkit.messageHandlers.PushView.postMessage(params);
@HTTP GET参数：
	@vcName		  DDFamilyDetailViewController
	@parameters   uid

### 保存图片
@交互：	saveImage
@写法：  window.webkit.messageHandlers.saveImage.postMessage(params);
<!--  params ：{ imageUrl }  -->

