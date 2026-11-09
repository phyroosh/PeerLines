// Metaphor Primitives Library Index
import React from 'react';
import { MetaphorConfig } from '@/types/dsl';
import { BalanceScale } from './BalanceScale';
import { MetricMeter } from './MetricMeter';
import { BatteryIndicator } from './BatteryIndicator';
import { Iceberg } from './Iceberg';
import { SeveredConnection } from './SeveredConnection';
import { IsolationShield } from './IsolationShield';
import { Campfire } from './Campfire';
import { DnaHelix } from './DnaHelix';
import { PlantGrowth } from './PlantGrowth';
import { Checklist } from './Checklist';
import { SpeechBubble } from './SpeechBubble';
import { FramedPanels } from './FramedPanels';

export {
  BalanceScale,
  MetricMeter,
  BatteryIndicator,
  Iceberg,
  SeveredConnection,
  IsolationShield,
  Campfire,
  DnaHelix,
  PlantGrowth,
  Checklist,
  SpeechBubble,
  FramedPanels,
};

export interface MetaphorRendererProps {
  config: MetaphorConfig;
  frame?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const MetaphorRenderer: React.FC<MetaphorRendererProps> = ({
  config,
  frame = 0,
  isSelected = false,
  onClick,
}) => {
  const { type, x, y, scale = 1.0, properties } = config;

  switch (type) {
    case 'balance-scale':
      return (
        <BalanceScale
          x={x}
          y={y}
          scale={scale}
          tilt={properties.tilt}
          leftLabel={properties.leftLabel}
          rightLabel={properties.rightLabel}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'metric-meter':
      return (
        <MetricMeter
          x={x}
          y={y}
          scale={scale}
          label={properties.label}
          level={properties.level}
          color={properties.color}
          type={properties.type}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'battery-indicator':
      return (
        <BatteryIndicator
          x={x}
          y={y}
          scale={scale}
          chargePercent={properties.chargePercent}
          state={properties.state}
          glowing={properties.glowing}
          label={properties.label}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'iceberg':
      return (
        <Iceberg
          x={x}
          y={y}
          scale={scale}
          tipLabel={properties.tipLabel}
          underwaterLabel={properties.underwaterLabel}
          waterLineY={properties.waterLineY}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'severed-connection':
      return (
        <SeveredConnection
          x={x}
          y={y}
          scale={scale}
          cutState={properties.cutState}
          hasScissors={properties.hasScissors}
          label={properties.label}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'isolation-shield':
      return (
        <IsolationShield
          x={x}
          y={y}
          scale={scale}
          radius={properties.radius}
          glowColor={properties.glowColor}
          label={properties.label}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'campfire':
      return (
        <Campfire
          x={x}
          y={y}
          scale={scale}
          flameIntensity={properties.flameIntensity}
          emberCount={properties.emberCount}
          warmGlow={properties.warmGlow}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'dna-helix':
      return (
        <DnaHelix
          x={x}
          y={y}
          scale={scale}
          speed={properties.speed}
          label={properties.label}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'plant-growth':
      return (
        <PlantGrowth
          x={x}
          y={y}
          scale={scale}
          growthStage={properties.growthStage}
          flowering={properties.flowering}
          label={properties.label}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'checklist':
      return (
        <Checklist
          x={x}
          y={y}
          scale={scale}
          items={properties.items}
          title={properties.title}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'speech-bubble':
      return (
        <SpeechBubble
          x={x}
          y={y}
          scale={scale}
          text={properties.text}
          tailPosition={properties.tailPosition}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    case 'framed-panels':
      return (
        <FramedPanels
          x={x}
          y={y}
          scale={scale}
          topText={properties.topText}
          bottomText={properties.bottomText}
          frame={frame}
          isSelected={isSelected}
          onClick={onClick}
        />
      );

    default:
      return null;
  }
};
