import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HomeScreen = () => (
  <View style={s.c}><Text>HomeScreen</Text></View>
);
const s = StyleSheet.create({ c: { flex:1, justifyContent:'center', alignItems:'center' } });
