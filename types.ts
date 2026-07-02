export interface Project {
  id: number;
  title: string;
  genre: string;
  director: string;
  runtime: string;
  image: string;
  year: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}

declare module 'react-i18next' {
  export function useTranslation(): {
    t: (key: string) => string;
  };
}
