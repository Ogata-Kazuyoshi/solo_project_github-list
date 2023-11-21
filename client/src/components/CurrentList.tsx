import React from "react";
import { CheckedData } from "../interface/functionInterface";
import "../styles/currentList.css";

const CurrentList: React.FC<CheckedData> = (props) => {
  const { checkedData } = props;
  return (
    <div className="list">
      {checkedData.map((elm) => {
        return (
          <div key={elm.id} className="list__top">
            <div className="list__top--name">{elm.project_name}</div>
            <div className="list__top--date">{elm.create_date}</div>
            <div className="list__top--description">{elm.description}</div>
            <a href={elm.url} target="_blank" rel="noopener">
              <button className="list__top--btn">Click</button>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default CurrentList;
