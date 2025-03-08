// 转换倒计时时间戳
export const getcalTime = (newValue) => {
  let day = Math.floor(newValue / 60 / 60 / 24);
  let hour = Math.floor((newValue - 60 * 60 * 24 * day) / (60 * 60));
  let minute = Math.floor(
    (newValue - 60 * 60 * 24 * day - 60 * 60 * hour) / 60
  );
  let second = Math.floor(
    newValue - 60 * 60 * 24 * day - 60 * 60 * hour - 60 * minute
  );
  let calday = "";
  let calhour = "";
  let calminute = "";
  let calsecond = "";
  let calTime = "";
  // 天
  if (day < 10) {
    calday = "0" + day + "天";
  } else {
    calday = day + "天";
  }
  // 小时
  if (hour < 10) {
    calhour = "0" + hour + "时";
  } else {
    calhour = hour + "时";
  }
  // 分钟
  if (minute < 10) {
    calminute = "0" + minute + "分";
  } else {
    calminute = minute + "分";
  }
  // 秒
  if (second < 10) {
    calsecond = "0" + second + "秒";
  } else {
    calsecond = second + "秒";
  }
  // console.log(minute, second);
  if (day >= 1) {
    calTime = calday + calhour + calminute;
  }
  if (day < 1 && hour >= 1) {
    calTime = calhour + calminute + calsecond;
  }
  if (day < 1 && hour < 1 && minute >= 1) {
    calTime = calminute + calsecond;
  }
  if (day < 1 && hour < 1 && minute < 1 && second >= 1) {
    calTime = calsecond;
  }
  // console.log(calTime);
  return calTime;
};
