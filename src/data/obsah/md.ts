// Pomocník pro zápis textu karet v mini-markdownu po řádcích.
// Prázdný řetězec odděluje odstavce, řádek začínající „- “ je odrážka.
export const md = (...radky: string[]): string => radky.join("\n");
