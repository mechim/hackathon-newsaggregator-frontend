import React, { useState } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function getItem(label, key, icon, items, type, path) {
  return {
    key,
    icon,
    items,
    label,
    type,
    path, // Add the path property for navigation
  };
}

const items = [
  getItem('Meniu', 'sub1', <AppstoreOutlined />, [
    getItem('Noutăți', '1', null, null, null, '/news'),
    getItem('Petiții', '2', null, null, null, '/petitions'),
    getItem('Proiecte de lege', '3', null, null, null, '/laws'),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1'];

const MenuBar = () => {
  const [openKeys, setOpenKeys] = useState([]); // Change the initial state to an empty array

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        width: 200,
        backgroundColor: '#3d5a80',
        color: 'white',
        fontWeight: 'bold',
        zIndex: 10
      }}
    >
      {items.map((item) => {
        if (item.items) {
          return (
            <Menu.SubMenu key={item.key} title={item.label} icon={item.icon}>
              {item.items.map((subItem) => (
                <Menu.Item key={subItem.key}>
                  {subItem.path ? (
                    <Link to={subItem.path}>{subItem.label}</Link>
                  ) : (
                    subItem.label
                  )}
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item key={item.key}>
              {item.path ? <Link to={item.path}>{item.label}</Link> : item.label}
            </Menu.Item>
          );
        }
      })}
    </Menu>
  );
};

export default MenuBar;
