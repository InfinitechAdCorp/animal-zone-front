export async function loginUser(email: string, password: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; // dito mo makukuha yung token
}


// C:\laragon\www\animal-zone-front\src\app\api\auth.ts
export async function registerUser(
  name: string,
  email: string,
  password: string,
  contact_number: string
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ name, email, password, contact_number }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response from server");
  }

  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}
