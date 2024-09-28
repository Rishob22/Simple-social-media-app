import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import PostListProvider from "../store/post-list-store";
import { useState } from "react";
import { Outlet } from "react-router-dom";
function App() {
  const [selectedTab, setSelectedTab] = useState("Create Post");

  return (
    <PostListProvider>
      <div className="app-container">
        <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="headerFooterDiv">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </div>
    </PostListProvider>
  );
}

export default App;
