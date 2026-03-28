import React from 'react';
import { useViewMode } from '../../components/ViewContext';
import { PaperView } from './PaperView';
import { HumorView } from './HumorView';

export default function WritePage() {
  const { isHumorMode } = useViewMode();
  
  return isHumorMode ? <HumorView /> : <PaperView />;
}
