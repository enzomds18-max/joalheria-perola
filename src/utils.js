import * as Crypto from 'expo-crypto';

// Formata número como moeda brasileira: 1234.5 -> "R$ 1.234,50"
export function formatarPreco(valor) {
  const n = Number(valor) || 0;
  const [inteiro, decimal] = n.toFixed(2).split('.');
  return `R$ ${inteiro.replace(/\B(?=(\d{3})+(?!\d))/g, '.')},${decimal}`;
}

export function emailValido(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

// Criptografia da senha (hash SHA-256) antes de enviar ao servidor
export async function hashSenha(senha) {
  return Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, senha);
}
