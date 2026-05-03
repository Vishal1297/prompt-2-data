import Label from "../ui/Label";
import InputField from "../ui/InputField";
import SelectField from "../ui/SelectField";
import { DATASET_TYPES } from "../../constants";

const DatasetConfig = ({ coreTopic, setCoreTopic, datasetType, setDatasetType, advancedFocus, setAdvancedFocus }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label info="Target Topic">Core Topic</Label>
        <InputField
          type="text"
          value={coreTopic}
          onChange={(e) => setCoreTopic(e.target.value)}
          placeholder="e.g. Fraud detection"
        />
      </div>
      <div>
        <Label info="Schema Type">Dataset Type</Label>
        <SelectField
          options={DATASET_TYPES}
          value={datasetType}
          onChange={(e) => setDatasetType(e.target.value)}
        />
      </div>
      <div>
        <Label info="Optional">Advanced Focus</Label>
        <InputField
          type="text"
          value={advancedFocus}
          onChange={(e) => setAdvancedFocus(e.target.value)}
          placeholder="e.g. adversarial inputs"
        />
      </div>
    </div>
  );
};

export default DatasetConfig;
