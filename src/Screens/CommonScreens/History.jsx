import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import NavBar from './NavBar';
import TopBar from './TopBar';
import TaxTransactionTable from './TaxTransactionTable';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../../apiConfig';

const History = () => {
  const [activeButton, setActiveButton] = useState('history');
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const [token] = useCookies(['myToken']);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
      return () => {
        // Clean up if needed
      };
    }, [])
  );

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notification/tax-payment-history/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      const data = await response.json();

      if (data !== null) {
        setTransactions(data.transactions);
      }
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  };

  const handleHistoryPress = () => {
    setActiveButton('history');
  };

  const handleReload = () => {
    setReloadTrigger(reloadTrigger + 1);
  };

  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>
        <TaxTransactionTable header={'Tax Transactions'} transactions={transactions} />
      </View>
      <NavBar
        onHistoryPress={handleHistoryPress}
        activeButton={activeButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    marginTop: 45,
    height: '80%',
  },
  
});

export default History;
