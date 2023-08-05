import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useCookies } from 'react-cookie';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const TopBar = () => {

    const [token] = useCookies(['myToken']);

    const navigation = useNavigation();

    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
      fetchData();
    }, []);
  
  
    useFocusEffect(
      React.useCallback(() => {
        fetchData();
        return () => {
        };
      }, [])
    );
  
    
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.0.107:8000/notification/notification-data/', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        const data = await response.json();
    
        if (data !== null) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../assets/logo2.png')} style={styles.logo} />
        </View>
  
        <TouchableOpacity style={styles.iconContainer} onPress={() => {navigation.navigate('Notifications');}}>
          <Icon name="bell" size={24} color="#000" />
          {notifications > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notifications}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 60,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: 'contain',
  },
  iconContainer: {
    alignItems: 'flex-end',
  },
  badge: {
    backgroundColor: 'red', // Customize the badge background color
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 16,
    height: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  badgeText: {
    color: 'white', // Customize the badge text color
    fontSize: 12,
    fontWeight: 'bold',
    paddingBottom: 3,
  },
});

export default TopBar;
