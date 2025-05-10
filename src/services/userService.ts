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