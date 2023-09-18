import { useEffect, ReactElement } from 'react';
import { useSnackbar, SnackbarProvider } from 'notistack';

import { RootState } from 'store';
import { useAppSelector } from 'hooks';

function Notifier(props: { children: ReactElement }) {
  const { enqueueSnackbar } = useSnackbar();
  const { children } = props;
  const notifier = useAppSelector((state: RootState) => state.app.notifier);

  const { options } = notifier;

  useEffect(() => {
    if (notifier.message) enqueueSnackbar(notifier.message, { ...options });
  }, [notifier]);

  return children;
}

function NotifierProvider(props: { children: ReactElement }) {
  const { children } = props;

  return (
    <SnackbarProvider
      maxSnack={3}
    >
      <Notifier>
        {children}
      </Notifier>
    </SnackbarProvider>
  );
}

export default NotifierProvider;
