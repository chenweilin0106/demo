/**
 * 解析URL地址，返回包含URL各部分信息的对象
 * @param {string} url 需要解析的URL地址
 * @returns {{
 *  href: string,      // 完整URL，如 http://ddxx.com/vue/normal/friendsBeCash/index.html?uid=82347659#/share
 *  protocol: string,  // URL协议，如 http:、https:
 *  host: string,      // 主机名(域名+端口)，如 ddxx.com:8080，不带端口时就是域名
 *  hostname: string,  // 域名，如 ddxx.com
 *  port: string,      // 端口号，如 8080，未指定时为空字符串
 *  pathname: string,  // 路径，如 /vue/normal/friendsBeCash/index.html
 *  pathSegments: string[], // 路径段数组，如 ['vue', 'normal', 'friendsBeCash', 'index.html']
 *  search: string,    // 查询字符串(带?)，如 ?uid=82347659
 *  searchParams: Record<string, string>, // 查询参数对象，如 { uid: '82347659' }
 *  hash: string,      // 哈希值(带#)，如 #/share
 *  hashPath: string   // 哈希路径(不带#)，如 /share
 * }} URL解析结果对象
 */
function parseUrl(url) {
  // 创建一个URL对象
  const urlObj = new URL(url)

  // 解析查询参数
  const searchParams = {}
  urlObj.searchParams.forEach((value, key) => {
    searchParams[key] = value
  })

  // 提取路径部分
  const pathSegments = urlObj.pathname.split('/').filter(segment => segment !== '')

  // 返回包含URL各部分信息的对象
  return {
    href: urlObj.href,
    protocol: urlObj.protocol,
    host: urlObj.host,
    hostname: urlObj.hostname,
    port: urlObj.port || '',
    pathname: urlObj.pathname,
    pathSegments,
    search: urlObj.search,
    searchParams,
    hash: urlObj.hash,
    hashPath: urlObj.hash.substring(1)
  }
}

// 示例用法
const testUrl = 'http://ddxx.com/vue/normal/friendsBeCash/index.html?uid=82347659#/share'
const urlInfo = parseUrl(testUrl)

// 直接打印整个对象，更简洁
console.log('URL解析结果:')
console.log(urlInfo)
