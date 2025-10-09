import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
// A linha abaixo é a que precisa ser corrigida.
// Garanta que NÃO tenha '.js' no final de 'react-native-chart-kit'
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Grafico = ({ data }) => {
  const dadosValidos = 
    data && 
    Array.isArray(data.labels) && 
    Array.isArray(data.datasets) && 
    data.datasets.length > 0 &&
    Array.isArray(data.datasets[0].data) &&
    data.datasets[0].data.length >= 2;

  if (!dadosValidos) {
    return (
      <View style={styles.containerVazio}>
        <Text style={styles.textoVazio}>Adicione pelo menos 2 registros para ver a evolução no gráfico.</Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundColor: '#ffc107',
    backgroundGradientFrom: '#ffc107',
    backgroundGradientTo: '#ffa000',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: { borderRadius: 16 },
    propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa000' },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Evolução da Nota das Criações</Text>
      <LineChart
        data={data}
        width={screenWidth - 40}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.grafico}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20, alignItems: 'center' },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  grafico: { marginVertical: 8, borderRadius: 16 },
  containerVazio: { marginTop: 20, padding: 20, backgroundColor: '#FFF8E1', borderRadius: 8, alignItems: 'center', marginHorizontal: 20 },
  textoVazio: { color: '#8D6E63', textAlign: 'center', fontSize: 14 },
});

export default Grafico;
