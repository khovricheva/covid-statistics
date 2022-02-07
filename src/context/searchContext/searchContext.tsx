import { createContext } from 'react';

export type Context = {
    searchQuery: string;
    setSearchQuery: (searchQuery: string) => void;
};
export const SearchContext = createContext<Context>({} as Context);
