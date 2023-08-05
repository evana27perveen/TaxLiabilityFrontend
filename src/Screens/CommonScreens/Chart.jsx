import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory-native';

const Chart = () => {
  const data = [
    { x: 1, y: 500 },
    { x: 2, y: 800 },
    { x: 3, y: 600 },
    { x: 4, y: 1200 },
    { x: 5, y: 900 },
    { x: 6, y: 1500 },
    { x: 7, y: 1300 },
  ];

  return (
    <View style={styles.container}>
    
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryLine
          data={data}
          x="x"
          y="y"
          style={{
            data: { stroke: 'green', strokeWidth: 2 },
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    borderRadius: 10,
    width: '100%',
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    color: '#275c27',
  },
});

export default Chart;
