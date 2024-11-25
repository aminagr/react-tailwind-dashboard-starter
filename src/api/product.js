// src/api/product.js
import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/products';  


export const getProducts = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};


export const addProduct = async (productData) => {
  try {
    const response = await axios.post(apiUrl, productData);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${apiUrl}/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};


export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`${apiUrl}/${productId}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
