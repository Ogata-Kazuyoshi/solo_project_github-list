import React from "react";
import SelectPages from "./Header_Components/SelectPages";
import DescriptionList from "./Header_Components/DescriptionList";
import "../styles/header.css";
import { ViewAllAndDescription } from "../interface/functionInterface";

const Header: React.FC<ViewAllAndDescription> = (props) => {
  const { description, setDescription, viewAll, setViewAll } = props;
  return (
    <div className="header">
      <SelectPages viewAll={viewAll} setViewAll={setViewAll} />
      <DescriptionList
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default Header;
