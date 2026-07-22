import { z } from 'zod';

export const addBookResponseSchema = z.object({
  Msg: z.string(),
  ID: z.string()
});

export const getBookResponseSchema = z.array(
  z.object({
    book_name: z.string(),
    isbn: z.string(),
    aisle: z.string(),
    author: z.string()
  })
);

export const deleteBookResponseSchema = z.object({
  msg: z.string()
});

export const notFoundResponseSchema = z.object({
  msg: z.string()
});