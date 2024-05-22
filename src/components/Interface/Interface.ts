export interface BookResult {
    cover_i: string;
    author_name: string;
    key: string;
    title: string;
    author_key: number;
    name: string;
    ebook_access: string;
    first_publish_year: number;
    first_sentence: string;
}
export interface BookSearchResult {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: BookResult[];
}
/******************************* */
export interface authorResult {
    cover_id: string;
    cover_i: string;
    name: string;
    birth_date: number;
    death_date: number;
    key: string;
    top_subjects: string;
    top_work: string;
}
export interface authorSearchResult {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: authorResult[];
}