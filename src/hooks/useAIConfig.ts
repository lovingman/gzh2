import { useState } from 'react';
import { adminApi } from '../services/admin/api';

export function useAIConfig() {
  const deleteConfig = async (configId: number) => {
    try {
      const response = await adminApi.deleteAIConfig(configId);
      if (response.code === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to delete AI config:', error);
      return false;
    }
  };

  return {
    deleteConfig
  };
}