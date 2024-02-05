import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, {useCallback, useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, StyleSheet, Text} from 'react-native';

const App = () => {

  const BottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  //callbacks
  const handleSheetChange = useCallback((index: any) => {
      console.log(index)
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <View style={styles.container}>
      <BottomSheet
        ref={BottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <View style={styles.contentContainer}>
          <Text>This is BottomSheet Content</Text>
        </View>
      </BottomSheet>
    </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center'
  }
})
export default App;
