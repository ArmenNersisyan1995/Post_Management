import { ReactElement, Ref } from 'react';
import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef((
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
// eslint-disable-next-line react/jsx-props-no-spreading
) => <Slide direction="up" ref={ref} {...props} />);

function DialogSlide(props: DialogProps) {
  const { open, onClose, children } = props;
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {children}
      </Dialog>
    </div>
  );
}

export default DialogSlide;
