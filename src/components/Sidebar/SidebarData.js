import {Dashboard,Logout,Reporting,Training} from "../UI/SVG";

export const MMRevamp = () => {

    const sideBar = [
      {
        label: 'Dashboard',
        icon: <Dashboard />,
        link: '/',
        key: 1
      },
      {
        label: 'Schedule Training',
        icon: <Training />,
        link:'schedule',
        key: 2,
        
      },
      {
        label: 'Report',
        icon: <Reporting />,
        link:'reports',
        key:3
      },
      {
        type: 'separator'
      },
    ]
   
  
    return sideBar;
  };