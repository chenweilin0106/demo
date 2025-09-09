# 更新日志

## 2025-05-22

1. 具体修改：将judgeBuySuccess放置到try中，避免appPay执行失败后，依然开启轮询；
  具体修改位置：inBuy函数、confirmPayment函数；
  是否经过测试验证：是
2. 具体修改：优化openReceivePopup函数，将恭喜获得弹窗的配置数据进行冻结；新增数据类型判断并自动转换为数组；
  具体修改位置：openReceivePopup函数；
  是否经过测试验证：是

## 2025-05-28

1. 具体修改：新增对应礼包轮询拦截；
  具体修改：inBuy函数-112行；
  是否经过测试验证：是
2. 具体修改：新增offAllTimer函数，用于清除所有定时器；
  具体修改位置：offAllTimer函数-173；judgeBuySuccess函数-193
  是否经过测试验证：是
3. 具体修改：beforeDestroy中新增offAllTimer执行；
  具体修改位置：beforeDestroy函数-261；
  是否经过测试验证：是
