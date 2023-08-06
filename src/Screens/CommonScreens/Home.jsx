import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import NavBar from './NavBar';
import TopBar from './TopBar';
import TaxInformation from './TaxInformation';
import TaxTransactionTable from './TaxTransactionTable';
import PaymentButton from './PaymentButton';
import NextTaxInfo from './NextTaxInfo';
import { useCookies } from 'react-cookie';
import API_BASE_URL from '../../apiConfig';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [activeButton, setActiveButton] = useState('home');
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const [token] = useCookies(['myToken']);
    const navigation = useNavigation();

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
        <TaxTransactionTable header={'Last Tax Transactions'} transactions={transactions}/>
        {taxStatus === false && (
          <>
            <View style={styles.divider} />
            <PaymentButton onPress={() => {navigation.navigate('Payment', { amount: tax });} }/>
            <View style={styles.divider} />
          </>
        )}
        
        <NextTaxInfo amountToPay={tax} />
        <View style={styles.divider} />
        <View style={styles.divider} />
        <View style={styles.divider} />
        <View style={styles.divider} />
      </View>
      
      <NavBar onHomePress={handleHomePress} activeButton={activeButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginVertical: 7,
  },
  notificationText: {
    fontSize: 12,
    color: 'red',
    marginTop: 5,
    marginBottom: 5,
  },
});

export default Home;
