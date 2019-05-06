import axios from 'axios';

const instance = axios.create();

// 请求前拦截器
instance.interceptors.request.use((config) => {
  // 设置超时15s
  config.timeout = 15000;
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 请求返回拦截器
instance.interceptors.response.use((res) => {
  // 常规错误类型
  if ((res.data.code && res.data.code !== 200) || (res.data.success !== undefined && res.data.success === false)) {
    let messageText = '';
    // message.error(messageText || res.data.message || res.data.errorMessage || '网络异常，请稍后尝试！');
  }
  return res.data;
}, (err) => {
  // message.error('网络异常，请稍后尝试！');
  return err;
});


// 生成统计使用的headers
function _generateHeadersForStatistic() {
  // 构造Headers（X-M）
  const walletInfo = getSessionWalletInfo();
  const clientType = 'app';
  const lang = i18next.language;
  const headers = {
    'X-M': `clientType=${clientType};lang=${lang}`
  };

  return headers;
}

function _isInnerAPI(url) {
  return url.indexOf('/v1/') >= 0;
}

// 对外暴露get方法
export function get(url, params = {}) {
  // const headers = _generateHeadersForStatistic();
  const inner = _isInnerAPI(url);

  return instance({
    method: 'get',
    url,
    params,
  });
}

// 对外暴露post方法
export function post(url, data) {
  const headers = _generateHeadersForStatistic();
  const inner = _isInnerAPI(url);
  const csrfToken = 'csrfToken';

  return instance({
    method: 'post',
    url: `${url}?_csrf=${csrfToken}`,
    data,
    headers: inner ? headers : {}
  });
}

export const request = instance;
