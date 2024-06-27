import './sidebar.scss';
import React, { useState } from 'react';
// import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { MMRevamp} from './SidebarData';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import { LogoMachine, TextMachine } from '../../../svg/GlobalIcon';
import { Menu, MenuItem, Sidebar, SubMenu, menuClasses } from 'react-pro-sidebar';
import {
  ArrowBackIosNewRounded,
  ArrowForwardIosRounded,
  MenuOpenRounded,
  MenuRounded
} from '@mui/icons-material';
import {Logout} from "../UI/SVG";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#0124B9',
    color: 'rgb(255, 255, 255)',
    boxShadow: '0px 0px 5px #0124B91a',
    fontSize: 13,
    fontFamily: "'Poppins', 'sans-serif'",
    padding: '5px 15px',
    borderRadius: '10px',
    fontWeight: '400',
    outline: '3px solid #0124B91a',
    marginLeft: '20px !important'
  }
}));

export function SideBar({ collapsed,activeSidebarItem,sidebarOpen,logout,handleCollapes,setSelectedItem }) {

    

  return (
    <div
      className={collapsed ? 'sidebar' : 'sidebar sidebar-tab'}
      style={{ display: 'flex', height: '100vh' }}>
      
        <Sidebar
          backgroundColor="rgb(255, 255, 255)"
          collapsed={collapsed}
          className={collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}
          transitionDuration={500}
          rootStyles={MMRevamp().map((item) => {
            console.log(item,'item');
            return {
              ['.' + menuClasses.subMenuContent]: {
                background: collapsed ? 'white' : '#0057FF0d',
                boxShadow: collapsed
                  ? '0 0 10px rgba(107, 108, 133, 0.2) !important'
                  : '0 0 10px transparent !important',
                zIndex: collapsed ? '999 !important' : '',
                borderRadius: '10px',
                width: collapsed ? '14.5rem' : '14.2rem',
                left: '1% !important',
                // height:'500px !important',
                alignItems: 'center !important',
                // padding:'auto !important',
                padding: collapsed ? '10px !important' : '0 10px !important',
                margin: collapsed ? '10px 0 !important' : '10px 0 !important'
              },
              ['.' + menuClasses.button]: {
                zIndex: '1 !important',
                borderRadius: '10px',
                padding: '0 14px 0 4px !important',
                height: '40px !important',
                // borderTop: collapsed? '4px solid var(--white-color)' : '',
                marginTop: '3px',
                marginLeft: '0 !important',
                '&:hover': {
                  color: '#0057FF !important',
                  background: '#0057FF0d !important',
                  '& svg': {
                    fill: '#0057FF1a !important',
                    color: '#0057FF !important'
                  }
                }
              },
              ['.' + menuClasses.subMenuRoot]: {
                zIndex: '1 !important',
                borderRadius: '10px',
                padding: '0 !important',
                margin: '0 !important'
              },
              ['.' + menuClasses.label]: {
                overflow: collapsed ? 'hidden' : 'visible'
              },
              ...(activeSidebarItem === item.key && {
                ['.' + menuClasses.button + '-' + item.key]: {
                  color: '#0057FF !important',
                  //border:'2px solid var(--secondary-trans)',
                  backgroundColor: '#0124B90d',
                  borderRadius: '10px',
                  '& svg': {
                    color: '#0057FF'
                  }
                }
              }),
              ...item.subMenu?.map((item2) => {
                console.log("item2:",item2);
                return (
                  activeSidebarItem === item2.key && {
                    ['.' + menuClasses.button + '-' + item2.key]: {
                      color: 'rgb(255, 36, 0) !important',
                      backgroundColor: '#0057FF0d',
                      //border: '2px solid black !important',
                      borderRadius: '10px',
                      '& svg': {
                        color: '#0057FF'
                      }
                    }
                  }
                );
              })
            };
          })}>
          <Menu>
            {/* <MenuItem disabled></MenuItem> */}
            {/* <MenuItem
              disabled
              icon={<LogoMachine />}
              rootStyles={{
                [`.${menuClasses.icon}`]: {
                  backgroundColor: 'var(--white-color) !important',
                  width: '40px !important',
                  margin: '0',
                  padding: '0 4px'
                }
              }}
              className="logo-icon">
              <div className="logo-text">
                <TextMachine />
              </div>
            </MenuItem> */}
            <button
              id="btn-collapse"
              onClick={() => handleCollapes()}
              className="sidebar-collapser-des"
              style={{backgroundColor:'transparent',border:'none'}}>
              {collapsed ? (
                <div className="sb-button">
                  <ArrowForwardIosRounded />
                </div>
              ) : (
                <div className="sb-button-open">
                  <ArrowBackIosNewRounded />
                </div>
              )}
            </button>
            <button
              id="btn-collapse"
              onClick={() => handleCollapes()}
              className="sidebar-collapser-tab">
              {collapsed ? (
                <div className="sb-button">
                  <MenuRounded />
                </div>
              ) : (
                <div className="sb-button-open">
                  <MenuOpenRounded />
                </div>
              )}
            </button>
            {MMRevamp().map((item, index) => {
              return (
                <React.Fragment key={index}>
                  {item.type === 'separator' ? (
                    <Menu disabled className="saperator">
                      <span style={collapsed ? { opacity: 0 } : { opacity: 1 }}>{item.label}</span>
                    </Menu>
                  ) : item.subMenu ? (
                    <StyledTooltip
                      TransitionProps={{ timeout: 0 }}
                      title={collapsed ? item.label : ''}
                      placement="right"
                      // style={CustomTooltip}
                    >
                      <SubMenu label={item.label} icon={item.icon}>
                        {item.subMenu.map((subItem, subIndex) => {
                          return (
                            <MenuItem
                              key={subIndex}
                              component={subItem.link && <Link to={subItem.link} />}
                              icon={subItem.icon}
                              onClick={() => setSelectedItem(subItem.key)} // Update active state on click
                              className={`${menuClasses.button}-${subItem.key}`} // Add class to the icon
                            >
                              {subItem.label}
                            </MenuItem>
                          );
                        })}
                      </SubMenu>
                    </StyledTooltip>
                  ) : (
                    <StyledTooltip
                      TransitionProps={{ timeout: 0 }}
                      title={collapsed ? item.label : ''}
                      placement="right"
                      // style={CustomTooltip}
                    >
                      <MenuItem
                        component={item.link && <Link to={item.link} />}
                        icon={item.icon}
                        onClick={() => setSelectedItem(item.key)} // Update active state on click
                        className={`${menuClasses.button}-${item.key} mt-4 sidebarList`} // Add class to the icon
                      >
                        <div
                          className={
                            activeSidebarItem === item.key
                              ? collapsed
                                ? 'border-active-collapsed'
                                : 'border-active'
                              : ''
                          }></div>
                        {item.label}
                      </MenuItem>
                    </StyledTooltip>
                  )}
                </React.Fragment>
              );
            })}
             <StyledTooltip
                      TransitionProps={{ timeout: 0 }}
                      title={collapsed ? 'Logout' : ''}
                      placement="right"
                      // style={CustomTooltip}
                    >
            <MenuItem  onClick={logout} className='logout-list'>
              <Logout /> {!collapsed && 'Logout'}
            </MenuItem>
            </StyledTooltip>
          </Menu>
        </Sidebar>
      

      {/* <main style={{ padding: 10, zIndex: '999' }}>
       {collapsed ? (
         <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
           <ArrowForwardIosRounded />
         </button>
       ) : (
         <button className="sb-button-open" onClick={() => setCollapsed(!collapsed)}>
           <ArrowBackIosNewRounded />
         </button>
       )}
     </main> */}
    </div>
  );
}

export default SideBar;
