import { Text } from '@aussieljk/frosted';

const links = [
  { label: 'Dashboard', href: '/' },
  { label: 'Marketing', href: '/main.html' },
  { label: 'Docs', href: 'https://frosted.localhost' },
  { label: 'Storybook', href: 'https://storybook.frosted.localhost' },
  { label: 'GitHub', href: 'https://github.com/aussieljk/frosted' },
];

export function SiteHeader() {
  return (
    <nav className="flex items-center gap-5 px-4 py-2 border-b border-gray-a4">
      <Text size="2" weight="bold">
        Frosted UI playground
      </Text>
      {links.map((link) => (
        <a key={link.label} href={link.href} className="fui-reset">
          <Text size="2" color="gray" className="hover:text-gray-12">
            {link.label}
          </Text>
        </a>
      ))}
    </nav>
  );
}
