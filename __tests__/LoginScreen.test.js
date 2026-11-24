import React from 'react';
import { render } from '@testing-library/react-native';

jest.mock('../src/supabase', () => ({ supabase: {} }));
jest.mock('expo-crypto', () => ({
  digestStringAsync: jest.fn(),
  CryptoDigestAlgorithm: { SHA256: 'SHA-256' },
}));

import LoginScreen from '../src/screens/LoginScreen';

describe('LoginScreen (renderização)', () => {
  test('mostra campos e botão de entrar', async () => {
    const { getByPlaceholderText, getByText } = await render(
      <LoginScreen navigation={{ replace: jest.fn() }} />
    );
    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });
});
