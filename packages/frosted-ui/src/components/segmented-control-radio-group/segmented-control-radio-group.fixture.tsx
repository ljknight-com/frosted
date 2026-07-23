import { Monitor, Moon, Sun } from 'lucide-react';
import React from 'react';
import { Button, Code, SegmentedControlRadioGroup, Text } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const props = useComponentControls('SegmentedControlRadioGroup.Root');
    return (
      <SegmentedControlRadioGroup.Root
        defaultValue="system"
        {...props}
        onValueChange={(value) => console.log('🟢 onValueChange ', value)}
      >
        <SegmentedControlRadioGroup.Item value="system">
          <Monitor size={20} />
        </SegmentedControlRadioGroup.Item>
        <SegmentedControlRadioGroup.Item value="light-mode">
          <Sun size={20} />
        </SegmentedControlRadioGroup.Item>
        <SegmentedControlRadioGroup.Item value="dark-mode">
          <Moon size={20} />
        </SegmentedControlRadioGroup.Item>
      </SegmentedControlRadioGroup.Root>
    );
  },

  'Input Ref'() {
    const args = {};
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFocus = () => {
      inputRef.current?.focus();
    };

    const handleReportValidity = () => {
      const isValid = inputRef.current?.reportValidity();
      console.log('Validity:', isValid);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Text>
          The <Code>inputRef</Code> prop provides access to the underlying hidden input element, enabling programmatic
          control for focus management, form validation, and integration with form libraries.
        </Text>

        <SegmentedControlRadioGroup.Root {...args} name="theme-preference" required inputRef={inputRef}>
          <SegmentedControlRadioGroup.Item value="system">
            <Monitor size={20} />
          </SegmentedControlRadioGroup.Item>
          <SegmentedControlRadioGroup.Item value="light-mode">
            <Sun size={20} />
          </SegmentedControlRadioGroup.Item>
          <SegmentedControlRadioGroup.Item value="dark-mode">
            <Moon size={20} />
          </SegmentedControlRadioGroup.Item>
        </SegmentedControlRadioGroup.Root>

        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          <Button size="1" variant="soft" onClick={handleFocus}>
            Focus Input
          </Button>
          <Button size="1" variant="soft" onClick={handleReportValidity}>
            Check Validity
          </Button>
        </div>

        <Text size="1" color="gray">
          Click &quot;Check Validity&quot; without selecting an option to see the browser&apos;s native validation
          message in the console (the group has <Code>required</Code> set).
        </Text>
      </div>
    );
  },

  Controlled() {
    const [theme, setTheme] = React.useState('system');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Text>
          Use <Code>value</Code> and <Code>onValueChange</Code> for controlled state.
        </Text>

        <SegmentedControlRadioGroup.Root value={theme} onValueChange={setTheme}>
          <SegmentedControlRadioGroup.Item value="system">
            <Monitor size={20} />
          </SegmentedControlRadioGroup.Item>
          <SegmentedControlRadioGroup.Item value="light">
            <Sun size={20} />
          </SegmentedControlRadioGroup.Item>
          <SegmentedControlRadioGroup.Item value="dark">
            <Moon size={20} />
          </SegmentedControlRadioGroup.Item>
        </SegmentedControlRadioGroup.Root>

        <Text size="2">
          Selected: <Code>{theme}</Code>
        </Text>
      </div>
    );
  },

  'Type-Safe Values'() {
    type Theme = 'system' | 'light' | 'dark';
    const [theme, setTheme] = React.useState<Theme>('system');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', maxWidth: 400 }}>
        <Text>
          Pass a string union type to get autocomplete and catch typos at compile time. Without an explicit type
          parameter, the value type is inferred from props like <Code>value</Code> and <Code>onValueChange</Code>.
        </Text>

        <SegmentedControlRadioGroup.Root<Theme> value={theme} onValueChange={setTheme}>
          <SegmentedControlRadioGroup.Item value="system">
            <Monitor size={20} />
          </SegmentedControlRadioGroup.Item>
          <SegmentedControlRadioGroup.Item value="light">
            <Sun size={20} />
          </SegmentedControlRadioGroup.Item>
          <SegmentedControlRadioGroup.Item value="dark">
            <Moon size={20} />
          </SegmentedControlRadioGroup.Item>
        </SegmentedControlRadioGroup.Root>

        <Text size="2">
          Selected: <Code>{theme}</Code>
        </Text>

        <Text size="1" color="gray">
          Try changing a value to <Code>&quot;sytsem&quot;</Code> — TypeScript will catch the typo!
        </Text>
      </div>
    );
  },
};
