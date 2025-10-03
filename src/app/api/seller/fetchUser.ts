export async function fetchCurrentUser(): Promise<any | null> {
  const token = localStorage.getItem("authToken")

  if (!token) {
    console.warn("⚠️ No authToken found in localStorage")
    return null
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store", // ensure fresh data every time
    })

    console.log("🌐 Fetch /me status:", res.status)

    if (!res.ok) {
      // Log once, but don’t spam console with raw HTML error page
      console.error(`❌ Failed to fetch user (status: ${res.status})`)
      return null
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("🔥 Error fetching user:", error)
    return null
  }
}
