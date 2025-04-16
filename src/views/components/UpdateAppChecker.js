import React, { useEffect, useState } from 'react';
import { View, Text, Modal, Pressable, Linking, StyleSheet, Platform } from 'react-native';
import { APIBaseUrl, AppStoreUrl } from '../../constants';
import DeviceInfo from 'react-native-device-info';

const UpdateAppChecker = () => {

  const [showModal, setShowModal] = useState(false);
  const [updateType, setUpdateType] = useState('optional'); // 'mandatory' or 'optional'



   // check app version
   const checkVersion = async () => {

    try {

      const currentVersion = DeviceInfo.getVersion(); // e.g., "1.0.0"

      const res = await fetch(APIBaseUrl.developmentUrl + `customer/checkAppVersion?platform=${Platform.OS}`);

      const data = await res.json();

      if (compareVersions(currentVersion, data.minimumVersion) < 0) {

        setUpdateType('mandatory');
        setShowModal(true);

      } else if (compareVersions(currentVersion, data.latestVersion) < 0) {

        setUpdateType('optional');
        setShowModal(true);
      }


    } catch (error) {
      console.log('Update check failed', error);
    }
  };

  // use Effect 
  useEffect(() => {

    // Check version
    checkVersion();

  }, []);

  const compareVersions = (v1, v2) => {
    const a = v1.split('.').map(Number);
    const b = v2.split('.').map(Number);
    for (let i = 0; i < a.length; i++) {
      if ((a[i] || 0) < (b[i] || 0)) return -1;
      if ((a[i] || 0) > (b[i] || 0)) return 1;
    }
    return 0;
  };

  const updateApp = () => {
    Linking.openURL((Platform.OS === 'ios' ? AppStoreUrl.ios : AppStoreUrl.android));
  };

  return (
    <Modal visible={showModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>
            {updateType === 'mandatory' ? 'Update Required' : 'Update Available'}
          </Text>
          <Text style={styles.message}>
            {updateType === 'mandatory'
              ? 'You must update the app to continue.'
              : 'A new version is available. Would you like to update?'}
          </Text>
          <View style={styles.buttons}>
            {updateType === 'optional' && (
              <Pressable onPress={() => setShowModal(false)} style={styles.buttonSecondary}>
                <Text style={styles.buttonText}>Later</Text>
              </Pressable>
            )}
            <Pressable onPress={updateApp} style={styles.buttonPrimary}>
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateAppChecker;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  buttonPrimary: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonSecondary: {
    backgroundColor: '#999',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
  },
});
