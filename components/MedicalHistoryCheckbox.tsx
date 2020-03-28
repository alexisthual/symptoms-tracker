import { FormattedMessage } from "react-intl";
import FormIcon from "./FormIcon";

interface IMedicalHistoryInput {
  value: string;
  updateValue: any;
  name: string;
}

const MedicalHistoryInput = ({
  value,
  updateValue,
  name
}: IMedicalHistoryInput) => {
  return (
    <label className="form-checkbox">
      <input
        type="checkbox"
        value={value}
        onChange={(event: any) => {
          updateValue(event.target.checked);
        }}
      />
      <i className="form-icon"></i> <FormattedMessage id={name} />
    </label>
  );
};

export default MedicalHistoryInput;
