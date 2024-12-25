import React from 'react';
import { MessageSquare } from 'lucide-react';
import { MultiSelect } from '../../ui/MultiSelect';
import { usePublicAccountOptions } from '../../../hooks/public-account/usePublicAccountOptions';

interface PublicAccountSelectProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function PublicAccountSelect({ value, onChange }: PublicAccountSelectProps) {
  const { options, loading, error } = usePublicAccountOptions();

  return (
    <MultiSelect
      label="发布公众号"
      icon={MessageSquare}
      options={options}
      value={value}
      onChange={onChange as (value: (string | number)[]) => void}
      error={error || undefined}
      disabled={loading}
    />
  );
}