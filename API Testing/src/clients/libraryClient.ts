import { APIRequestContext, APIResponse } from '@playwright/test';
import { AddBookRequest, DeleteBookRequest } from '../types/bookTypes';

export class LibraryClient {
  constructor(private request: APIRequestContext) {}

  async addBook(payload: AddBookRequest): Promise<APIResponse> {
    return await this.request.post('https://rahulshettyacademy.com/Library/Addbook.php', {
      data: payload
    });
  }

  async getBookById(id: string): Promise<APIResponse> {
    return await this.request.get('https://rahulshettyacademy.com/Library/GetBook.php', {
      params: { ID: id }
    });
  }

  async deleteBook(payload: DeleteBookRequest): Promise<APIResponse> {
    return await this.request.post('https://rahulshettyacademy.com/Library/DeleteBook.php', {
      data: payload
    });
  }
}