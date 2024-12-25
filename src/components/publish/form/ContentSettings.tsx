import React from 'react';
import { Settings } from 'lucide-react';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { CONTENT_TYPE_OPTIONS } from '../../../constants/strategy';
import type { PublishStrategyFormData } from '../../../types/publish';

interface ContentSettingsProps {
  formData: PublishStrategyFormData;
  onFieldChange: (field: keyof PublishStrategyFormData, value: any) => void;
  imageTypes: string[];
  loadingImageTypes: boolean;
}

export function ContentSettings({ 
  formData, 
  onFieldChange, 
  imageTypes, 
  loadingImageTypes 
}: ContentSettingsProps) {
  return (
    <>
      <Select
        id="content_type"
        label="内容类型"
        icon={Settings}
        required
        value={formData.content_type}
        onChange={(e) => onFieldChange('content_type', e.target.value)}
        options={CONTENT_TYPE_OPTIONS}
      />

      <Input
        id="layout_id"
        type="number"
        label="排版ID"
        icon={Settings}
        required
        min={1}
        value={formData.layout_id.toString()}
        onChange={(e) => onFieldChange('layout_id', parseInt(e.target.value) || 1)}
      />

      <Select
        id="image_type"
        label="图库类型"
        icon={Settings}
        required
        value={formData.image_type}
        onChange={(e) => onFieldChange('image_type', e.target.value)}
        options={imageTypes.map(type => ({ value: type, label: type }))}
        disabled={loadingImageTypes}
      />
    </>
  );
}