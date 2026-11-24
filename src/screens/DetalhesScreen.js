import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Vibration, Alert } from 'react-native';
import { formatarPreco } from '../utils';
import { cores } from '../theme';

// Troque pelo número de WhatsApp da loja (DDI+DDD+número, só dígitos)
const WHATSAPP_LOJA = '5521999999999';

export default function DetalhesScreen({ route }) {
  const { produto } = route.params;
  const [favorito, setFavorito] = useState(false);

  // Recurso do celular #1: VIBRAR
  function favoritar() {
    Vibration.vibrate(200);
    setFavorito(!favorito);
  }

  // Recurso do celular #2: WHATSAPP
  async function chamarWhatsApp() {
    const msg = encodeURIComponent(`Olá! Tenho interesse em: ${produto.nome} (${formatarPreco(produto.preco)})`);
    try {
      await Linking.openURL(`https://wa.me/${WHATSAPP_LOJA}?text=${msg}`);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.emoji}>{produto.emoji || '💍'}</Text>
      <Text style={s.nome}>{produto.nome}</Text>
      <Text style={s.preco}>{formatarPreco(produto.preco)}</Text>
      <Text style={s.desc}>{produto.descricao}</Text>

      <TouchableOpacity style={[s.botao, { backgroundColor: cores.azul }]} onPress={favoritar}>
        <Text style={[s.botaoTxt, { color: cores.dourado }]}>{favorito ? '★ Favoritado' : '☆ Favoritar'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[s.botao, { backgroundColor: '#25D366' }]} onPress={chamarWhatsApp}>
        <Text style={s.botaoTxt}>Chamar no WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo, padding: 24, alignItems: 'center' },
  emoji: { fontSize: 100, marginVertical: 16 },
  nome: { fontSize: 24, fontWeight: 'bold', color: cores.texto, textAlign: 'center' },
  preco: { fontSize: 22, color: cores.azul, fontWeight: 'bold', marginVertical: 8 },
  desc: { color: cores.cinza, textAlign: 'center', marginBottom: 24 },
  botao: { width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  botaoTxt: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
});
