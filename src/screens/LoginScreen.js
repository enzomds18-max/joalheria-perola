import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { supabase } from '../supabase';
import { hashSenha, emailValido } from '../utils';
import { cores } from '../theme';

export default function LoginScreen({ navigation }) {
  const [modo, setModo] = useState('login'); // 'login' | 'cadastro'
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function enviar() {
    if (!emailValido(email) || senha.length < 4) {
      Alert.alert('Atenção', 'Informe um e-mail válido e uma senha com pelo menos 4 caracteres.');
      return;
    }
    setCarregando(true);
    try {
      const hash = await hashSenha(senha);
      const emailLimpo = email.trim().toLowerCase();

      if (modo === 'cadastro') {
        const { error } = await supabase.from('usuarios').insert({ email: emailLimpo, senha_hash: hash });
        if (error) {
          Alert.alert('Erro', error.code === '23505' ? 'Este e-mail já está cadastrado.' : error.message);
        } else {
          Alert.alert('Pronto!', 'Conta criada. Agora faça login.');
          setModo('login');
          setSenha('');
        }
      } else {
        const { data, error } = await supabase
          .from('usuarios')
          .select('id, email')
          .eq('email', emailLimpo)
          .eq('senha_hash', hash)
          .maybeSingle();
        if (error) Alert.alert('Erro', error.message);
        else if (!data) Alert.alert('Ops', 'E-mail ou senha incorretos.');
        else navigation.replace('Catalogo', { usuario: data });
      }
    } catch (e) {
      Alert.alert('Erro', String(e.message || e));
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={s.container}>
      <Text style={s.logo}>Pérola</Text>
      <Text style={s.sub}>Joalheria e oficina de relógios</Text>

      <TextInput
        style={s.input}
        placeholder="E-mail"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={s.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={s.botao} onPress={enviar} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color={cores.azul} />
        ) : (
          <Text style={s.botaoTxt}>{modo === 'login' ? 'Entrar' : 'Criar conta'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setModo(modo === 'login' ? 'cadastro' : 'login')}>
        <Text style={s.link}>{modo === 'login' ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Entrar'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: cores.azul },
  logo: { fontSize: 48, fontWeight: 'bold', color: cores.dourado, textAlign: 'center' },
  sub: { color: cores.branco, textAlign: 'center', marginBottom: 32 },
  input: { backgroundColor: cores.branco, borderRadius: 8, padding: 14, marginBottom: 12 },
  botao: { backgroundColor: cores.dourado, borderRadius: 8, padding: 14, alignItems: 'center', marginTop: 4 },
  botaoTxt: { color: cores.azul, fontWeight: 'bold', fontSize: 16 },
  link: { color: cores.branco, textAlign: 'center', marginTop: 20 },
});
