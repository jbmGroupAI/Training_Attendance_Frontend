export const customDropdownStyles = {
    control: (baseStyles, { isFocused, isSelected }) => ({
      ...baseStyles,
      borderRadius: '10px',
      textAlign: 'left',
      transition: ' all 0.2s ease-in-out',
      color: isSelected ? 'var(--grey-700) !important' : 'var(--grey-700) !important',
      backgroundColor: isFocused ? 'var(--white-color)' : 'var(--white-color)',
      padding: '0.12rem 0.5rem',
      height: '43px',
      borderColor: isSelected ? 'var(--secondary2)' : 'var(--secondary2)',
      outline: isFocused ? '3px solid var(--secondary2-trans) !important' : 'transparent',
      boxShadow: isSelected ? 'none' : 'none',
      border: isFocused ? '1.5px solid var(--secondary2)' : ' 1.5px solid var(--grey-100)',
      fontSize: '13px',
      '&:hover': {
        borderColor: isFocused ? 'var(--secondary2)' : 'var(--secondary2)',
        outline: '3px solid var(--secondary2-trans) !important'
      },
  
      '&:focus': {
        border: '1.5px solid var(--secondary2) !important',
        backgroundColor: 'var(--white-color)',
        outline: '3px solid var(--secondary2-trans) !important',
        boxShadow: '0px 0px 3px var(--secondary2-trans) !important',
      },
    }),
    placeholder: (colorStyle) => ({
      ...colorStyle,
      // color:'var(--grey-500)',
      fontSize: '13px',
      fontWeight: '400'
    }),
  
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused ? 'var(--secondary2-trans-100)' : 'transperant',
      zIndex: '99',
      borderRadius: '5px',
      textAlign: 'left',
      transform: 'scale(0.9)',
      color: isFocused ? 'var(--secondary2)' : 'var(--grey-dark)',
      '&:active' : {
        backgroundColor:'var(--secondary2-trans)',
      }
    }),
    menuList: (base) => ({
      ...base,
      border: '1.5px solid var(--grey-200)',
      borderRadius: '12px',
      zIndex: '99 !important',
      marginBottom: '3%',
      backgroundColor: 'var(--white-color)',
      boxShadow:'0px 0px 5px 3px var(--grey-100)',
    }),
    menu: (base) => ({
      ...base,
      overflow: 'visible',
      borderColor: 'var(--white-color)',
      color: 'var(--grey-700) !important',
      borderRadius: '12px',
      boxShadow: '0px 0px 0px !important',
      width: '100%',
      backgroundColor: 'transparent !important'
    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: 'var(--secondary2-trans-100)',
      borderRadius: '18px',
      padding: '0px 5px 0px 5px',
      overflow: 'hidden',
      alignItem: 'center',
      margin: '1px'
    }),
  
    multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--secondary2)'
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      color: 'var(--secondary2)',
      ':hover': {
        color: 'var(--danger)'
      }
    })
  };
  