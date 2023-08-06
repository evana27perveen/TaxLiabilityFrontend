import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NextTaxInfo = ({ amountToPay }) => {
  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  const firstDateOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
  const lastDateOfNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

  const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Next Tax Payment</Text>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(firstDateOfNextMonth)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Deadline:</Text>
          <Text style={styles.value}>{formatDate(lastDateOfNextMonth)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Amount to Pay:</Text>
          <Text style={styles.value}>৳. {amountToPay}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#275c27',
  },
  table: {
    marginTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    paddingBottom: 5,
    paddingTop: 5,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginRight: 10,
  },
  value: {
    fontSize: 14,
    color: '#333',
    
  },
});

export default NextTaxInfo;
