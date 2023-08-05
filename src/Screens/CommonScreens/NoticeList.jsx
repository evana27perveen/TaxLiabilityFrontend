import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import API_BASE_URL from '../../apiConfig'; 
import { useCookies } from 'react-cookie';
import moment from 'moment';

const NoticeList = () => {
  const [noticeList, setNoticeList] = useState([]);

  const [token] = useCookies(['myToken']);

  useEffect(() => {
    fetchNoticeList();
  }, []);

  const fetchNoticeList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notification/notice-list/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setNoticeList(result.notice_list);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Warnings</Text>
      <ScrollView>
        {noticeList.map((item) => (
          <View key={item.id} style={styles.notificationItem}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text style={styles.message}>{item.content}</Text>
            <Text style={styles.date}>
              {moment(item.issued_date).format('DD-MM-YYYY')}
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
    backgroundColor: 'white',
    borderWidth: 15,
    borderColor: '#c6eec4',
    borderRadius: 15,
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
    marginTop: 10,
    textAlign: 'center',
  },
  subject: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#188816',
  },
  date: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
    color: '#188816',
  },
});

export default NoticeList;
