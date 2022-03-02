# react开发规范文档
## 注释
良好的注释可以帮助代码阅读者快速理解代码块的作用，在团队合作开发，代码重构，项目交接中，一份良好的注释可以有效的提高工作效率。
- 文件顶部的注释，包括描述、作者、日期

  ```typescript
  /**
   * @description xxxxxx
   * @author chengfeng
   * @since 19/05/21
   */
  ```

- 函数的注释

  ```typescript
  /**
   * 函数
   * @param    paramData 函数参数
   * @return   returnData 函数返回值
   */
  ```

- 变量的注释

  ```typescript
  interface IState {
    // 名字
    name: string;
    // 电话
    phone: number;
    // 地址
    address: string;
  }
  ```

- tips: 模块，变量和函数的注释在导出或引用这部分代码时会有代码提示。

## 组件命名规则

- 页面组件使用小驼峰命名法
- 逻辑组件使用大驼峰命名法

## 组件引用顺序

- 先引用外部组件库,,再引用当前组件块级组件, 然后是 common 里的公共函数库最后是 css 样式

  ```tsx
  import * as React from 'react';
  import { Dropdown, Menu, Icon } from 'antd';
  import Header from './Header';
  import toast from 'common/toast';
  import './index.less';
  ```

### 页面组件代码顺序

- 函数组件代码顺序：接收`props`传递的变量 ==》定义本组件需要响应式的变量 ==》定义不需要响应式的变量 ==》定义函数 ==》定义仅在本页面里面使用的函数组件 ==》定义`tsx`元素变量 ==》定义响应式依赖`useEffect`，`useMemo` ==》return 函数组件

  ```tsx
  
  ```

## hooks使用规范

#### `setState` 

- `setState` 在react里的合成事件和钩子函数中是“异步”的。
- `setState` 在原生事件和 `setTimeout` 中是同步的。
- 不要在 `setState `前面加 `await`，`setState` 前面也是可以带 `await` 的，会变成同步设置状态,但这是一种巧合，不确定未来哪个版本就不支持了，为了遵循 react 框架的设计原则，我们使用回掉函数的形式

#### `useEffect`

- useEffect的处理函数不要更改useEffect的依赖项指针，否则会导致无限循环

#### `useMemo`

- 子组件里面如果需要响应式的监听一个变量且该变量由props传来，不要用`useState`和`useEffect`组合实现，建议使用`useMemo`替代。

  ```typescript
  // bad
  function Son ({data}) {
    const [fliterData, setFliterrData] = useState(data)
     useEffect(() => {
        setFliterrData(data => {...})
     }, [data])
  }
  // good
  const filterData = useMemo(() => {
    return data.filter((item) => doSthing())
    );
  }, [data]);
  ```

- `hooks`缺点

  hooks 只是复用 `js` 逻辑，并不能复用 `UI`

- hooks 优先使用事件，而不是依赖

  1. 事件驱动 state 变化，页面更新
  2. effect 里面去 `setState`，页面更新

## key

- 最好使用id（唯一值，不变值）作为key
- 在确定数组的顺序不会发生改变的情况下可以使用index作为key
- key应该绑定在循环元素的最外层dom节点上

## js代码规范

-  for-in 中一定要有 `hasOwnProperty `的判断（即禁止直接读取原型对象的属性）

-  业务代码里面的异步请求需要 try catch

  ```typescript
  getStudentList = async () => {
    try {
      this.setState({
        loading: true,
        isEmpty: false
      });
      await getStudentList({});
    } catch (e) {
      // TODO
      console.log(e)
    } finally {
      //  失败之后的一些兜底操作
      this.setState({
        loading: false,
        isEmpty: true
      });
    }
  };
  ```

- 减少魔法数字，写代码的时候尽量减少一些未知含义的数字，尽量用英文单词。例如type === 0的时候做了一些操作，让人不知所以然。最好使用枚举统一管理代码里的各种数字，既方便管理，又容易理解，并且在这些数字含义变化，修改，增加的时候不需要去改动源代码，只需修改对应的枚举就行

  ```typescript
  // bad
  if (type !== 0) {
    // TODO
  }
  
  // good
  const STATUS: Record<string, any> = {
    READY: 0,
    FETCHING: 1,
    FAILED: 2
  };
  
  if (type === STATUS.READY) {
    // TODO
  }
  
  // best
  enum STATUS {
    // 就绪
    READY = 0,
    // 请求中
    FETCHING = 1,
    // 请求失败
    FAILED = 2,
  }
  ```