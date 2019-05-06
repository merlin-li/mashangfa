// 本地存储同步数据
export default {
  // 如果没有设置过货币单位则默认返回 CNY
  currencyType(params) {
    const { resolve } = params;
    resolve('CNY');
  },

}
