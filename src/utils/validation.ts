import { Movie } from '../types/Movie';

export const validateFormData = (data: Movie) => {
  return Object.keys(data).every(key => data[key as keyof Movie] !== '');
};

export const validateImageUrl = (url: string) => {
  return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif))$/i.test(url);
};
