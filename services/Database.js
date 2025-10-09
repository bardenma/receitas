import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native'; // Importar Platform
import * as Sharing from 'expo-sharing';

const fileUri = FileSystem.documentDirectory + 'dados.json';

// ... (as funções carregarDados e salvarDados continuam iguais) ...
export const carregarDados = async () => {
  console.log("Serviço de DB: Carregando dados...");
  try {
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (fileInfo.exists) {
      const jsonString = await FileSystem.readAsStringAsync(fileUri, { encoding: 'utf8' });
      return jsonString ? JSON.parse(jsonString) : [];
    }
  } catch (e) {
    console.error("Erro ao carregar dados:", e);
    Alert.alert("Erro", "Falha ao carregar os dados do arquivo.");
  }
  return [];
};

export const salvarDados = async (registros) => {
  console.log("Serviço de DB: Salvando dados...");
  try {
    const jsonString = JSON.stringify(registros, null, 2);
    await FileSystem.writeAsStringAsync(fileUri, jsonString, { encoding: 'utf8' });
  } catch (e) {
    console.error("Erro ao salvar dados:", e);
    Alert.alert("Erro", "Falha ao salvar os dados no arquivo.");
  }
};


// ===== 👇 FUNÇÃO DE EXPORTAÇÃO ATUALIZADA PARA MÚLTIPLAS PLATAFORMAS 👇 =====
export const exportarDados = async (registros) => {
  console.log("Serviço de DB: Exportando dados...");
  if (registros.length === 0) {
    Alert.alert("Exportar", "Não há dados para exportar.");
    return;
  }

  const nomeArquivo = 'diario_chef_export.json';
  const jsonString = JSON.stringify(registros, null, 2);

  if (Platform.OS === 'web') {
    // LÓGICA PARA WEB: Simula o download de um arquivo
    console.log("Plataforma Web detectada. Iniciando download...");
    try {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      // Cria um link temporário no HTML
      const a = document.createElement('a');
      a.href = url;
      a.download = nomeArquivo;
      
      // Simula o clique no link para iniciar o download
      document.body.appendChild(a);
      a.click();
      
      // Limpa o link da memória
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      console.log("Download iniciado no navegador.");

    } catch (e) {
      console.error("Erro ao exportar dados na web:", e);
      Alert.alert("Erro", "Falha ao exportar os dados no navegador.");
    }

  } else {
    // LÓGICA PARA MOBILE (ANDROID/IOS): Usa a API de compartilhamento
    console.log("Plataforma Mobile detectada. Usando API de compartilhamento...");
    const exportFileUri = FileSystem.documentDirectory + nomeArquivo;
    try {
      await FileSystem.writeAsStringAsync(exportFileUri, jsonString, { encoding: 'utf8' });
      await Sharing.shareAsync(exportFileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Exportar dados do diário',
      });
    } catch (e) {
      console.error("Erro ao exportar dados no mobile:", e);
      Alert.alert("Erro", "Falha ao exportar os dados.");
    }
  }
};
