import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { RootState } from 'store';
import { getProfile } from 'store/user';

function useProfile() {
  const { profile } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!profile) {
      dispatch(getProfile()).unwrap();
    }
  }, []);
}

export { useProfile };
