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
    <div style={{ marginBottom: '20px' }}>
      <h3
        className="text-[#f9f9f9]"
        style={{ fontSize: '14px', marginBottom: '8px' }}
      >
        Create your library:
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
      >
        <Input
          {...register('title')}
          label="Book title:"
          placeholder="Enter text"
          error={errors.title?.message}
        />
        <Input
          {...register('author')}
          label="The author:"
          placeholder="Enter text"
          error={errors.author?.message}
        />
        <Input
          {...register('totalPages')}
          label="Number of pages:"
          type="number"
          placeholder="0"
          error={errors.totalPages?.message}
        />

        <div style={{ marginTop: '12px' }}>
          <Button type="submit" isLoading={isPending} size="sm">
            Add book
          </Button>
        </div>
      </form>
    </div>
  );
}
