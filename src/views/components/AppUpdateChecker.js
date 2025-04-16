import React, { useEffect, useState } from 'react';
import { View, Text, Linking, Platform, Button } from 'react-native';
import VersionCheck from 'react-native-version-check';
import Modal from 'react-native-modal';

const AppUpdateChecker = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  useEffect(() => {
    const checkUpdate = async () => {
      try {
        const latestVersion = await VersionCheck.getLatestVersion();
        const currentVersion = VersionCheck.getCurrentVersion();
        const url = await VersionCheck.getStoreUrl();

        setStoreUrl(url);

        if (VersionCheck.needUpdate({ currentVersion, latestVersion })) {
          setModalVisible(true);
        }
      } catch (error) {
        console.log('Update check failed:', error);
      }
    };

    checkUpdate();
  }, []);

  const handleUpdate = () => {
    setModalVisible(false);
    Linking.openURL(storeUrl);
  };

  return (
    <View>
      <Modal isVisible={isModalVisible}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Update Available</Text>
          <Text style={{ marginBottom: 20 }}>
            A new version of this app is available. Please update to continue.
          </Text>
          <Button title="Update Now" onPress={handleUpdate} />
        </View>
      </Modal>
    </View>
  );
};

export default AppUpdateChecker;
