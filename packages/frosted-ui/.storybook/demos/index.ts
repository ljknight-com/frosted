import type { ComponentType } from 'react';

import AvatarDemo from './avatar';
import avatarSource from './avatar?raw';
import BadgeDemo from './badge';
import badgeSource from './badge?raw';
import ButtonDemo from './button';
import buttonSource from './button?raw';
import CardDemo from './card';
import cardSource from './card?raw';
import CheckboxDemo from './checkbox';
import checkboxSource from './checkbox?raw';
import DialogDemo from './dialog';
import dialogSource from './dialog?raw';
import IconsDemo from './icons';
import iconsSource from './icons?raw';
import LayoutDemo from './layout';
import layoutSource from './layout?raw';
import SelectDemo from './select';
import selectSource from './select?raw';
import SwitchDemo from './switch';
import switchSource from './switch?raw';
import TabsDemo from './tabs';
import tabsSource from './tabs?raw';
import TextFieldDemo from './text-field';
import textFieldSource from './text-field?raw';
import TooltipDemo from './tooltip';
import tooltipSource from './tooltip?raw';

export interface DemoEntry {
  /** Unique id, referenced from MDX via `<Demo id="…" />`. */
  id: string;
  /** Human readable title, used on the Examples page. */
  title: string;
  component: ComponentType;
  /** The demo's source code, shown alongside the live preview. */
  source: string;
}

export const demos: DemoEntry[] = [
  { id: 'layout', title: 'Layout', component: LayoutDemo, source: layoutSource },
  { id: 'icons', title: 'Icons', component: IconsDemo, source: iconsSource },
  { id: 'button', title: 'Button', component: ButtonDemo, source: buttonSource },
  { id: 'badge', title: 'Badge', component: BadgeDemo, source: badgeSource },
  { id: 'avatar', title: 'Avatar', component: AvatarDemo, source: avatarSource },
  { id: 'card', title: 'Card', component: CardDemo, source: cardSource },
  { id: 'checkbox', title: 'Checkbox', component: CheckboxDemo, source: checkboxSource },
  { id: 'switch', title: 'Switch', component: SwitchDemo, source: switchSource },
  { id: 'select', title: 'Select', component: SelectDemo, source: selectSource },
  { id: 'tabs', title: 'Tabs', component: TabsDemo, source: tabsSource },
  { id: 'dialog', title: 'Dialog', component: DialogDemo, source: dialogSource },
  { id: 'tooltip', title: 'Tooltip', component: TooltipDemo, source: tooltipSource },
  { id: 'text-field', title: 'Text Field', component: TextFieldDemo, source: textFieldSource },
];

export function getDemo(id: string): DemoEntry | undefined {
  return demos.find((demo) => demo.id === id);
}
