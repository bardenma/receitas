# Diário de um Chef Amador 

Este é um projeto de aplicativo mobile desenvolvido como parte da disciplina de Programação Mobile, do curso técnico de Desenvolvimento de Sistemas, lecionada pelo Professor Artur Scolari. O objetivo é criar um diário pessoal para registrar e acompanhar métricas diárias relacionadas a atividades culinárias, com dados salvos de forma persistente no dispositivo.

## Sobre o Projeto 

O "Diário de um Chef Amador" é um aplicativo para entusiastas da culinária que desejam acompanhar sua jornada na cozinha. Ele permite que o usuário registre diariamente o número de receitas novas que tentou, a quantidade de refeições que cozinhou em casa e dê uma nota para sua melhor criação do dia.

O app foi projetado para ser uma ferramenta de autoavaliação e motivação, oferecendo funcionalidades de ordenação dos registros, visualização gráfica da evolução das notas e exportação dos dados.

## Tecnologias Utilizadas 

*   **React Native:** Framework para desenvolvimento de apps multiplataforma (iOS, Android e Web).
*   **Expo (Snack):** Plataforma e conjunto de ferramentas para facilitar o desenvolvimento e a prototipagem com React Native.
*   **JavaScript (ES6+):** Linguagem de programação principal.
*   **Expo File System:** Para persistência de dados localmente no dispositivo através de um arquivo JSON.
*   **Expo Sharing:** Para habilitar a funcionalidade de exportação/compartilhamento de dados no Android e iOS.
*   **React Native Chart Kit:** Para a visualização da evolução das notas em um gráfico de linha.

## Funcionalidades Principais 

- [x] **CRUD Completo:** Criação, Leitura, Edição e Exclusão de registros diários.
- [x] **Persistência de Dados:** Os registros são salvos localmente e não se perdem ao fechar o app.
- [x] **Validação de Dados:** O sistema impede a entrada de valores inválidos (como números negativos ou notas fora do intervalo de 1 a 10).
- [x] **Ordenação Dinâmica:** Permite ao usuário ordenar os registros por data ("Mais Recentes"), pela qualidade da criação ("Melhor Nota") ou pela produtividade ("Mais Receitas").
- [x] **Visualização Gráfica:** Exibe um gráfico de linha que mostra a evolução das notas das criações ao longo do tempo.
- [x] **Exportação de Dados:** Funcionalidade para exportar todos os registros para um arquivo `.json`, funcionando tanto no navegador (download direto) quanto no celular (menu de compartilhamento).

## Como Executar

O aplicativo foi desenvolvido no ambiente online **Expo Snack**, o que permite sua execução em qualquer dispositivo.

*   **Para testar online:** Acesse o link do projeto no Expo Snack (https://snack.expo.dev/@maribp/receitas).
*   **Para instalar no Android:** O arquivo de instalação (`.apk`) pode ser encontrado na seção de **Releases** deste repositório.

