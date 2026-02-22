'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';

import { useStartReading, useFinishReading } from '@/hooks/useReading';
import { readingSchema } from '@/utils/validationSchemas';
import { Book } from '@/types';

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

interface AddReadingFormData {
  page: number;
}

interface AddReadingFormProps {
  book: Book;
  onFinish?: () => void;
}

export default function AddReadingForm({
  book,
  onFinish,
}: AddReadingFormProps) {
  // Check if there is an active reading session
  const activeProgress = book.progress?.find(p => p.status === 'active');
  const isReading = !!activeProgress;

  const { mutate: startReading, isPending: isStarting } = useStartReading();
  const { mutate: finishReading, isPending: isFinishing } = useFinishReading();

  const isLoading = isStarting || isFinishing;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddReadingFormData>({
    resolver: yupResolver(readingSchema),
  });

  const onSubmit = (data: AddReadingFormData) => {
    if (isReading) {
      // Finish reading
      finishReading(
        { id: book._id, page: data.page },
        {
          onSuccess: () => {
            reset();
            // Checking if the book is finished
            if (data.page >= book.totalPages) {
              onFinish?.();
            }
          },
        }
      );
    } else {
      // Start reading
      startReading(
        { id: book._id, page: data.page },
        {
          onSuccess: () => reset(),
        }
      );
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <p
        className="text-[#f9f9f9]"
        style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}
      >
        {isReading ? 'Stop page:' : 'Start page:'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '20px' }}>
          <Input
            {...register('page')}
            label="Page number:"
            type="number"
            placeholder="0"
            error={errors.page?.message}
          />
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          size="sm"
          style={{ minWidth: '114px' }}
          className={clsx(
            isReading && 'bg-[#e90516] text-white hover:bg-[#f23344]'
          )}
        >
          {isReading ? 'To stop' : 'To start'}
        </Button>
      </form>
    </div>
  );
}
