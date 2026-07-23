import { Copy as CopyIcon } from 'lucide-react';
import React from 'react';
import { Badge, Code, DataList, Heading, IconButton, Link, Separator, Text, Tooltip, dataListRootPropDefs } from '..';
import { useComponentControls } from '../../../cosmos/controls';

export default {
  Default() {
    const props = useComponentControls('DataList.Root');
    return (
      <div>
        <Text render={<p />} style={{ marginBottom: 32 }}>
          <Code>{'<DataList />'}</Code> component displays metadata as a list of key-value pairs.
        </Text>
        <DataList.Root {...props}>
          <DataList.Item align="center">
            <DataList.Label>Status</DataList.Label>
            <DataList.Value>
              <Badge color="emerald" variant="soft" size="1">
                Active
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>ID</DataList.Label>
            <DataList.Value>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Code variant="ghost">biz_AB23XH123A</Code>
                <Tooltip content="Copy">
                  <IconButton size="1" aria-label="Copy value" color="gray" variant="ghost">
                    <CopyIcon size={12} />
                  </IconButton>
                </Tooltip>
              </div>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>Artur Bień</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Company</DataList.Label>
            <DataList.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </div>
    );
  },

  Size() {
    const args = {
      size: dataListRootPropDefs.size.default,
      orientation: dataListRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <DataList.Root {...args} size="1">
          <DataList.Item>
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>Artur Bień</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Company</DataList.Label>
            <DataList.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <DataList.Root {...args} size="2">
          <DataList.Item>
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>Artur Bień</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Company</DataList.Label>
            <DataList.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
        <DataList.Root {...args} size="3">
          <DataList.Item>
            <DataList.Label>Name</DataList.Label>
            <DataList.Value>Artur Bień</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Email</DataList.Label>
            <DataList.Value>
              <Link href="mailto:artur@example.com">artur@example.com</Link>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Company</DataList.Label>
            <DataList.Value>
              <Link target="_blank" href="https://example.com">
                Example Inc.
              </Link>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </div>
    );
  },

  Orientation() {
    const args = {
      size: dataListRootPropDefs.size.default,
      orientation: dataListRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
        <div>
          <Heading size="3">Horizontal</Heading>
          <Separator orientation="horizontal" size="4" style={{ marginBottom: 16, marginTop: 16 }} />
          <DataList.Root {...args} orientation={'horizontal'}>
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>Artur Bień</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Email</DataList.Label>
              <DataList.Value>
                <Link href="mailto:artur@example.com">artur@example.com</Link>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Company</DataList.Label>
              <DataList.Value>
                <Link target="_blank" href="https://example.com">
                  Example Inc.
                </Link>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </div>
        <div>
          <Heading size="3">Vertical</Heading>
          <Separator orientation="horizontal" size="4" style={{ marginBottom: 16, marginTop: 16 }} />
          <DataList.Root {...args} orientation={'vertical'}>
            <DataList.Item>
              <DataList.Label>Name</DataList.Label>
              <DataList.Value>Artur Bień</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Email</DataList.Label>
              <DataList.Value>
                <Link href="mailto:artur@example.com">artur@example.com</Link>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label>Company</DataList.Label>
              <DataList.Value>
                <Link target="_blank" href="https://example.com">
                  Example Inc.
                </Link>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </div>
      </div>
    );
  },

  Color() {
    const args = {
      size: dataListRootPropDefs.size.default,
      orientation: dataListRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Text>
          Use the <Code>color</Code> prop on the <Code>{'<DataList.Label />'}</Code> component to assign a specific
          color.
        </Text>
        <DataList.Root {...args}>
          <DataList.Item>
            <DataList.Label color="indigo" style={{ minWidth: 40 }}>
              Color:
            </DataList.Label>
            <DataList.Value>Iris</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label color="cyan" style={{ minWidth: 40 }}>
              Color:
            </DataList.Label>
            <DataList.Value>Cyan</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label color="lime" style={{ minWidth: 40 }}>
              Color:
            </DataList.Label>
            <DataList.Value>Lime</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label color="rose" style={{ minWidth: 40 }}>
              Color:
            </DataList.Label>
            <DataList.Value>Crimson</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </div>
    );
  },

  'High Contrast'() {
    const args = {
      size: dataListRootPropDefs.size.default,
      orientation: dataListRootPropDefs.orientation.default,
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Text>
          Use the <Code>highContrast</Code> prop on the <Code>{'<DataList.Label />'}</Code> component <br /> to increase
          color contrast with the background.
        </Text>
        <div style={{ display: 'flex', gap: 'var(--space-9)' }}>
          <DataList.Root {...args}>
            <DataList.Item>
              <DataList.Label color="indigo">Name</DataList.Label>
              <DataList.Value>Iris</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="cyan">Name</DataList.Label>
              <DataList.Value>Cyan</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="lime">Name</DataList.Label>
              <DataList.Value>Lime</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="rose">Name</DataList.Label>
              <DataList.Value>Crimson</DataList.Value>
            </DataList.Item>
          </DataList.Root>

          <DataList.Root {...args}>
            <DataList.Item>
              <DataList.Label color="indigo" highContrast>
                Name
              </DataList.Label>
              <DataList.Value>Iris</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="cyan" highContrast>
                Name
              </DataList.Label>
              <DataList.Value>Cyan</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="lime" highContrast>
                Name
              </DataList.Label>
              <DataList.Value>Lime</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label color="rose" highContrast>
                Name
              </DataList.Label>
              <DataList.Value>Crimson</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </div>
      </div>
    );
  },
};
