import * as React from 'react';
import { Field, Fieldset, Input } from '..';

export default function FieldsetFixture() {
  return (
    <Fieldset.Root style={{ width: 320 }}>
      <Fieldset.Legend>Billing Details</Fieldset.Legend>

      <Field.Root name="company">
        <Field.Label>Company</Field.Label>
        <Input.Root>
          <Input.Control placeholder="Acme Inc." />
        </Input.Root>
      </Field.Root>

      <Field.Root name="taxId">
        <Field.Label>Tax ID</Field.Label>
        <Input.Root>
          <Input.Control placeholder="XX-XXXXXXX" />
        </Input.Root>
        <Field.Description>Your company's tax identification number</Field.Description>
      </Field.Root>
    </Fieldset.Root>
  );
}
