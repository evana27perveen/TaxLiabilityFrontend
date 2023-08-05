import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


const TaxTransactionTable = ({ header, transactions }) => {
  const renderTransactions = transactions.map(item => (
    <View key={item.id} style={styles.row}>
      <Text style={styles.date}>{item.payment_date}</Text>
      <Text style={styles.date}>{monthNames[item.month_of_payment - 1]} {item.year_of_payment_month}</Text>
      <Text style={styles.amount}>৳. {item.amount}</Text>
    </View>
  ));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Month</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {renderTransactions}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 3,
    paddingHorizontal: 16,
    width: '100%',
  },
  header: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#275c27',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  scrollViewContent: {
    minHeight: 80,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  date: {
    fontSize: 14,
  },
  amount: {
    fontSize: 14,
  },
});

export default TaxTransactionTable;
