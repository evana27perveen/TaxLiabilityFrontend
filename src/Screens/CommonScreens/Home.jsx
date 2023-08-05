import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import TopBar from './TopBar';
import TaxInformation from './TaxInformation';
import TaxTransactionTable from './TaxTransactionTable';
import NextTaxInfo from './NextTaxInfo';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../../apiConfig';

const Home = () => {
    const [activeButton, setActiveButton] = useState('home');
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [token] = useCookies(['myToken']);

    const [taxID, setTaxID] = useState(0);
    const [category, setCategory] = useState('');
    const [taxStatus, setTaxStatus] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [tax, setTax] = useState('');

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
        const response = await fetch(`${API_BASE_URL}/notification/user-home-data/`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.access_token}`,
          },
        });
        const data = await response.json();
    
        if (data !== null) {
          setTaxID(data.tax_id);
          setCategory(data.category);
          setTaxStatus(data.is_paid);
          setTransactions(data.transactions);
          setTax(data.tax);
          console.log(data.transactions);
        }
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    




    const handleHomePress = () => {
        setActiveButton('home');
      };

  const handleReload = () => {
    
    setReloadTrigger(reloadTrigger + 1);
  };
  return (
    <View style={styles.container}>
    <TopBar />
      <View style={styles.content}>
      <TaxInformation
        taxId={taxID}
        taxCategory={category}
        taxStatus={taxStatus}
      />
      <View style={styles.divider} />
        <TaxTransactionTable header={'Last Tax Transactions'} transactions={transactions}/>
        
        <NextTaxInfo amountToPay={tax} />
        <View style={styles.divider} />
        {taxStatus === false && (
          <>
            <Text style={styles.notificationText}>This month's Tax is unpaid.</Text>
            
          </>
        )}
        <View style={styles.divider} />
      </View>
      
      <NavBar onHomePress={handleHomePress} activeButton={activeButton} />
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
    marginBottom: 60,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  notificationText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Home;
