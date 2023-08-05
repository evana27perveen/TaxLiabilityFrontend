import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { useCookies } from 'react-cookie';
import TinDisplay from '../TaxPayerScreens/TinDisplay'; 
import TinRegister from '../TaxPayerScreens/TinRegister';

const Taxes = () => {
  const [activeButton, setActiveButton] = useState('taxes');
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [taxPayer] = useCookies(['taxPayer']);
  console.log(taxPayer.taxPayer);
  

  const handleTaxesPress = () => {
    setActiveButton('taxes');
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
        {taxPayer.taxPayer ? ( 
          <TinDisplay /> 
        ) : (
          <TinRegister />
        )}
      </View>
      <NavBar onTaxesPress={handleTaxesPress} activeButton={activeButton} />
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
    marginTop: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});

export default Taxes;
