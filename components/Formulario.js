import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Formulario = ({
  onSave,
  editandoId,
  receitasNovas,
  setReceitasNovas,
  refeicoesEmCasa,
  setRefeicoesEmCasa,
  notaCriacao,
  setNotaCriacao,
}) => {

  const handleSaveClick = () => {
    // Passo 2.2: Atualizando a chamada onSave para enviar os três valores
    onSave(receitasNovas, refeicoesEmCasa, notaCriacao);
  };

  return (
    <View style={styles.container}>
      {/* Passo 2.1: Alterando os placeholders para as novas perguntas */}
      <TextInput
        style={styles.input}
        placeholder="Quantas receitas novas você tentou hoje?"
        keyboardType="numeric"
        value={receitasNovas}
        onChangeText={setReceitasNovas}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantas refeições você cozinhou em casa?"
        keyboardType="numeric"
        value={refeicoesEmCasa}
        onChangeText={setRefeicoesEmCasa}
      />
      <TextInput
        style={styles.input}
        placeholder="Nota para sua melhor criação (1-10)"
        keyboardType="numeric"
        value={notaCriacao}
        onChangeText={setNotaCriacao}
      />
      <Button
        title={editandoId ? 'Atualizar' : 'Salvar'}
        onPress={handleSaveClick}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default Formulario;