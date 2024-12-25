export interface PublishStrategyFormData {
  name: string;
  strategy_type: StrategyType;
  publish_type: PublishType;
  interval: number;
  quantity: number;
  content_type: ContentType;
  layout_id: number;
  image_type: string;
  public_ids: number[]; // Add this field
}

// Update other interfaces as needed...