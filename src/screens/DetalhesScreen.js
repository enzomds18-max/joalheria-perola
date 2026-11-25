import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Linking, Alert, Image, ScrollView } from 'react-native';
import { formatarPreco } from '../utils';
import { cores } from '../theme';

const WHATSAPP_LOJA = '5521987294664';

export default function DetalhesScreen({ route }) {
  const { produto } = route.params;

  async function chamarWhatsApp() {
    const texto = `Olá! Estou interessado(a) no produto ${produto.nome} (cód. ${produto.id}) por ${formatarPreco(produto.preco)}.`;
    try {
      await Linking.openURL(`https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(texto)}`);
    } catch {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    }
  }

  return (
    <ScrollView style={{ backgroundColor: cores.fundo }} contentContainerStyle={s.container}>
      <Image source={produto.foto} style={s.foto} resizeMode="cover" />
      <Text style={s.nome}>{produto.nome}</Text>
      <Text style={s.preco}>{formatarPreco(produto.preco)}</Text>

      <TouchableOpacity style={s.botao} onPress={chamarWhatsApp}>
        <Text style={s.botaoTxt}>Chamar no WhatsApp</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  container: { padding: 24, alignItems: 'center' },
  foto: { width: '100%', aspectRatio: 1, borderRadius: 12, marginBottom: 16 },
  nome: { fontSize: 24, fontWeight: 'bold', color: cores.texto, textAlign: 'center' },
  preco: { fontSize: 22, color: cores.azul, fontWeight: 'bold', marginVertical: 8 },
  botao: { width: '100%', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 16, backgroundColor: '#25D366' },
  botaoTxt: { color: cores.branco, fontWeight: 'bold', fontSize: 16 },
});