// src/lib/api.ts

// ---------------- SELLER REGISTRATION ----------------
export async function registerSeller(formData: FormData) {
  const res = await fetch("/api/seller/register", {
    method: "POST",
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed: ${res.status}`)
  }

  return res.json()
}

// ---------------- SELLERS (ADMIN SIDE) ----------------

// Get single seller application
export async function getSellerApplication(id: number) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    cache: "no-store",
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed: ${response.status}`)
  }

  return response.json()
}

// Get list of seller applications
export async function getSellerApplications(status: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers?status=${status}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch seller applications")

  const json = await res.json()
  return Array.isArray(json) ? json : json.data || json.sellers || []
}

// Approve seller
export async function approveSeller(id: number, remarks: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers/${id}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ remarks }),
  })
  return await res.json()
}

// Reject seller
export async function rejectSeller(id: number, remarks: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers/${id}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ remarks }),
  })
  return await res.json()
}

// ---------------- SELLER STORE (PUBLIC) ----------------

// Get seller info for store page
export async function getSellerInfo(sellerId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sellers/${sellerId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch seller information")
  }

  return res.json()
}

// Get products by seller
export async function getSellerProducts(sellerId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sellers/${sellerId}/products`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch seller products")
  }

  return res.json()
}

// ---------------- STATISTICS ----------------
export async function getAdminStatistics(token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/statistics`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed: ${response.status}`)
  }

  return response.json()
}

// Document URL builder (seller docs)
export function getDocumentUrl(pathOrId: string, documentType?: string) {
  if (pathOrId.startsWith("uploads/")) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pathOrId}`
  }

  if (documentType) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers/${pathOrId}/documents/${documentType}`
  }

  return ""
}

// ---------------- PRODUCTS (SELLER SIDE) ----------------
export async function createProduct(formData: FormData) {
  const token = localStorage.getItem("authToken")
  console.log("📌 Using Token:", token)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seller/products`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: formData,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    console.error("❌ API Error Response:", errorData)
    throw new Error(errorData.message || `Failed: ${res.status}`)
  }

  return res.json()
}

// ---------------- PRODUCTS (ADMIN SIDE) ----------------

// Get all pending products
export async function getPendingProducts(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products?status=pending`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

  if (!res.ok) throw new Error("Failed to fetch products")

  const json = await res.json()
  return Array.isArray(json) ? json : json.data || json.products || []
}

export async function approveProduct(id: number, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "approved" }),
  })
  return await res.json()
}

export async function rejectProduct(id: number, remarks: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/products/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: "rejected", remarks }),
  })
  return await res.json()
}

// ---------------- CART (BUYER SIDE) ----------------
export async function getCart(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed to fetch cart: ${res.status}`)
  }

  return res.json()
}

// Product document URL
export function getProductDocumentUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${path}`
}

// ---------------- CHECKOUT (BUYER SIDE) ----------------

// Get logged-in user info
export async function getUserInfo(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`, {
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  })
console.log("Backend URL →", process.env.NEXT_PUBLIC_BACKEND_URL)

  if (!res.ok) throw new Error("Failed to load user info")
  return res.json()
}

// Place order
export async function placeOrder(orderData: any, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
    method: "POST",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    body: JSON.stringify(orderData),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed: ${res.status}`)
  }

  return res.json()
}

export async function getSellerProductsNew(token: string, status?: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seller/products${status ? `?status=${status}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();

  return {
    products: json.data || [],
    counts: json.counts || {
      pending: 0,
      approved: 0,
      rejected: 0,
      outOfStock: 0,
    },
  };
}

export async function updateProductStatus(id: number, status: string, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seller/products/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });

  if (!res.ok) throw new Error("Failed to update product status");
  return res.json();
}

// ---------------- ORDER HISTORY (BUYER SIDE) ----------------
export async function getOrderHistory(token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || `Failed to fetch orders: ${res.status}`)
  }

  return res.json()
}


