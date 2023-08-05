import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useCookies } from 'react-cookie';
import NavBar from './NavBar';
import TopBar from './TopBar';
import UpdateProfile from './UpdateProfile';

const UpdateMe = () => {
  const [activeButton, setActiveButton] = useState('me');
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [profile] = useCookies(['profile']);


  const handleMePress = () => {
    setActiveButton('me');
  };

  const handleReload = () => {
    setReloadTrigger(reloadTrigger + 1);
  };

  
  return (
    <ImageBackground
      source={require('../../../assets/bg1.jpg')} 
      style={styles.backgroundImage}
    >
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>
        <UpdateProfile/>
      </View>
      <NavBar
        onMePress={handleMePress} 
        activeButton={activeButton}
      />
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    marginTop: 30,
  },
  container: {
    flex: 1, // Overlay color with transparency
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red', // Change to your preferred color
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});

export default UpdateMe;
