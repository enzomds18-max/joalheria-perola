jest.mock('expo-crypto', () => ({
  digestStringAsync: jest.fn(),
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
}));

import { formatarPreco, emailValido } from '../src/utils';

describe('formatarPreco', () => {
  test('formata valor com milhar e centavos', () => {
    expect(formatarPreco(1234.5)).toBe('R$ 1.234,50');
  });
  test('valor inválido vira zero', () => {
    expect(formatarPreco('abc')).toBe('R$ 0,00');
  });
});

describe('emailValido', () => {
  test('aceita e-mail correto', () => {
    expect(emailValido('enzo@teste.com')).toBe(true);
  });
  test('rejeita e-mail sem @', () => {
    expect(emailValido('enzoteste.com')).toBe(false);
  });
});
