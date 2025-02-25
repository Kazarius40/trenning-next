export async function loginWithToken(data: FormData) {
   return await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        body: data,
    });
}