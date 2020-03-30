import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import FormIcon from "./FormIcon";

interface IZipInputProps {
  name: string;
  optional: boolean;
  messages: any;
  value?: string;
  updateValue: any;
  pattern: string;
}

const ZipInput = ({
  name,
  optional,
  value,
  updateValue,
  messages,
  pattern
}: IZipInputProps) => {
  const intl = useIntl();
  const regexp = new RegExp(pattern);
  const inputIsValid = regexp.test(value);

  return (
    <div className="timeline-item">
      <FormIcon condition={inputIsValid} optional={optional} />
      <div className="timeline-content">
        <div
          className={`form-group ${
            value ? (inputIsValid ? "has-success" : "has-error") : ""
          }`}
        >
          <label className="form-label">
            <FormattedMessage id={`${name}.question`} />
          </label>
          <input
            type="text"
            className="form-input"
            value={value}
            placeholder={intl.formatMessage(messages.placeholders[name])}
            onChange={(event: any) => {
              updateValue(event.target.value);
            }}
          />
          {inputIsValid ||
          value === undefined ||
          value === "" ||
          value === null ? null : (
            <p className="form-input-hint">
              <FormattedMessage id="zipcode.invalid" />
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZipInput;
