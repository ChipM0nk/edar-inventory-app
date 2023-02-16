// @ts-nocheck
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

export const CustomButton = styled(Button)(({ theme }) => ({
  color: `${theme.palette.primary.contrastText} !important`,
  backgroundColor: `${theme.palette.primary.main} !important`,
  border: 'none',
  '&:hover': {
    backgroundColor: `${alpha(theme.palette.primary.main, 0.75)} !important`,
    border: 'none'
  },
  '&:disabled': {
    backgroundColor: 'gray !important',
    color: 'black !important'
  },
  marginRight: '20px',
  top: '50%',
  transform: 'translateY(-15%)'
}));
