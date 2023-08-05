import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import API_BASE_URL from '../../apiConfig'; 
import { useCookies } from 'react-cookie';
import moment from 'moment';

const NotificationList = () => {
  const [notificationList, setNotificationList] = useState([]);

  const [token] = useCookies(['myToken']);

  useEffect(() => {
    fetchNotificationList();
  }, []);

  const fetchNotificationList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notification/notification-list/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setNotificationList(result.notification_list);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <ScrollView>
        {notificationList.map((item) => (
          <View key={item.id} style={styles.notificationItem}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.date}>
              {moment(item.sent_date).format('DD-MM-YYYY ~~ HH:mm')}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#188816',
  },
  notificationItem: {
    padding: 20,
    width: '100%',
    backgroundColor: '#c6eec4',
    borderRadius: 10,
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default NotificationList;
