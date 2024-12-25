import React from 'react';
import { Settings } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { STRATEGY_TYPE_OPTIONS } from '../../../constants/strategy';
import type { PublishStrategyFormData } from '../../../types/publish';

interface StrategyBasicInfoProps {
  formData: PublishStrategyFormData;
  onFieldChange: (field: keyof PublishStrategyFormData, value: any) => void;
}

export function StrategyBasicInfo({ formData, onFieldChange }: StrategyBasicInfoProps) {
  return (
    <>
      <Input
        id="name"
        label="策略名称"
        icon={Settings}
        required
        value={formData.name}
        onChange={(e) => onFieldChange('name', e.target.value)}
        placeholder="请输入策略名称"
      />

      <Select
        id="strategy_type"
        label="策略类型"
        icon={Settings}
        required
        value={formData.strategy_type}
        onChange={(e) => onFieldChange('strategy_type', e.target.value)}
        options={STRATEGY_TYPE_OPTIONS}
      />
    </>
  );
}