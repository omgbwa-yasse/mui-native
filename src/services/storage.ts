import AsyncStorage from '@react-native-async-storage/async-storage';

const GUEST_TOKEN_KEY = '@004/guest_token';

export async function getStoredToken(): Promise<string | null> {
  return AsyncStorage.getItem(GUEST_TOKEN_KEY);
}

export async function storeToken(token: string): Promise<void> {
  await AsyncStorage.setItem(GUEST_TOKEN_KEY, token);
}

export async function clearToken(): Promise<void> {
  await AsyncStorage.removeItem(GUEST_TOKEN_KEY);
}
