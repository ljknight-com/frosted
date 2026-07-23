import React from 'react';
import { Code, Select, selectTriggerPropDefs, Text } from '..';
import { InfoCircledIcon } from '../../icons';
import { useComponentControls } from '../../../cosmos/controls';

const fontItems = [
  { value: 'system', label: 'System font' },
  { value: 'arial', label: 'Arial' },
  { value: 'roboto', label: 'Roboto' },
  { value: 'inter', label: 'Inter' },
  { value: 'open-sans', label: 'Open Sans' },
];

const currencyItems = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  JPY: 'Japanese Yen',
  CAD: 'Canadian Dollar',
};

const languages = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  python: 'Python',
  java: 'Java',
  csharp: 'C#',
  php: 'PHP',
  cpp: 'C++',
  rust: 'Rust',
  go: 'Go',
  swift: 'Swift',
} as const;

type Language = keyof typeof languages;

interface ShippingMethod {
  id: string;
  name: string;
  duration: string;
  price: string;
}

export default {
  Default() {
    const { disabled, ...args } = useComponentControls('Select.Trigger');
    return (
      <Select.Root defaultValue="Apple" size="2" disabled={disabled as boolean | undefined}>
        <Select.Trigger {...args} />
        <Select.Content>
          <Select.Group>
            <Select.GroupLabel>Fruits</Select.GroupLabel>
            <Select.Item value="Orange">Orange</Select.Item>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.GroupLabel>Vegetables</Select.GroupLabel>
            <Select.Item value="Carrot">Carrot</Select.Item>
            <Select.Item value="Potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  },

  Size() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
        <Select.Root size="1" defaultValue="Apple">
          <Select.Trigger {...args} />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root size="2" defaultValue="Apple">
          <Select.Trigger {...args} />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root size="3" defaultValue="Apple">
          <Select.Trigger {...args} />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root size="4" defaultValue="Apple">
          <Select.Trigger {...args} />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    );
  },

  TriggerVariant() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} variant="surface" />
            <Select.Content>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} variant="soft" />
            <Select.Content>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} variant="ghost" />
            <Select.Content>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <Select.Root defaultValue="Apple" disabled>
            <Select.Trigger {...args} variant="surface" />
            <Select.Content>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple" disabled>
            <Select.Trigger {...args} variant="soft" />
            <Select.Content>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple" disabled>
            <Select.Trigger {...args} variant="ghost" />
            <Select.Content>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Select.Root defaultValue="Apple">
          <Select.Trigger {...args} color="indigo" />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="Apple">
          <Select.Trigger {...args} color="cyan" />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="Apple">
          <Select.Trigger {...args} color="orange" />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="Apple">
          <Select.Trigger {...args} color="rose" />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    );
  },

  Placeholder() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <Select.Root>
        <Select.Trigger {...args} placeholder="Pick a fruit" />
        <Select.Content>
          <Select.Group>
            <Select.GroupLabel>Fruits</Select.GroupLabel>
            <Select.Item value="Orange">Orange</Select.Item>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Grape" disabled>
              Grape
            </Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.GroupLabel>Vegetables</Select.GroupLabel>
            <Select.Item value="Carrot">Carrot</Select.Item>
            <Select.Item value="Potato">Potato</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    );
  },

  'High Contrast'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        <Select.Root defaultValue="Apple">
          <Select.Trigger {...args} />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>

        <Select.Root defaultValue="Apple">
          <Select.Trigger {...args} />
          <Select.Content highContrast>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>
    );
  },

  'Formatting the Value'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Text render={<div />} style={{ maxWidth: 700 }}>
          By default, <Code>Select.Value</Code> displays the raw <Code>value</Code>, not the label text. Here are
          different ways to show a formatted label in the trigger.
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {/* Default: Raw value */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Text size="2" weight="bold">
              Default (raw value)
            </Text>
            <Select.Root defaultValue="roboto">
              <Select.Trigger {...args} style={{ width: 160 }} />
              <Select.Content alignItemWithTrigger={false}>
                {fontItems.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 180 }}>
              Shows "roboto" instead of "Roboto". This is the default Base UI behavior.
            </Text>
          </div>

          {/* With items prop for label lookup */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Text size="2" weight="bold">
              Using <Code>items</Code> prop
            </Text>
            <Select.Root defaultValue="roboto" items={fontItems}>
              <Select.Trigger {...args} style={{ width: 160 }} />
              <Select.Content alignItemWithTrigger={false}>
                {fontItems.map((item) => (
                  <Select.Item key={item.value} value={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 180 }}>
              Pass <Code>{`{ value, label }`}</Code> objects to Root. Base UI automatically maps values to labels.
            </Text>
          </div>

          {/* Using itemToStringLabel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Text size="2" weight="bold">
              Using <Code>itemToStringLabel</Code>
            </Text>
            <Select.Root
              defaultValue="roboto"
              itemToStringLabel={(value) => {
                const labels: Record<string, string> = { roboto: 'Roboto', inter: 'Inter', poppins: 'Poppins' };
                return labels[value as string] ?? String(value);
              }}
            >
              <Select.Trigger {...args} style={{ width: 160 }} />
              <Select.Content alignItemWithTrigger={false}>
                <Select.Item value="roboto">Roboto</Select.Item>
                <Select.Item value="inter">Inter</Select.Item>
                <Select.Item value="poppins">Poppins</Select.Item>
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 180 }}>
              Provide a function to transform any value into its display label.
            </Text>
          </div>

          {/* Custom render function */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Text size="2" weight="bold">
              Using <Code>renderValue</Code>
            </Text>
            <Select.Root defaultValue="EUR">
              <Select.Trigger
                {...args}
                style={{ width: 200 }}
                renderValue={(value) => (
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <InfoCircledIcon style={{ width: 14, height: 14, flexShrink: 0 }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {currencyItems[value as keyof typeof currencyItems]} ({value as string})
                    </span>
                  </span>
                )}
              />
              <Select.Content alignItemWithTrigger={false}>
                {Object.entries(currencyItems).map(([code, name]) => (
                  <Select.Item key={code} value={code}>
                    {name} ({code})
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 180 }}>
              Full control via render function. Great for icons or complex formatting.
            </Text>
          </div>

          {/* Value equals label */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Text size="2" weight="bold">
              Value = Label
            </Text>
            <Select.Root defaultValue="Roboto">
              <Select.Trigger {...args} style={{ width: 160 }} />
              <Select.Content alignItemWithTrigger={false}>
                <Select.Item value="Roboto">Roboto</Select.Item>
                <Select.Item value="Inter">Inter</Select.Item>
                <Select.Item value="Poppins">Poppins</Select.Item>
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 180 }}>
              Simplest: use display text as value. Works for simple cases.
            </Text>
          </div>
        </div>

        <Text render={<div />} size="2" color="gray" style={{ maxWidth: 700, marginTop: 'var(--space-2)' }}>
          <strong>Recommendation:</strong> Use <Code>items</Code> prop for data-driven selects, or{' '}
          <Code>renderValue</Code> for custom formatting. Using value=label works for simple cases but can be
          problematic if you need stable IDs for form submission.
        </Text>
      </div>
    );
  },

  'Dropdown Positioning'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          By default, Base UI Select aligns the selected item with the trigger (native select behavior). Set{' '}
          <Code>alignItemWithTrigger=&#123;false&#125;</Code> for standard dropdown positioning.
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
            <Text size="1" color="gray">
              Default (item-aligned)
            </Text>
            <Select.Root defaultValue="banana">
              <Select.Trigger {...args} />
              <Select.Content>
                <Select.Item value="Apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
                <Select.Item value="date">Date</Select.Item>
                <Select.Item value="elderberry">Elderberry</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
            <Text size="1" color="gray">
              alignItemWithTrigger=false
            </Text>
            <Select.Root defaultValue="banana">
              <Select.Trigger {...args} />
              <Select.Content alignItemWithTrigger={false}>
                <Select.Item value="Apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
                <Select.Item value="date">Date</Select.Item>
                <Select.Item value="elderberry">Elderberry</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </div>
    );
  },

  'Side and Align'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Control where the popup appears using <Code>side</Code> and <Code>align</Code> props. These only take effect
          when <Code>alignItemWithTrigger=&#123;false&#125;</Code>.
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Bottom Start" />
            <Select.Content alignItemWithTrigger={false} side="bottom" align="start">
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Bottom Center" />
            <Select.Content alignItemWithTrigger={false} side="bottom" align="center">
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Bottom End" />
            <Select.Content alignItemWithTrigger={false} side="bottom" align="end">
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Top Start" />
            <Select.Content alignItemWithTrigger={false} side="top" align="start">
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Right Start" />
            <Select.Content alignItemWithTrigger={false} side="right" align="start">
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Left Start" />
            <Select.Content alignItemWithTrigger={false} side="left" align="start">
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    );
  },

  'Side Offset and Align Offset'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Fine-tune positioning with <Code>sideOffset</Code> (distance from trigger) and <Code>alignOffset</Code> (shift
          along the alignment axis). Requires <Code>alignItemWithTrigger=&#123;false&#125;</Code>.
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="Default (4px)" />
            <Select.Content alignItemWithTrigger={false}>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="sideOffset: 16" />
            <Select.Content alignItemWithTrigger={false} sideOffset={16}>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>

          <Select.Root defaultValue="Apple">
            <Select.Trigger {...args} placeholder="alignOffset: 20" />
            <Select.Content alignItemWithTrigger={false} alignOffset={20}>
              <Select.Item value="Apple">Apple</Select.Item>
              <Select.Item value="Orange">Orange</Select.Item>
              <Select.Item value="banana">Banana</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    );
  },

  'Controlled Mode'() {
    const [value, setValue] = React.useState<string | null>('apple');
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Control the select's value externally with <Code>value</Code> and <Code>onValueChange</Code> props.
        </Text>

        <Select.Root value={value} onValueChange={(newValue) => setValue(newValue as string | null)}>
          <Select.Trigger {...args} placeholder="Pick a fruit" />
          <Select.Content>
            <Select.Item value="Apple">Apple</Select.Item>
            <Select.Item value="Orange">Orange</Select.Item>
            <Select.Item value="banana">Banana</Select.Item>
            <Select.Item value="cherry">Cherry</Select.Item>
          </Select.Content>
        </Select.Root>

        <Text size="2" color="gray">
          Selected: <Code>{value ?? 'none'}</Code>
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button onClick={() => setValue('cherry')}>Set to Cherry</button>
          <button onClick={() => setValue(null)}>Clear</button>
        </div>
      </div>
    );
  },

  'Many Items'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    const items = Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 600, textAlign: 'center' }}>
          Select with many items. Compare <Code>alignItemWithTrigger</Code> behavior.
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
            <Text size="2" weight="medium">
              alignItemWithTrigger={'{true}'} (default)
            </Text>
            <Select.Root defaultValue="Item 25">
              <Select.Trigger {...args} />
              <Select.Content>
                {items.map((item) => (
                  <Select.Item key={item} value={item}>
                    {item}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 200, textAlign: 'center' }}>
              Selected item aligns with trigger. Popup expands as you scroll.
            </Text>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', alignItems: 'center' }}>
            <Text size="2" weight="medium">
              alignItemWithTrigger={'{false}'}
            </Text>
            <Select.Root defaultValue="Item 25">
              <Select.Trigger {...args} />
              <Select.Content alignItemWithTrigger={false}>
                {items.map((item) => (
                  <Select.Item key={item} value={item}>
                    {item}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Text size="1" color="gray" style={{ maxWidth: 200, textAlign: 'center' }}>
              Standard dropdown positioning below trigger.
            </Text>
          </div>
        </div>
      </div>
    );
  },

  'Multiple Selection'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    const languageKeys = Object.keys(languages) as Language[];

    const renderValue = (value: Language[]) => {
      if (value.length === 0) {
        return 'Select languages...';
      }
      const firstLanguage = languages[value[0]];
      const additionalCount = value.length > 1 ? ` (+${value.length - 1} more)` : '';
      return firstLanguage + additionalCount;
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Add the <Code>multiple</Code> prop to <Code>Select.Root</Code> to allow multiple selections. Use the{' '}
          <Code>renderValue</Code> prop on the Trigger to customize how the selection is displayed.
        </Text>

        <Select.Root multiple defaultValue={['javascript', 'typescript']}>
          <Select.Trigger {...args} renderValue={renderValue} />
          <Select.Content alignItemWithTrigger={false}>
            {languageKeys.map((key) => (
              <Select.Item key={key} value={key}>
                {languages[key]}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
    );
  },

  Controlled() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    const [singleValue, setSingleValue] = React.useState<string>('Apple');
    const [multipleValue, setMultipleValue] = React.useState<string[]>(['javascript', 'typescript']);

    const fruits = ['Apple', 'Orange', 'Banana', 'Grape', 'Mango'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        <Text render={<div />} style={{ maxWidth: 600 }}>
          Use <Code>value</Code> and <Code>onValueChange</Code> props to control the Select. When <Code>multiple</Code>{' '}
          is set, value types automatically become arrays. Use generics like <Code>{'Select.Root<string>'}</Code> or{' '}
          <Code>{'Select.Root<string, true>'}</Code> for full type safety.
        </Text>

        <div style={{ display: 'flex', gap: 'var(--space-6)', flexWrap: 'wrap' }}>
          {/* Single Selection - value is typed as string */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Text size="2" weight="bold">
              Single Selection
            </Text>
            <Select.Root<string>
              value={singleValue}
              onValueChange={(value) => {
                // value is typed as string | null
                if (value !== null) setSingleValue(value);
              }}
            >
              <Select.Trigger {...args} style={{ width: 180 }} />
              <Select.Content>
                {fruits.map((fruit) => (
                  <Select.Item key={fruit} value={fruit}>
                    {fruit}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Code size="1">value: "{singleValue}"</Code>
          </div>

          {/* Multiple Selection - value is typed as string[] */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <Text size="2" weight="bold">
              Multiple Selection
            </Text>
            <Select.Root<string, true>
              multiple
              value={multipleValue}
              onValueChange={(value) => {
                // value is typed as string[] when multiple={true}
                setMultipleValue(value);
              }}
            >
              <Select.Trigger
                {...args}
                style={{ width: 220 }}
                renderValue={(value) => {
                  const arr = value as string[];
                  if (arr.length === 0) return 'Select languages...';
                  if (arr.length === 1) return languages[arr[0] as Language];
                  return `${languages[arr[0] as Language]} (+${arr.length - 1} more)`;
                }}
              />
              <Select.Content alignItemWithTrigger={false}>
                {(Object.keys(languages) as Language[]).map((key) => (
                  <Select.Item key={key} value={key}>
                    {languages[key]}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <Code size="1">value: [{multipleValue.map((v) => `"${v}"`).join(', ')}]</Code>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <button
            type="button"
            onClick={() => {
              setSingleValue('Mango');
              setMultipleValue(['python', 'rust', 'go']);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid var(--gray-400)',
              background: 'var(--gray-100)',
              cursor: 'pointer',
            }}
          >
            Set programmatically
          </button>
          <button
            type="button"
            onClick={() => {
              setSingleValue('Apple');
              setMultipleValue(['javascript', 'typescript']);
            }}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid var(--gray-400)',
              background: 'var(--gray-100)',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      </div>
    );
  },

  'Object Values'() {
    const args = {
      variant: selectTriggerPropDefs.variant.default,
      color: selectTriggerPropDefs.color.default,
      disabled: false,
    };
    const shippingMethods: ShippingMethod[] = [
      {
        id: 'standard',
        name: 'Standard',
        duration: 'Delivers in 4-6 business days',
        price: '$4.99',
      },
      {
        id: 'express',
        name: 'Express',
        duration: 'Delivers in 2-3 business days',
        price: '$9.99',
      },
      {
        id: 'overnight',
        name: 'Overnight',
        duration: 'Delivers next business day',
        price: '$19.99',
      },
    ];

    const renderShippingValue = (method: ShippingMethod) => (
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, textAlign: 'left' }}>
        <span style={{ fontWeight: 500 }}>{method.name}</span>
        <span style={{ fontSize: '0.85em', color: 'var(--gray-900)' }}>
          {method.duration} ({method.price})
        </span>
      </span>
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
        <Text render={<div />} style={{ maxWidth: 500, textAlign: 'center' }}>
          Select items can use objects as values instead of primitives. Use <Code>itemToStringValue</Code> to convert
          objects to strings for comparison, and <Code>renderValue</Code> to display the full object. Note:{' '}
          <Code>alignItemWithTrigger=&#123;false&#125;</Code> is recommended for variable-height items.
        </Text>

        <Select.Root
          defaultValue={shippingMethods[0]}
          itemToStringValue={(item) => (item as ShippingMethod).id}
          size="3"
        >
          <Select.Trigger
            {...args}
            renderValue={renderShippingValue}
            style={{ height: 'auto', minHeight: 'var(--space-8)', paddingTop: 8, paddingBottom: 8 }}
          />
          <Select.Content alignItemWithTrigger={false}>
            {shippingMethods.map((method) => (
              <Select.Item key={method.id} value={method} style={{ height: 'auto', paddingTop: 8, paddingBottom: 8 }}>
                <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontWeight: 500 }}>{method.name}</span>
                  <span style={{ fontSize: '0.85em', color: 'var(--gray-900)' }}>
                    {method.duration} ({method.price})
                  </span>
                </span>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
    );
  },
};
