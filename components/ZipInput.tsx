// src/components/ZipInput.tsx

import * as React from "react";

import FormIcon from "./FormIcon";
import { FormattedMessage, useIntl } from "react-intl";

export interface Props {
  name: string;
  optional: boolean;
  messages: any;
  value?: string;
  updateValue: any;
  pattern: string;
  zipLength: number;
}

function ZipInput({
  name,
  optional,
  value,
  updateValue,
  messages,
  pattern,
  zipLength
}: Props) {
  const intl = useIntl();
  return (
    <div className="timeline-item">
      <FormIcon condition={is_ZipCode(value, pattern)} optional={optional} />
      <div className="timeline-content">
        <div className="form-group">
          <label className="form-label">
            <FormattedMessage id={`${name}.question`} />
          </label>
          <input
            type="text"
            className="form-zip"
            value={value}
            minLength={zipLength}
            maxLength={zipLength}
            placeholder={intl.formatMessage(messages.placeholders[name])}
            onChange={(event: any) => {
              updateValue(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ZipInput;

// helpers
function is_ZipCode(value: string, pattern: string) {
  parseInt(value);
  const regexp = new RegExp(pattern);
  return regexp.test(value);
}
