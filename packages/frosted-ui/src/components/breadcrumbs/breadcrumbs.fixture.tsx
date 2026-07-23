import React from 'react';
import { Breadcrumbs, breadcrumbsPropDefs } from '.';

export default {
  'With links'() {
    const args = {
      color: breadcrumbsPropDefs.color.default,
    };
    return (
      <Breadcrumbs.Root {...args}>
        <Breadcrumbs.Item render={<a href="#" />} nativeButton={false}>
          Home
        </Breadcrumbs.Item>
        <Breadcrumbs.Item render={<a href="#user-profiles" />} nativeButton={false}>
          User Profiles
        </Breadcrumbs.Item>
        <Breadcrumbs.Item>Products</Breadcrumbs.Item>
      </Breadcrumbs.Root>
    );
  },

  'With onClick'() {
    const args = {
      color: breadcrumbsPropDefs.color.default,
    };
    return (
      <Breadcrumbs.Root {...args}>
        <Breadcrumbs.Item onClick={() => alert('Home')}>Home</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => alert('Products')}>Products</Breadcrumbs.Item>
        <Breadcrumbs.Item onClick={() => alert('Sneaker Bot')}>Sneaker Bot</Breadcrumbs.Item>
      </Breadcrumbs.Root>
    );
  },

  Truncated() {
    const args = {
      color: breadcrumbsPropDefs.color.default,
    };
    return (
      <Breadcrumbs.Root {...args}>
        <Breadcrumbs.Item render={<a href="#">Home</a>} />
        <Breadcrumbs.Dropdown>
          <Breadcrumbs.DropdownItem render={<a href="#">Products</a>} />
          <Breadcrumbs.DropdownItem render={<a href="#">Categories</a>} />
          <Breadcrumbs.DropdownItem render={<a href="#">Software</a>} />
        </Breadcrumbs.Dropdown>
        <Breadcrumbs.Item render={<a href="#">Bots</a>} />
        <Breadcrumbs.Item>Sneaker Bot</Breadcrumbs.Item>
      </Breadcrumbs.Root>
    );
  },
};
