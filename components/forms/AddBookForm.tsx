'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAddBook } from '@/hooks/useBooks';
import { addBookSchema } from '@/utils/validationSchemas';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface AddBookFormData {
  title: string;
  author: string;
  totalPages: number;
}

interface AddBookFormProps {
  onSuccess?: () => void;
}

export default function AddBookForm({ onSuccess }: AddBookFormProps) {
  const { mutateAsync: addBook, isPending } = useAddBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookFormData>({
    resolver: yupResolver(addBookSchema),
  });

  const onSubmit = async (data: AddBookFormData) => {
    try {
      await addBook(data);
      reset();
      onSuccess?.();
    } catch {
      // Error is handled in useAddBook
    }
  };

  return (
    <div>
      <h3 className="mb-2 text-sm text-[#f9f9f9]">Create your library:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <Input
          {...register('title')}
          label="Book title:"
          placeholder="Enter book title"
          error={errors.title?.message}
        />
        <Input
          {...register('author')}
          label="The author:"
          placeholder="Enter the author"
          error={errors.author?.message}
        />
        <Input
          {...register('totalPages')}
          label="Number of pages:"
          type="number"
          placeholder="0"
          error={errors.totalPages?.message}
        />

        <div className="mt-3">
          <Button type="submit" isLoading={isPending} size="sm">
            Add book
          </Button>
        </div>
      </form>
    </div>
  );
}
