export interface AddBookRequest {
  name: string;
  isbn: string;
  aisle: string;
  author: string;
}

export interface AddBookResponse {
  Msg: string;
  ID: string;
}

export interface GetBookResponseItem {
  book_name: string;
  isbn: string;
  aisle: string;
  author: string;
}

export interface DeleteBookRequest {
  ID: string;
}

export interface DeleteBookResponse {
  msg: string;
}
