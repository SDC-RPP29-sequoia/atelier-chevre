import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const CustomSelect = props => {
  const StyledSelect = styled(Select)({
    border: 'none',
    borderRadius: '0px',
    fontWeight: '700',
    color: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : '#454545',
  });

  return (
    <FormControl style={{ width: '100%' }} disabled={props.disabled}>
      <StyledSelect
        onOpen={props.handleOpen}
        onClose={props.handleClose}
        open={props.open}
        value={props.value}
        onChange={props.onChange}
        displayEmpty
        disableUnderline
        inputProps={{ 'aria-label': 'Without label' }}
      >
        {props.options?.map(option => (
          <MenuItem value={option.value} key={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default CustomSelect;
