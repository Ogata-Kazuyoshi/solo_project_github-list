import React from "react";
import "../../styles/Header_Components/selectPages.css";
import { ViewAll } from "../../interface/functionInterface";
import { all } from "axios";
// import "../../styles/header.css";

const SelectPages: React.FC<ViewAll> = (props) => {
  const { viewAll, setViewAll } = props;
  const clickHandler = (arg: "all" | "modify") => {
    switch (arg) {
      case "all":
        if (!viewAll) setViewAll(!viewAll);
        break;
      case "modify":
        if (viewAll) setViewAll(!viewAll);
        break;
    }
  };
  return (
    <div className="header__button">
      <div className="selectbutton">
        <div
          className="selectbutton__common"
          style={{
            background: viewAll ? "black" : "white",
            color: viewAll ? "white" : "black",
          }}
          onClick={() => {
            clickHandler("all");
          }}
        >
          一覧
        </div>
        <div
          className="selectbutton__common"
          style={{
            background: !viewAll ? "black" : "white",
            color: !viewAll ? "white" : "black",
          }}
          onClick={() => {
            clickHandler("modify");
          }}
        >
          作成/編集
        </div>
      </div>
    </div>
  );
};

export default SelectPages;
