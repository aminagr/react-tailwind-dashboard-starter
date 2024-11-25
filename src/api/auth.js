import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api'; 


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${apiUrl}/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    throw error;
  }
};


export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, loginData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    throw error;
  }
};


export const sendPasswordResetLink = async (email) => {
  try {
    const response = await axios.post(`${apiUrl}/sendResetLink`, { email });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du lien de réinitialisation:', error);
    throw error;
  }
};


export const resetPassword = async (resetData) => {
  try {
    const response = await axios.post(`${apiUrl}/resetPassword`, resetData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la réinitialisation du mot de passe:', error);
    throw error;
  }
};


export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      throw new Error("Aucun token trouvé pour la déconnexion.");
    }

    const response = await axios.post(`${apiUrl}/logout`, {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    throw error;
  }
};
