import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ activeButton }) => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, activeButton === 'home' ? styles.activeButton : null]}
        onPress={() => handlePress('Home')}
      >
        <Text style={styles.iconText}>
          <Icon name="home" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, activeButton === 'history' ? styles.activeButton : null]}
        onPress={() => handlePress('History')}
      >
        <Text style={styles.iconText}>
          <Icon name="history" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, activeButton === 'notice' ? styles.activeButton : null]}
        onPress={() => handlePress('Notice')}
      >
        <Text style={styles.iconText}>
          <Icon name="warning" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>Notice</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, activeButton === 'taxes' ? styles.activeButton : null]}
        onPress={() => handlePress('Taxes')}
      >
        <Text style={styles.iconText}>
          <Icon name="id-card" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>Tin Info</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, activeButton === 'me' ? styles.activeButton : null]}
        onPress={() => handlePress('Me')}
      >
        <Text style={styles.iconText}>
          <Icon name="user" size={24} color="#fff" />
        </Text>
        <Text style={styles.buttonText}>Me</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#22ab20',
    height: 60,
    paddingHorizontal: 16,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 5,
  },
  button: {
    alignItems: 'center',
  },
  iconText: {
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  activeButton: {
    backgroundColor: '#22ab20',
    borderColor: '#97c796',
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
  },
});

export default NavBar;
