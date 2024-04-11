export const tableCustomStyles = {
    table: {
      style: {
        minHeight: 'fit-content',
        padding: '10% !important',
        fontFamily: 'var(--font-para)'
      }
    },
    rows: {
      style: {
        width: '100%',
        fontSize: '13px !important',
        borderBottom: '1px solid var(--grey-000) !important',
        padding: '0% 2%',
        transition: 'all 0.3s ease-in',
        cursor: 'pointer',
        textAlign: 'left',
        '&:hover': {
          border: '1px solid transperant',
          backgroundColor: 'var(--secondary2-trans) !important'
        }
      },
      stripedStyle: {
        backgroundColor: 'var(--grey-000)'
      },
      selectedHighlightStyle: {
        backgroundColor: 'var(--secondary-trans) !important'
      }
  
      // '&:hover' :{
      //     backgroundColor:'red !important',
      // },
      // '&:not(:last-of-type)' : {
      //     borderBottomStyle: 'solid',
      //     borderBottomWidth: '1px',
      //     paddingBottom:'5%',
      //     backgroundColor:'red',
  
      // },
    },
    cells: {
      style: {
        //   border:'1px solid red',
        justifyContent: 'middle',
        color: 'var(--grey-dark)'
        //   margin:'auto',
      }
    },
    headRow: {
      style: {
        fontSize: '14px !important',
        padding: '0% 2%', // override the cell padding for head cells
        background: 'var(--secondary2-trans) !important',
        border: '1px solid var(--primary-trans)',
        color: 'var(--primary)'
      }
    },
    expanderRow: {
      style: {
        backgroundColor: 'var(--white-color)',
        margin: '0 0.7%',
        width: '98.7%',
        borderRadius: '10px',
        border: '1px solid var(--white-color)',
  
        '&:hover': {
          border: '1px solid var(--grey-200)'
        }
      }
    },
    expanderButton: {
      style: {
        backgroundColor: 'var(--white-color)',
        margin: '0.2rem',
        width: '57% !important',
        height: '4vh !important',
        color: 'var(--grey-200) !important',
        borderRadius: '100%',
        border: '2px solid var(--grey-100)',
        transition: 'all 1s ease-in-out',
        '&:hover': {
          backgroundColor: 'var( --secondary2-trans) !important',
          border: '1px solid var(--secondary2-trans)',
          color: 'var(--secondary2) !important'
        },
        '&:focus': {
          backgroundColor: 'var( --secondary2) !important',
          border: '1px solid var(--secondary2)',
          color: 'var(--secondary2) !important'
        }
      }
    }
    //   checkBox: {
    //     style :{
  
    //     }
    //   }
  };
  // export const conditionalRowStyles ={
  //     rows:{
  
  //     }
  // }
  
  export const expandTableCustomStyles = {
    table: {
      style: {
        // minHeight: 'fit-content',
        padding: '0 !important',
        fontFamily: 'var(--font-para)',
        overflow: 'hidden',
        borderRadius: '12px 12px 0px 0'
      }
    },
    rows: {
      style: {
        width: '100%',
        fontSize: '13px !important',
        borderBottom: '1px solid var(--grey-000) !important',
        padding: '0% 2%',
        transition: 'all 0.3s ease-in',
        cursor: 'pointer',
        textAlign: 'left',
        '&:hover': {
          border: '1px solid transperant',
          backgroundColor: 'var(--secondary2-trans) !important'
        }
      },
      stripedStyle: {
        backgroundColor: 'var(--grey-000)'
      },
      selectedHighlightStyle: {
        backgroundColor: 'var(--secondary-trans) !important'
      }
    },
    cells: {
      style: {
        //   border:'1px solid red',
        justifyContent: 'middle',
        color: 'var(--grey-dark)'
        //   margin:'auto',
      }
    },
    headRow: {
      style: {
        fontSize: '14px !important',
        padding: '0% 2%', // override the cell padding for head cells
        background: 'var(--secondary2-trans) !important',
        border: '1px solid var(--primary-trans)',
        color: 'var(--primary)',
        borderRadius: '12px 12px 0px 0'
      }
    },
    expanderRow: {
      style: {
        margin: '1%',
        width:'98%',
        border:'1px solid var(--grey-100)',
        borderRadius:'10px',
      }
    },
    expanderButton: {
      style: {
        backgroundColor: 'var(--white-color)',
        margin: '0.2rem',
        width: '57% !important',
        height: '4vh !important',
        color: 'var(--grey-400) !important',
        borderRadius: '100%',
        border: '1.5px solid var(--grey-400)',
        transition: 'all 1s ease-in-out',
        '&:hover': {
          backgroundColor: 'var( --secondary2-trans) !important',
          border: '1px solid var(--secondary2-trans)',
          color: 'var(--secondary2) !important'
        },
        '&:focus': {
          backgroundColor: 'var( --secondary2-trans) !important',
          border: '1px solid var(--secondary2)',
          color: 'var(--secondary2) !important'
        }
      }
    }
  };
  export const expandCustomStyles = {
    table: {
      style: {
        // minHeight: 'fit-content',
        padding: '0 !important',
        fontFamily: 'var(--font-para)',
        backgroundColor:'var(--grey-000)',
      }
    },
    rows: {
      style: {
        width: '100%',
        fontSize: '13px !important',
        borderBottom: '1px solid var(--grey-000) !important',
        padding: '0% 2%',
        transition: 'all 0.3s ease-in',
        cursor: 'pointer',
        textAlign: 'left',
        backgroundColor:'transparent',
        '&:hover': {
          border: '1px solid transperant',
          backgroundColor: 'var(--secondary2-trans) !important'
        }
      },
      // stripedStyle: {
      //   backgroundColor: 'var(--grey-000)'
      // },
      selectedHighlightStyle: {
        backgroundColor: 'var(--secondary-trans) !important'
      }
    },
    cells: {
      style: {
        //   border:'1px solid red',
        justifyContent: 'middle',
        color: 'var(--grey-dark)'
        //   margin:'auto',
      }
    },
    headRow: {
      style: {
        fontSize: '14px !important',
        padding: '0% 2%', // override the cell padding for head cells
        background: 'var(--grey-100) !important',
        borderBottom: '1px solid var(--grey-100)',
        color: 'var(--primary)'
      }
    },
  };