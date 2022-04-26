export type BookSection = {
  title: string;
  content: string;
};

export type Book = {
  id: number;
  title: string;
  category_id: number;
  authors: string[];
  cover_url: string;
  description: string;
  sections: BookSection[];
  audio_length: 840;
};

export type BookPagination = {
  page: number;
  hasNextPage: boolean;
  itemsPerPage: number;
  isLoading: boolean;
};
