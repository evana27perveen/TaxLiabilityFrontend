import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import TopBar from './TopBar';
import NoticeList from './NoticeList';

import { useCookies } from 'react-cookie';

const Notice = () => {
    const [activeButton, setActiveButton] = useState('notice');
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [token] = useCookies(['myToken']);


    const handleNoticePress = () => {
        setActiveButton('notice');
      };

  const handleReload = () => {
    
    setReloadTrigger(reloadTrigger + 1);
  };
  return (
    <View style={styles.container}>
    <TopBar />
      <View style={styles.content}>
      <NoticeList />
      </View>
      <NavBar onNoticePress={handleNoticePress} activeButton={activeButton} />
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

export default Notice;
