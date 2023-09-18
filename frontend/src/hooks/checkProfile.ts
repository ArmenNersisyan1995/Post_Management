import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { routsPatterns } from 'resources/constants';
import { User } from 'resources/types';

function useCheckProfile() {
  const navigate = useNavigate();

  const profileStorage: User | null = useMemo(() => {
    const storageProfile = localStorage?.getItem('profile') || null;
    if (storageProfile) {
      return JSON.parse(storageProfile);
    }
    return null;
  }, []);

  useEffect(() => {
    if (profileStorage) {
      navigate(routsPatterns.DASHBOARD);
    }
  }, [profileStorage]);

  return { profileStorage };
}

export default useCheckProfile;
