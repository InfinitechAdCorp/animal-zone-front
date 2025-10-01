export async function registerSeller(formData: FormData) {
  const res = await fetch("/api/seller/register", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed: ${res.status}`);
  }

  return res.json();
}


// Admin: Get all seller applications
export async function getSellerApplications(status = 'all') {
  const response = await fetch(`/api/admin/sellers?status=${status}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed: ${response.status}`);
  }
  
  return response.json();
}

// Admin: Get single seller application
export async function getSellerApplication(id: number) {
  const response = await fetch(`/api/admin/sellers/${id}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed: ${response.status}`);
  }
  
  return response.json();
}

// Admin: Approve seller
export async function approveSeller(id: number, remarks?: string) {
  const response = await fetch(`/api/admin/sellers/${id}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ remarks }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed: ${response.status}`);
  }
  
  return response.json();
}

// Admin: Reject seller
export async function rejectSeller(id: number, remarks: string) {
  const response = await fetch(`/api/admin/sellers/${id}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ remarks }),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed: ${response.status}`);
  }
  
  return response.json();
}

// Admin: Get statistics
export async function getAdminStatistics() {
  const response = await fetch(`/api/admin/statistics`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed: ${response.status}`);
  }
  
  return response.json();
}

// Admin: Get document URL (direct to backend)
export function getDocumentUrl(sellerId: number, documentType: string) {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers/${sellerId}/documents/${documentType}`;
}