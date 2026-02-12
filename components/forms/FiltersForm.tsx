// components/forms/FiltersForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { BooksFilters } from '@/types';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface FiltersFormProps {
  onFilter: (filters: BooksFilters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

interface FiltersFormData {
  title: string;
  author: string;
}

export default function FiltersForm({
  onFilter,
  onReset,
  isLoading,
}: FiltersFormProps) {
  const { register, handleSubmit, reset } = useForm<FiltersFormData>({
    defaultValues: {
      title: '',
      author: '',
    },
  });

  const onSubmit = (data: FiltersFormData) => {
    const filters: BooksFilters = {};

    if (data.title.trim()) filters.title = data.title.trim();
    if (data.author.trim()) filters.author = data.author.trim();

    onFilter(filters);
  };

  const handleReset = () => {
    reset();
    onReset();
  };

  return (
    <div className="mb-5">
      <h3 className="mb-2 text-sm text-[#f9f9f9]">Filters:</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Input
          {...register('title')}
          label="Book title:"
          placeholder="Enter text"
        />
        <Input
          {...register('author')}
          label="The author:"
          placeholder="Enter text"
        />

        <div className="flex gap-2 pt-2">
          <Button type="submit" size="sm" isLoading={isLoading}>
            To apply
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}
