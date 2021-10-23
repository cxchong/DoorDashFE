/*import { Layout, Typography } from "antd";
import { useState } from "react";
import LoginForm from "./components/LoginForm";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  // React提供的use开头的方法，React 16.8之后开始使用，叫hooks
  // 16.8之前class可以access state以及lifecycle，而function定义component不行
  // 16.8之后通过hooks，function也可以
  // Declare a new state variable, which we'll call "authed"
  // authed：读出的state值，setAuthed：写state值的方法；
  // false是state的初始值
  const [authed, setAuthed] = useState(false); // useState是其中一种hooks，返回一个数组

  return (
    // style里是一个object；外面的大括号是jsx中用来插入JS的
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div className="header">
          <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >
            Lai Food
          </Title>
        </div>
      </Header>
      <Content
        style={{
          padding: "50px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
      >
        {authed ? (
          <div>content placeholder</div> // 如果已经登录，placeholder；这是个JS语法
        ) : (
          <LoginForm onSuccess={() => setAuthed(true)} />
        )}
      </Content>
    </Layout>
  );
}

export default App; */


import { Layout, Typography } from "antd";
import { useState } from "react";
import FoodList from "./components/FoodList";
import LoginForm from "./components/LoginForm";
import MyCart from "./components/MyCart";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const [authed, setAuthed] = useState(false);

  return (
    // 动态高度百分比布局
    <Layout style={{ height: "100vh" }}>
      <Header>
        <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
          <Title
            level={2}
            style={{ color: "white", lineHeight: "inherit", marginBottom: 0 }}
          >
            Lai Food
          </Title>
          {authed && (
            <div>
              <MyCart />
            </div>
          )}
        </div>
      </Header>
      <Content
        style={{
          padding: "50px",
          maxHeight: "calc(100% - 64px)",
          overflowY: "auto",
        }}
        >
        {authed ? (
          <FoodList />
        ) : (
          <LoginForm onSuccess={() => setAuthed(true)} />
        )}
      </Content>
    </Layout>
  );
}

export default App;

