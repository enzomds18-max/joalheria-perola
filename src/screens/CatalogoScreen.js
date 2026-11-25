import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { catalogo } from '../data/catalogo';
import { cores } from '../theme';

export default function CatalogoScreen({ navigation, route }) {
  const { usuario } = route.params || {};

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={s.card}
        onPress={() => navigation.navigate('Produtos', { categoriaId: item.id })}
      >
        <Text style={s.emoji}>{item.icone}</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.nome}>{item.nome}</Text>
          <Text style={s.qtd}>{item.produtos.length} modelos</Text>
        </View>
        <Text style={s.seta}>›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={s.container}>
      <Text style={s.ola}>Olá, {usuario?.email}</Text>
      <FlatList
        data={catalogo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: 12 },
  ola: { color: cores.cinza, marginBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 10, padding: 16, marginBottom: 10, elevation: 2 },
  emoji: { fontSize: 38, marginRight: 14 },
  nome: { fontSize: 18, fontWeight: 'bold', color: cores.texto },
  qtd: { color: cores.cinza, marginTop: 2 },
  seta: { fontSize: 28, color: cores.dourado },
});