import React from 'react';
import { View, StyleSheet } from 'react-native';

import { RoundedButton } from '../../components/RoundedButton';

export const QuickTimes = ({ timeLogger, clearSubject }) => {
  return (
    <>
      <View style={styles.quickTime}>
        <RoundedButton
          title="+"
          size={50}
          onPress={() => timeLogger((1 / 4) * 1)}
        />
      </View>
      <View style={styles.quickTime}>
        <RoundedButton title="Clear" size={50} onPress={() => clearSubject()} />
      </View>
      <View style={styles.quickTime}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => timeLogger((1 / 4) * -1)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  quickTime: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
