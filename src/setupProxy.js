const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1',
    createProxyMiddleware({
      target: 'http://192.168.23.36:8000',
      changeOrigin: true,
    })
  );
};