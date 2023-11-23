import React from 'react';
import SelectPages from './Header_Components/SelectPages';
import DescriptionList from './Header_Components/DescriptionList';
import '../styles/header.css';
import {
  IsAuthChange,
  ViewAllAndDescription,
} from '../interface/functionInterface';

const Header: React.FC<ViewAllAndDescription & IsAuthChange> = (props) => {
  const {
    description,
    setDescription,
    viewAll,
    setViewAll,
    isAuth,
    setIsAuth,
    user,
  } = props;
  return (
    <div className="header">
      <SelectPages
        viewAll={viewAll}
        setViewAll={setViewAll}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        user={user}
      />
      <DescriptionList
        description={description}
        setDescription={setDescription}
      />
    </div>
  );
};

export default Header;
