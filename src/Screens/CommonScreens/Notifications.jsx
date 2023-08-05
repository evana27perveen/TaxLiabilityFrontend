import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import TopBar from './TopBar';
import NotificationList from './NotificationList';

import { useCookies } from 'react-cookie';

const Notifications = () => {
    const [activeButton, setActiveButton] = useState('home');
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [token] = useCookies(['myToken']);


    const handleHomePress = () => {
        setActiveButton('home');
      };

  const handleReload = () => {
    
    setReloadTrigger(reloadTrigger + 1);
  };
  return (
    <View style={styles.container}>
    <TopBar />
      <View style={styles.content}>
      <NotificationList />
      </View>
      <NavBar onHomePress={handleHomePress} activeButton={activeButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});

export default Notifications;
