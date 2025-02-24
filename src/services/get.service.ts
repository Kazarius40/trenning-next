export async function fetchUsersApi(params: string) {
    await fetch('http://localhost:3000/api/auth/get', {
        method: 'GET',
        body: params,
    });

}