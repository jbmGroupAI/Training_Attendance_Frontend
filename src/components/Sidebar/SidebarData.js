import {Dashboard,Logout,Reporting,Training} from "../UI/SVG";

export const MMRevamp = () => {

    const sideBar = [
      {
        label: 'Dashboard',
        icon: <Dashboard />,
        link: '/ta',
        key: 1
      },
      {
        label: 'Schedule Training',
        icon: <Training />,
        link:'/ta/schedule',
        key: 2,
        
      },
      {
        label: 'Report',
        icon: <Reporting />,
        link:'/ta/reports',
        key:3
      },
      {
        label: 'Admin',
        icon: <Reporting />,
        link:'/ta/admin',
        key:4
      },
      
      {
        type: 'separator'
      },
    ]
   
  
    return sideBar;
  };