import React from 'react';
import { OTPField, Text } from '..';

// Previously imported from 'input-otp'
const REGEXP_ONLY_DIGITS_AND_CHARS = '^[a-zA-Z0-9]+$';

export default {
  Default() {
    const otherArgs = {};
    return (
      <div>
        <OTPField.Root
          {...otherArgs}
          maxLength={6}
          render={({ slots }) => (
            <>
              <OTPField.Group>
                {slots.slice(0, 3).map((slot, index) => (
                  <OTPField.Slot key={index} {...slot} />
                ))}{' '}
              </OTPField.Group>
              <OTPField.Separator />
              <OTPField.Group>
                {slots.slice(3).map((slot, index) => (
                  <OTPField.Slot key={index} {...slot} />
                ))}
              </OTPField.Group>
            </>
          )}
        />
      </div>
    );
  },

  Pattern() {
    const otherArgs = {};
    return (
      <div>
        <OTPField.Root
          {...otherArgs}
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          render={({ slots }) => (
            <OTPField.Group>
              {slots.map((slot, index) => (
                <OTPField.Slot key={index} {...slot} />
              ))}{' '}
            </OTPField.Group>
          )}
        />
      </div>
    );
  },

  Separator() {
    const otherArgs = {};
    return (
      <div>
        <OTPField.Root
          {...otherArgs}
          maxLength={6}
          render={({ slots }) => (
            <OTPField.Group style={{ gap: 4 }}>
              {slots.map((slot, index) => (
                <React.Fragment key={index}>
                  <OTPField.Slot style={{ borderRadius: 10 }} {...slot} />
                  {index !== slots.length - 1 && <OTPField.Separator />}
                </React.Fragment>
              ))}{' '}
            </OTPField.Group>
          )}
        />
      </div>
    );
  },

  Controlled() {
    const otherArgs = {};
    const [value, setValue] = React.useState('');

    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <OTPField.Root
            {...otherArgs}
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
            render={({ slots }) => (
              <OTPField.Group>
                {slots.map((slot, index) => (
                  <OTPField.Slot key={index} {...slot} />
                ))}{' '}
              </OTPField.Group>
            )}
          />
        </div>
        <Text align="center" color="gray" size="2" render={<div />}>
          {value === '' ? <>Enter your one-time password.</> : <>You entered: {value}</>}
        </Text>
      </div>
    );
  },
};
