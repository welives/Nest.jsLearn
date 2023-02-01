# nest.js请求生命周期大致如下：

- 收到请求
- 全局绑定的中间件
- 模块绑定的中间件
- 全局守卫
- 控制层守卫
- 路由守卫
= 全局拦截器（控制器之前）
- 控制器层拦截器 （控制器之前）
- 路由拦截器 （控制器之前）
- 全局管道
- 控制器管道
- 路由管道
- 路由参数管道
- 控制器（方法处理器） 15。服务（如果有）
- 路由拦截器（请求之后）
- 控制器拦截器 （请求之后）
- 全局拦截器 （请求之后）
- 异常过滤器 （路由，之后是控制器，之后是全局）
- 服务器响应
