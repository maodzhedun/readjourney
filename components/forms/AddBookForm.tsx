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
  const { mutate: addBook, isPending } = useAddBook();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBookFormData>({
    resolver: yupResolver(addBookSchema),
  });

  const onSubmit = (data: AddBookFormData) => {
    addBook(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-sm text-[#f9f9f9]">Create your library:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          {...register('title')}
          label="Book title:"
          placeholder="Enter book title"
          error={errors.title?.message}
          className="py-3"
        />
        <Input
          {...register('author')}
          label="The author:"
          placeholder="Enter the author"
          error={errors.author?.message}
          className="py-3"
        />
        <Input
          {...register('totalPages')}
          label="Number of pages:"
          type="number"
          placeholder="Enter number of pages"
          error={errors.totalPages?.message}
          className="py-3"
        />

        <div className="pt-2">
          <Button type="submit" isLoading={isPending} size="sm">
            Add book
          </Button>
        </div>
      </form>
    </div>
  );
}
