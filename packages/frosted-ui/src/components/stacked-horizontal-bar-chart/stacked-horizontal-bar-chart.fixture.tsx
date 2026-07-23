import React from 'react';
import { Card, SegmentedControl, Separator, StackedHorizontalBarChart, Text } from '..';
import type { StackedHorizontalBarChartProps } from '../../../src/components/stacked-horizontal-bar-chart';

export default {
  Default() {
    const args: StackedHorizontalBarChartProps = {
      data: [
        { label: 'Nitrogen', value: 78, color: 'amber' },
        { label: 'Oxygen', value: 20.9, color: 'green' },
        { label: 'Argon', value: 0.9, color: 'sky' },
        { label: 'Other gasses', value: 0.17, color: 'blue' },
        { label: 'Carbon Dioxide', value: 0.03, color: 'danger' },
      ],
    };
    return (
      <div style={{ width: 300 }}>
        <StackedHorizontalBarChart {...args} />
      </div>
    );
  },

  'Custom label'() {
    const args: StackedHorizontalBarChartProps = {
      data: [
        {
          label: (value, percent) => `Successful: ${value} (${percent})`,
          value: 481,
          color: 'success',
        },
        {
          label: (value, percent) => `Past: ${value} (${percent})`,
          value: 202,
          color: 'sky',
        },
        {
          label: (value, percent) => `Due: ${value} (${percent})`,
          value: 534,
          color: 'purple',
        },
        {
          label: (value, percent) => `Failed: ${value} (${percent})`,
          value: 495,
          color: 'danger',
        },
        {
          label: (value, percent) => `Refunded: ${value} (${percent})`,
          value: 128,
          color: 'warning',
        },
      ],
    };
    return (
      <div style={{ width: 300 }}>
        <StackedHorizontalBarChart {...args} />
      </div>
    );
  },

  Animated() {
    type LibraryType = 'FrostedUI' | 'BaseUI' | 'React95';

    const uiLibariesData = {
      FrostedUI: [
        { label: 'Typescript', value: 75.9, color: 'success' },
        { label: 'CSS', value: 22.9, color: 'warning' },
        { label: 'Other', value: 1.2, color: 'danger' },
      ],
      BaseUI: [
        { label: 'Typescript', value: 50.5, color: 'success' },
        { label: 'CSS', value: 40, color: 'warning' },
        { label: 'Other', value: 9.5, color: 'danger' },
      ],
      React95: [
        { label: 'Typescript', value: 98.8, color: 'success' },
        { label: 'CSS', value: 1.1, color: 'warning' },
        { label: 'Other', value: 0.1, color: 'danger' },
      ],
    } satisfies Record<LibraryType, StackedHorizontalBarChartProps['data']>;
    const [state, setState] = React.useState<LibraryType>('FrostedUI');

    const data = uiLibariesData[state];

    return (
      <Card
        size="3"
        variant="surface"
        style={{
          backgroundImage: `linear-gradient(var(--color-panel-elevation-alpha-100), var(--color-panel-elevation-alpha-100))`,
        }}
      >
        <div style={{ width: 300, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <SegmentedControl.Root value={state} onValueChange={(value) => setState(value as LibraryType)}>
            <SegmentedControl.List>
              <SegmentedControl.Trigger value="FrostedUI">@aussieljk/frosted</SegmentedControl.Trigger>
              <SegmentedControl.Trigger value="BaseUI">Base UI</SegmentedControl.Trigger>
              <SegmentedControl.Trigger value="React95">React95</SegmentedControl.Trigger>
            </SegmentedControl.List>
          </SegmentedControl.Root>
          <StackedHorizontalBarChart data={data} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {data.map((dataPoint, i) => (
              <>
                {i !== 0 && <Separator size="4" orientation="horizontal" />}
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  key={dataPoint.label}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <div
                      style={{
                        width: 'var(--space-3)',
                        height: 'var(--space-1)',
                        borderRadius: 3,
                        backgroundColor: `var(--${dataPoint.color}-700)`,
                      }}
                    />
                    <Text size="2" color="gray">
                      {dataPoint.label}
                    </Text>
                  </div>
                  <Text size="2">{dataPoint.value}%</Text>
                </div>
              </>
            ))}
          </div>
        </div>
      </Card>
    );
  },
};
