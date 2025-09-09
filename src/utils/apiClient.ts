export async function apiClient<T>(endpoint: string): Promise<T> {
    const res = await fetch(endpoint);
    const json = await res.json();

    if (json.error) {
        throw new Error(json.error);
    }

    return json.result;
}
