export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetcher = (path: string) => fetch(
    `${API_URL}${path}`,
).then((res) => res.json());
