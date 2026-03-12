const fs = require('fs');
const path = require('path');

// PROCEDURE
const procPath = path.join(process.cwd(), 'customtypes', 'procedure', 'index.json');
const procData = JSON.parse(fs.readFileSync(procPath, 'utf8'));

// Convert existing Text fields to StructuredText
procData.json.Main['success_rate_text'] = {
  type: 'StructuredText',
  config: { label: 'Success Rate Text', placeholder: 'e.g., Our network boasts a 99% success rate...', multi: "p,strong,em" }
};
procData.json.Main['recovery_text'] = {
  type: 'StructuredText',
  config: { label: 'Recovery Description', placeholder: 'e.g., Most patients can travel back home safely within 2 to 3 weeks...', multi: "p,strong,em" }
};
fs.writeFileSync(procPath, JSON.stringify(procData, null, 2), 'utf8');
console.log('Updated Procedure custom type.');

// HOSPITAL
const hospPath = path.join(process.cwd(), 'customtypes', 'hospital', 'index.json');
const hospData = JSON.parse(fs.readFileSync(hospPath, 'utf8'));
hospData.json.Main['key_specialties_text'] = {
  type: 'StructuredText',
  config: { label: 'Key Specialties Description', placeholder: 'e.g., Renowned departments equipped with state-of-the-art...', multi: "p,strong,em" }
};
fs.writeFileSync(hospPath, JSON.stringify(hospData, null, 2), 'utf8');
console.log('Updated Hospital custom type.');
