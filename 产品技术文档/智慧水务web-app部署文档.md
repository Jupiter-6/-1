## 前提条件以及注意事项
1. 必须通过 HTTPS 而非 HTTP 访问该应用程序，
否则程序将不支持离线化，以及多媒体功能。
如果没有 `https` 相关证书，则需要联系服务端进行配置。
2. 程序依赖于服务端相关服务，包括 **sws、sda、itsy**；
3. 建议移动客户端使用 chrome 浏览器，以获得最佳体验。

## 部署的环境
1. 将程序包复制到 `Linux` 或者 `windows server` 服务器；
2. 找到 `nginx.conf` 文件，根据实际情况，修改并添加如下配置，进行路由代理；

```
# ihive-mobile-web
location /ihive-mobile-web {
root   C:/software;
index  index.html;
try_files $uri $uri/ /ihive-mobile-web/index.html;
}
```
3. 在 nginx目录下启动 cmd，运行 `nginx -s reload` 重启 nginx；
4. 访问程序，对程序进行测试。

