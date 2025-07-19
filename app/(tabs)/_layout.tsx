import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none', // Disable page transition animations
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="ponds" />
      <Stack.Screen name="alerts" />
      <Stack.Screen name="tips" />
      <Stack.Screen name="pdfs" />
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
