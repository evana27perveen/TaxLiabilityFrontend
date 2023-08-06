import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { useCookies } from 'react-cookie';
import NavBar from './NavBar';
import TopBar from './TopBar';
import Profile from './Profile';
import ProfileForm from './ProfileForm';

const Me = ({ navigation }) => {
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
          {profile.profile ? (
            <Profile />
          ) : (
            <ProfileForm />
          )}
        </View>
        <NavBar onMePress={handleMePress} activeButton={activeButton} />
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
    flex: 1, 
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
});

export default Me;
