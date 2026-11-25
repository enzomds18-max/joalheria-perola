import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { catalogo } from '../data/catalogo';
import { formatarPreco } from '../utils';
import { cores } from '../theme';

export default function ProdutosScreen({ navigation, route }) {
  const { categoriaId } = route.params;
  const categoria = catalogo.find((c) => c.id === categoriaId);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={s.card}
        onPress={() => navigation.navigate('Detalhes', { produto: item })}
      >
        <Image source={item.foto} style={s.foto} resizeMode="cover" />
        <Text style={s.nome} numberOfLines={2}>{item.nome}</Text>
        <Text style={s.preco}>{formatarPreco(item.preco)}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={s.container}>
      <FlatList
        data={categoria.produtos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: 12 },
  card: { width: '48%', backgroundColor: cores.branco, borderRadius: 10, padding: 10, marginBottom: 12, elevation: 2 },
  foto: { width: '100%', height: 150, borderRadius: 8, marginBottom: 8 },
  nome: { fontSize: 14, fontWeight: 'bold', color: cores.texto },
  preco: { color: cores.azul, fontWeight: 'bold', marginTop: 4 },
});