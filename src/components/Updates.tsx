import { useUpdates } from '@/hooks/useUpdates';
import React from 'react';
import { Alert } from 'react-native';

export const UpdatePrompt: React.FC = () => {
  const {
    updateAvailable,
    isUpdating,
    fetchUpdate,
    reloadApp
  } = useUpdates();

  React.useEffect(() => {
    if (updateAvailable && !isUpdating) {
      Alert.alert(
        'Update Available',
        'A new version of the app is available. Would you like to update now?',
        [
          {
            text: 'Later',
            style: 'cancel'
          },
          {
            text: 'Update',
            onPress: async () => {
              await fetchUpdate();
              await reloadApp();
            }
          }
        ]
      );
    }
  }, [updateAvailable, isUpdating]);

  return null;
};