import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase';
import { formatarPreco } from '../utils';
import { cores } from '../theme';

export default function CatalogoScreen({ navigation, route }) {
  const { usuario } = route.params || {};
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    setCarregando(true);
    const { data, error } = await supabase.from('produtos').select('*').order('id');
    if (!error) setProdutos(data || []);
    setCarregando(false);
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity style={s.card} onPress={() => navigation.navigate('Detalhes', { produto: item })}>
        <Text style={s.emoji}>{item.emoji || '💍'}</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.nome}>{item.nome}</Text>
          <Text style={s.categoria}>{item.categoria}</Text>
          <Text style={s.preco}>{formatarPreco(item.preco)}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={s.container}>
      <Text style={s.ola}>Olá, {usuario?.email}</Text>
      {carregando ? (
        <ActivityIndicator size="large" color={cores.azul} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          refreshing={carregando}
          onRefresh={carregar}
          ListEmptyComponent={<Text style={s.vazio}>Nenhum produto cadastrado.</Text>}
        />
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: 12 },
  ola: { color: cores.cinza, marginBottom: 8 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: cores.branco, borderRadius: 10, padding: 14, marginBottom: 10, elevation: 2 },
  emoji: { fontSize: 38, marginRight: 14 },
  nome: { fontSize: 16, fontWeight: 'bold', color: cores.texto },
  categoria: { color: cores.cinza, fontSize: 12 },
  preco: { color: cores.azul, fontWeight: 'bold', marginTop: 4 },
  vazio: { textAlign: 'center', marginTop: 40, color: cores.cinza },
});
