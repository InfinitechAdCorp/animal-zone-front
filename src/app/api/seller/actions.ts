export function getDocumentUrl(pathOrId: string, documentType?: string) {
  if (pathOrId.startsWith("uploads/")) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/${pathOrId}`;
  }

  if (documentType) {
    return `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/sellers/${pathOrId}/documents/${documentType}`;
  }

  return "";
}
