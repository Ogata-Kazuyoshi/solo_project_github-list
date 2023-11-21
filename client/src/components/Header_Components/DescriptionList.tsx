import React from "react";
import { Todescription } from "../../interface/functionInterface";
import { Switch } from "@mui/material";
import "../../styles/Header_Components/descriptionList.css";

const DescriptionList: React.FC<Todescription> = (props) => {
  const { description, setDescription } = props;
  //   console.log(description);

  const changeHandler = (i: number) => {
    console.log("changed!");
    const tempDescription = [...description];
    tempDescription[i].isVisible = !tempDescription[i].isVisible;
    setDescription(tempDescription);
  };

  return (
    <>
      <div className="header__description">
        <h3 className="header__description--header">Descripiton</h3>
        <div className="header__description--content">
          {description.map((elm, i) => {
            return (
              <div key={i}>
                <Switch
                  onChange={() => {
                    changeHandler(i);
                  }}
                />
                <label htmlFor="">{elm.description}</label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DescriptionList;
