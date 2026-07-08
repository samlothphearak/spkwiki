const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/api/auth${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as T;
}

export async function registerUser(payload: { name: string; email: string; password: string }) {
  return request<{ success: boolean; message: string; token: string; user: { id: string; name: string; email: string; role: string; bio: string; avatar: string; isVerified: boolean; isActive: boolean; createdAt: string } }>('/register', {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginUser(payload: { email: string; password: string }) {
  return request<{ success: boolean; message: string; token: string; user: { id: string; name: string; email: string; role: string; bio: string; avatar: string; isVerified: boolean; isActive: boolean; createdAt: string } }>('/login', {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function fetchCurrentUser(token: string) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data as { success: boolean; user: { id: string; name: string; email: string; role: string; bio: string; avatar: string; isVerified: boolean; isActive: boolean; createdAt: string } };
}
