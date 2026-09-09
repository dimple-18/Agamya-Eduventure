export async function fetchAdminList<T>(
  url: string,
): Promise<{ data: T[]; error: string | null; readOnly: boolean; notice: string | null }> {
  try {
    const response = await fetch(url);
    const readOnly = response.headers.get("X-Admin-Read-Only") === "true";

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      return {
        data: [],
        error: body?.error ?? `Request failed (${response.status}).`,
        readOnly: false,
        notice: null,
      };
    }

    const data = await response.json();
    return {
      data: Array.isArray(data) ? data : [],
      error: null,
      readOnly,
      notice: readOnly
        ? "Supabase is not connected. Showing website content in read-only mode. Add .env.local to save changes."
        : null,
    };
  } catch {
    return {
      data: [],
      error: "Could not reach the admin API.",
      readOnly: false,
      notice: null,
    };
  }
}

export async function fetchAdminItem<T>(
  url: string,
): Promise<{ data: T | null; error: string | null }> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const body = (await response.json().catch(() => null)) as { error?: string } | null;
      return {
        data: null,
        error: body?.error ?? `Request failed (${response.status}).`,
      };
    }

    const data = await response.json();
    return { data: data as T, error: null };
  } catch {
    return { data: null, error: "Could not reach the admin API." };
  }
}
