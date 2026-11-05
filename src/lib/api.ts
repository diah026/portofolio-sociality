const API_BASE_URL =
  "https://be-social-media-api-production.up.railway.app/api";

type LoginResponse = {
  success: boolean;
  message: string;
  data?: {
    token?: string;
    user?: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
};

// Fungsi 1: Login menggunakan email dan password
export async function loginUser(email: string, password: string) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result: LoginResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Login gagal.");
  }

  const token = result.data?.token;

  if (!token) {
    throw new Error("Token tidak ditemukan pada respons login.");
  }

  return {
    token,
    user: result.data?.user,
  };
}

// Fungsi 2: Mengirim request dengan Bearer token
export async function authFetch(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem("sociality_token");

  if (!token) {
    throw new Error("Kamu harus login terlebih dahulu.");
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  return response;
}
