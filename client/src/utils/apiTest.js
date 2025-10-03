export const testBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth');
    console.log('Backend connection test:', response.status);
    return response.ok;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return false;
  }
};