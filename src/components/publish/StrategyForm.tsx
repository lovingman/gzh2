import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/Button';
import { publishApi } from '../../services/publish/api';
import { PublishStrategyFormData } from '../../types/publish';
import { useImageTypes } from '../../hooks/image/useImageTypes';
import { StrategyBasicInfo } from './form/StrategyBasicInfo';
import { PublishSettings } from './form/PublishSettings';
import { ContentSettings } from './form/ContentSettings';
import { PublicAccountSelect } from './form/PublicAccountSelect';

const DEFAULT_FORM_DATA: PublishStrategyFormData = {
  name: '',
  strategy_type: '存草稿',
  publish_type: '现在',
  interval: 30,
  quantity: 1,
  content_type: '文案',
  layout_id: 1,
  image_type: '',
  public_ids: []
};

export function StrategyForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { imageTypes, loading: loadingImageTypes } = useImageTypes();
  const [formData, setFormData] = useState<PublishStrategyFormData>(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStrategy = async () => {
      if (!id) return;
      try {
        const response = await publishApi.getStrategyList({ search: id });
        if (response.code === 200 && response.data?.items?.[0]) {
          const strategy = response.data.items[0];
          setFormData({
            name: strategy.name || '',
            strategy_type: strategy.strategy_type || '存草稿',
            publish_type: strategy.publish_type || '现在',
            interval: strategy.interval || 30,
            quantity: strategy.quantity || 1,
            content_type: strategy.content_type || '文案',
            layout_id: strategy.layout_id || 1,
            image_type: strategy.image_type || '',
            public_ids: strategy.public_ids || []
          });
        }
      } catch (err) {
        setError('获取策略详情失败');
      }
    };

    if (id) {
      fetchStrategy();
    }
  }, [id]);

  const handleFieldChange = (field: keyof PublishStrategyFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = id
        ? await publishApi.updateStrategy(parseInt(id), formData)
        : await publishApi.addStrategy(formData);

      if (response.code === 200) {
        navigate('/publish/strategy');
      } else {
        setError(response.message || '保存失败');
      }
    } catch (err) {
      setError('保存失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <StrategyBasicInfo 
            formData={formData} 
            onFieldChange={handleFieldChange} 
          />
          
          <PublishSettings 
            formData={formData} 
            onFieldChange={handleFieldChange} 
          />

          <PublicAccountSelect
            value={formData.public_ids}
            onChange={(value) => handleFieldChange('public_ids', value)}
          />
          
          <ContentSettings 
            formData={formData} 
            onFieldChange={handleFieldChange}
            imageTypes={imageTypes}
            loadingImageTypes={loadingImageTypes}
          />

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/publish/strategy')}
            >
              取消
            </Button>
            <Button type="submit" loading={loading}>
              {id ? '保存' : '创建'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}