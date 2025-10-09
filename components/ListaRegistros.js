import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const ListaRegistros = ({ registros, onEdit, onDelete }) => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        {/* Adicionamos um título para a data e um texto principal para os dados */}
        <Text style={styles.itemData}>{new Date(item.id).toLocaleDateString('pt-BR')}</Text>
        <Text style={styles.itemText}>
          {`Novas Receitas: ${item.receitas}`}
        </Text>
        <Text style={styles.itemText}>
          {`Refeições em Casa: ${item.refeicoes}`}
        </Text>
        <Text style={styles.itemText}>
          {`Nota da Criação: ${item.nota}/10`}
        </Text>
      </View>
      <View style={styles.botoesContainer}>
        {/* Botão Editar agora usa a cor amarelo "gema" */}
        <TouchableOpacity onPress={() => onEdit(item)} style={[styles.botao, styles.botaoEditar]}>
          <Text style={styles.botaoTexto}>Editar</Text>
        </TouchableOpacity>
        {/* Botão Deletar agora usa a cor vermelho "tomate" */}
        <TouchableOpacity onPress={() => onDelete(item.id)} style={[styles.botao, styles.botaoDelete]}>
          <Text style={styles.botaoTexto}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Adicionando uma mensagem para quando a lista estiver vazia
  const ListaVazia = () => (
    <View style={styles.listaVaziaContainer}>
      <Text style={styles.listaVaziaTexto}>Nenhum registro ainda.</Text>
      <Text style={styles.listaVaziaTexto}>Adicione seu primeiro prato do dia! 🍽️</Text>
    </View>
  );

  return (
    <FlatList
      data={registros}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.lista}
      ListEmptyComponent={ListaVazia}
      contentContainerStyle={{ flexGrow: 1 }} // Garante que o componente de lista vazia funcione bem
    />
  );
};

// ===== 👇 NOVO OBJETO DE ESTILOS PARA O ListaRegistros.js 👇 =====
const styles = StyleSheet.create({
  lista: {
    marginTop: 10,
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row', // Alinha o texto e os botões na mesma linha
    justifyContent: 'space-between', // Coloca o texto na esquerda e os botões na direita
    alignItems: 'center', // Centraliza verticalmente
  },
  itemData: {
    fontSize: 12,
    color: '#888',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, // Melhora a legibilidade
  },
  botoesContainer: {
    flexDirection: 'column', // Empilha os botões verticalmente
  },
  botao: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoEditar: {
    backgroundColor: '#ffc107', // Amarelo "gema"
    marginBottom: 10, // Espaço entre os botões
  },
  botaoDelete: {
    backgroundColor: '#dc3545', // Vermelho "tomate"
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // Estilos para a mensagem de lista vazia
  listaVaziaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listaVaziaTexto: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default ListaRegistros;