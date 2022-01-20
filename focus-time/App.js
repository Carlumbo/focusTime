import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';
import { Timer } from './src/features/timer/Timer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const STATUSES = {
    COMPLETE: 1,
    CANCELLED: 2,
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  //no array items in a useEffect will mean it will run on the mount of the component
  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  // const onTimerEnd = () => {};
  // console.log(focusHistory);

  const addFocusHistoryWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { key: String(focusHistory.length+1), subject, status }]);
  };
  const onClear = () => {
    setFocusHistory([]);
  };

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithStatus(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        //fragments are used to render multiple pieces without having to use a higher contianer suhc as view
        <View style={{ flex: 1 }}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} addSubject={setFocusSubject} />
        </View>
      )}
      <Text>{focusSubject}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
