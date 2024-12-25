import React from 'react';
import { Clock } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { PUBLISH_TYPE_OPTIONS } from '../../../constants/strategy';
import type { PublishStrategyFormData } from '../../../types/publish';

interface PublishSettingsProps {
  formData: PublishStrategyFormData;
  onFieldChange: (field: keyof PublishStrategyFormData, value: any) => void;
}

export function PublishSettings({ formData, onFieldChange }: PublishSettingsProps) {
  return (
    <>
      <Select
        id="publish_type"
        label="发布类型"
        icon={Clock}
        required
        value={formData.publish_type}
        onChange={(e) => onFieldChange('publish_type', e.target.value)}
        options={PUBLISH_TYPE_OPTIONS}
      />

      <Input
        id="interval"
        type="number"
        label="时间间隔(分钟)"
        icon={Clock}
        required
        min={1}
        value={formData.interval.toString()}
        onChange={(e) => onFieldChange('interval', parseInt(e.target.value) || 1)}
      />

      <Input
        id="quantity"
        type="number"
        label="发布数量"
        icon={Clock}
        required
        min={1}
        value={formData.quantity.toString()}
        onChange={(e) => onFieldChange('quantity', parseInt(e.target.value) || 1)}
      />
    </>
  );
}