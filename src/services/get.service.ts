"use client";
export async function fetchUsersApi(endpoint: string) {
    const response = await fetch(`http://localhost:3000/api/get${endpoint}`, {
        method: 'GET',
    });
    return response.json();
}