2.0的版本用Umi3.x搭建的，重构了之前基于Vue2.5的版本，同时也体验了Antd4.x、React Hooks、immer，全面使用Type Script,多方面进行"瘦身"。

# 代码

## 标识符语义

命名的语义化要建立在区分性的基础之上，项目中以TS的命名空间为基本结构，结合类型声明和功能函数，内部命名得以简化

index文件只是作为入口和对外统一提供，不抒写主要的业务逻辑；通过单个大写字母开头的方式区分性质，P代表容器页面、S代表ajax通讯，N代表类型声明，U代表工具函数的结合，I代表接口，E代表枚举。

在代码抒写上，以前的命名过分强调和数据的关系，没有进行很好的简化，堆叠起来很臃肿。
response简化为rsp，request简化为req
弃用isVisible这种粗糙的命名方式，区分visible、loading、loaded
普通对象加s，数组加List，Set、Map。

[当代前端真的有必要常量大写吗？](https://www.jianshu.com/p/2b54ec7a9aa8)

## 文件夹结构

当前页面用到的东西在同一目录就找的到，而不是类型声明、服务端通讯、Model文件等分别写在不同的目录，其余的放在公告目录，避免结构横宽纵深。

## TS
在任何地方都能得到提示、自动导入，第三方库有不足的，进行扩展，列如函数式组件被Umi导出connect包裹后，在编辑属性时，TS失效了。

[在umi中更便捷的使用dispatch](https://www.jianshu.com/p/bfb5bddf3b52)

## 功能函数封装

不在一个文件导出多个函数，而是建立在命名空间的基础上，比如UDate，UCopy等，NRsp整合了对列表的系列操作，合理的利用Promise加形参的方式控制行为，避免混淆。


# 界面

借助.gitignore文件忽略后台服务产生的数据文件，避免消耗时间在冲突上。
简化功能和操作，合理的支配时间。减少不必要的加载动画、删除提示。

## 笔记本

将原有的文件管理拆分出去，密码管理舍弃，不再分页，直接加载全部，简化的界面按钮。

![](https://upload-images.jianshu.io/upload_images/3004133-9d6db831045a537d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


支持每一行的删除、复制；内容上支持普通链接、图片链接、黏贴图片、拖拽桌面图片、格式化代码；整个笔记的复制、置顶、置后、向前添加，向后添加。

通过后台对记事进行假删除，避免误删无法恢复，前端是无感的。

## 文件管理

简化上传时的动画效果，相比于已上传的文件，只是按钮区域去显示进度，其余界面无变化，支持下载、删除
