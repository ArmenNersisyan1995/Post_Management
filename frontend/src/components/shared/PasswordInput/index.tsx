import { useState, useCallback, MouseEvent } from 'react';
import {
  TextField,
  IconButton,
  TextFieldProps,
} from '@mui/material';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

/* eslint-disable react/jsx-props-no-spreading */

function PasswordInput(props: TextFieldProps) {
  const { type = 'text' } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setShowPassword(!showPassword);
    },
    [showPassword],
  );

  return (
    <TextField
      {...props}
      type={showPassword ? type : 'password'}
      InputProps={{
        endAdornment: (
          <IconButton onClick={togglePassword}>
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        ),
      }}
    />
  );
}

export default PasswordInput;
