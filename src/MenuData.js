const menuData = {
    math_postures_vue: {
        title: "四则运算",
        icon: "ios-calculator",
        isShowMobile: true,
        content: "版本1",
        to: {
            path: "/math_postures"
        }
    },
    clock_vue: {
        title: "闹钟",
        isShowMobile: true,
        icon: "ios-clock-outline",

        content: "pc端版本",
        to: {
            path: "/clock_vue"
        }
    },
    notepad: {
        title: "日记本",
        icon: "md-book",
        isShowMobile: true,
        content: "版本1",
        to: {
            path: "/notepad_vue"
        }
    },
    img_conventer: {
        title: "图片转换器",
        icon: "md-swap",

        content: "版本1",
        to: {
            path: "/img_conventer"
        }
    },
    gonna_something: {
        title: "let's go",
        icon: "md-walk",

        content: "版本1",
        to: {
            path: "/gonna_something"
        }
    },
    test_vue: {
        title: "测试",
        icon: "ios-game-controller-b",
        isShowMobile: true,
        childs: [
            {
                content: "测试用例",
                isShowMobile: true,
                to: {
                    path: "/test"
                }
            },
            {
                content: "内置后台node服务",
                to: {
                    path: "/test_service"
                }
            },
            {
                content: "canvas",
                to: {
                    path: "/test_canvas"
                }
            }
        ]
    }
}
export default menuData;