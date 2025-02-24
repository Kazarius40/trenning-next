export async function loginWithToken(data: FormData): Promise<void> {
    await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        body: data,
    });
}