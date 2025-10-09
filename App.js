import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, Button, Platform } from 'react-native';
import Formulario from './components/Formulario';
import ListaRegistros from './components/ListaRegistros';
import Grafico from './components/Grafico';
import { carregarDados, salvarDados, exportarDados } from './services/Database';

export default function App() {
  const [receitasNovas, setReceitasNovas] = useState('');
  const [refeicoesEmCasa, setRefeicoesEmCasa] = useState('');
  const [notaCriacao, setNotaCriacao] = useState('');
  
  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [ordenacao, setOrdenacao] = useState('recentes');

  useEffect(() => {
    const carregarRegistrosIniciais = async () => {
      const dadosIniciais = await carregarDados();
      setRegistros(dadosIniciais);
      setCarregando(false);
    };
    carregarRegistrosIniciais();
  }, []);

  useEffect(() => {
    if (!carregando) {
      salvarDados(registros);
    }
  }, [registros, carregando]);

  const handleSave = (novas, refeicoes, nota) => {
    const receitasNum = parseInt(novas, 10);
    const refeicoesNum = parseInt(refeicoes, 10);
    const notaNum = parseInt(nota, 10);

    if (isNaN(receitasNum) || isNaN(refeicoesNum) || isNaN(notaNum)) {
      return Alert.alert('Erro', 'Por favor, preencha todos os campos com números.');
    }
    if (receitasNum < 0 || refeicoesNum < 0) {
      return Alert.alert("Valores Inválidos", "A quantidade de receitas e refeições não pode ser negativa.");
    }
    if (notaNum < 1 || notaNum > 10) {
      return Alert.alert("Nota Inválida", "A nota para sua criação deve ser um valor entre 1 e 10.");
    }

    let mensagemSucesso = '';
    if (editandoId) {
      setRegistros(
        registros.map((reg) =>
          reg.id === editandoId
            ? { ...reg, receitas: receitasNum, refeicoes: refeicoesNum, nota: notaNum }
            : reg
        )
      );
      setEditandoId(null);
      mensagemSucesso = 'Registro atualizado com sucesso!';
    } else {
      const novoRegistro = {
        id: new Date().getTime(),
        receitas: receitasNum,
        refeicoes: refeicoesNum,
        nota: notaNum,
      };
      setRegistros(listaAnterior => [...listaAnterior, novoRegistro]);
      mensagemSucesso = 'Registro salvo com sucesso!';
    }

    setReceitasNovas('');
    setRefeicoesEmCasa('');
    setNotaCriacao('');
    Alert.alert('Sucesso!', mensagemSucesso);
  };

  const handleEdit = (item) => {
    setEditandoId(item.id);
    setReceitasNovas(String(item.receitas));
    setRefeicoesEmCasa(String(item.refeicoes));
    setNotaCriacao(String(item.nota));
  };

  const handleDelete = (id) => {
    setRegistros(registros.filter((reg) => reg.id !== id));
    Alert.alert('Concluído', 'O registro foi deletado.');
  };

  const handleExport = () => {
    exportarDados(registros);
  };

  let registrosExibidos = [...registros]; 
  if (ordenacao === 'melhor_nota') {
    registrosExibidos.sort((a, b) => b.nota - a.nota || b.id - a.id);
  } else if (ordenacao === 'mais_receitas') {
    registrosExibidos.sort((a, b) => b.receitas - a.receitas || b.id - a.id);
  } else {
    registrosExibidos.sort((a, b) => b.id - a.id);
  }

  const registrosOrdenadosParaGrafico = [...registros].sort((a, b) => a.id - b.id);
  
  const dadosGrafico = {
    labels: registrosOrdenadosParaGrafico.map(reg => new Date(reg.id).toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' })),
    datasets: [
      {
        data: registrosOrdenadosParaGrafico.map(reg => reg.nota),
      },
    ],
  };

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Carregando diário...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.titulo}>Diário de um Chef Amador 🍳</Text>
      <Grafico data={dadosGrafico} />
      <View style={styles.divisor} />
      <Formulario
        onSave={handleSave}
        editandoId={editandoId}
        receitasNovas={receitasNovas}
        setReceitasNovas={setReceitasNovas}
        refeicoesEmCasa={refeicoesEmCasa}
        setRefeicoesEmCasa={setRefeicoesEmCasa}
        notaCriacao={notaCriacao}
        setNotaCriacao={setNotaCriacao}
      />

      <View style={styles.ordenacaoContainer}>
        <Text style={styles.ordenacaoLabel}>Ordenar por:</Text>
        <Button title="Recentes" onPress={() => setOrdenacao('recentes')} color={ordenacao === 'recentes' ? '#28a745' : 'gray'} />
        <Button title="Melhor Nota" onPress={() => setOrdenacao('melhor_nota')} color={ordenacao === 'melhor_nota' ? '#28a745' : 'gray'} />
        <Button title="Mais Receitas" onPress={() => setOrdenacao('mais_receitas')} color={ordenacao === 'mais_receitas' ? '#28a745' : 'gray'} />
      </View>

      <ListaRegistros
        registros={registrosExibidos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <View style={styles.exportButtonWrapper}>
        <Button
          title="Exportar Dados (JSON)"
          onPress={handleExport}
          color={Platform.OS === 'ios' ? '#FFFFFF' : '#6c757d'}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5DC' },
  contentContainer: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 50 },
  titulo: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 15, color: '#333333', fontFamily: 'sans-serif-condensed' },
  divisor: { height: 1, backgroundColor: '#E0E0E0', marginVertical: 25 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5DC' },
  loadingText: { fontSize: 18, color: '#333' },
  exportButtonWrapper: { marginTop: 30, backgroundColor: '#6c757d', borderRadius: 8, elevation: 2 },
  ordenacaoContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 20, marginTop: 10, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 8 },
  ordenacaoLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});
