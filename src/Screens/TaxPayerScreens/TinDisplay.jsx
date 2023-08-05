import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useCookies } from 'react-cookie';
import { FontAwesome5 } from '@expo/vector-icons'; // Import FontAwesome5 icons
import API_BASE_URL from '../../apiConfig';

const TinDisplay = () => {
  const [token] = useCookies(['myToken']);
  const [userID] = useCookies(['userID']);
  const [tinInfo, setTinInfo] = useState(null);

  useEffect(() => {
    fetchTinInfo();
  }, []);

  const fetchTinInfo = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/tax/payer/`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token.access_token}`,
          'Content-Type': 'application/json', 
        },
      });

      if (response.ok) {
        const result = await response.json();
        const authenticatedUserTinInfo = result.find(item => item.user === userID.userID);
        if (authenticatedUserTinInfo) {
          setTinInfo(authenticatedUserTinInfo); 
        } else {
          console.error('Authenticated user does not have a TIN entry');
        }
      } else {
        console.error('Failed to fetch TIN information');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TIN Information</Text>
      {tinInfo ? (
        <View style={styles.itemContainer}>
          <View style={styles.itemRow}>
            <FontAwesome5 name="user" style={styles.icon} />
            <Text style={styles.value}>{tinInfo.full_name}</Text>
          </View>
          <View style={styles.itemRow}>
            <FontAwesome5 name="calendar-alt" style={styles.icon} />
            <Text style={styles.value}>{tinInfo.date_of_birth}</Text>
          </View>
          <View style={styles.itemRow}>
            <FontAwesome5 name="map-marker-alt" style={styles.icon} />
            <Text style={styles.value}>{tinInfo.address}</Text>
          </View>
          <View style={styles.itemRow}>
            <FontAwesome5 name="phone" style={styles.icon} />
            <Text style={styles.value}>{tinInfo.contact_number}</Text>
          </View>
          <View style={styles.itemRow}>
            <FontAwesome5 name="id-card" style={styles.icon} />
            <Text style={styles.label}>NID:</Text>
            <Text style={styles.value}>{tinInfo.nid}</Text>
          </View>
          <View style={styles.itemRow}>
            <FontAwesome5 name="id-badge" style={styles.icon} />
            <Text style={styles.label}>TIN:</Text>
            <Text style={styles.value}>{tinInfo.tin}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>No TIN information available for the authenticated user.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '80%',
    backgroundColor: '#c6eec4',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#22ab20',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 20,
    color: '#22ab20',
    marginRight: 10,
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: '#22ab20',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: 'black',
    textAlign: 'right',
  },
  loadingText: {
    fontSize: 16,
    color: '#999',
  },
});

export default TinDisplay;
