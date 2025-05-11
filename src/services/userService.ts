export const fetchUsers = async () => {
  try {
    const response = await fetch('https://api.github.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
};

export const fetchUserDetails = async (username: string) => {
  const response = await fetch(`https://api.github.com/users/${username}`);
  if (!response.ok) throw new Error('Error al obtener detalles del usuario');
  return response.json();
};