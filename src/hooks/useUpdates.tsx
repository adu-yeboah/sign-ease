import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';

export function useUpdates() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const checkForUpdates = async () => {
    try {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      setUpdateAvailable(isAvailable);
      return isAvailable;
    } catch (err) {
      setError(err as Error);
      return false;
    }
  };

  const fetchUpdate = async () => {
    setIsUpdating(true);
    try {
      await Updates.fetchUpdateAsync();
      setUpdateAvailable(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsUpdating(false);
    }
  };

  const reloadApp = async () => {
    await Updates.reloadAsync();
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  return {
    updateAvailable,
    isUpdating,
    error,
    checkForUpdates,
    fetchUpdate,
    reloadApp
  };
}