const fs = require('fs');
const path = require('path');

// PROCEDURE
const procPath = path.join(process.cwd(), 'customtypes', 'procedure', 'index.json');
const procData = JSON.parse(fs.readFileSync(procPath, 'utf8'));
procData.json.Main['success_rate_text'] = {
  type: 'Text',
  config: { label: 'Success Rate Text', placeholder: 'e.g., Our network boasts a 99% success rate...' }
};
procData.json.Main['recovery_time'] = {
  type: 'Text',
  config: { label: 'Recovery Time Duration', placeholder: 'e.g., 7 - 14 Days' }
};
procData.json.Main['recovery_text'] = {
  type: 'Text',
  config: { label: 'Recovery Description', placeholder: 'e.g., Most patients can travel back home safely within 2 to 3 weeks...' }
};
fs.writeFileSync(procPath, JSON.stringify(procData, null, 2), 'utf8');
console.log('Updated Procedure custom type.');

// HOSPITAL
const hospPath = path.join(process.cwd(), 'customtypes', 'hospital', 'index.json');
const hospData = JSON.parse(fs.readFileSync(hospPath, 'utf8'));
hospData.json.Main['free_airport_transfers'] = {
  type: 'Boolean',
  config: { label: 'Free Airport Transfers Included', default_value: false, placeholder_false: 'false', placeholder_true: 'true' }
};
hospData.json.Main['international_translators'] = {
  type: 'Boolean',
  config: { label: 'Dedicated International Translators', default_value: false, placeholder_false: 'false', placeholder_true: 'true' }
};
hospData.json.Main['key_specialties_text'] = {
  type: 'Text',
  config: { label: 'Key Specialties Description', placeholder: 'e.g., Renowned departments equipped with state-of-the-art...' }
};
fs.writeFileSync(hospPath, JSON.stringify(hospData, null, 2), 'utf8');
console.log('Updated Hospital custom type.');

// DOCTOR
const docPath = path.join(process.cwd(), 'customtypes', 'doctor', 'index.json');
const docData = JSON.parse(fs.readFileSync(docPath, 'utf8'));
docData.json.Main['rating'] = {
  type: 'Text',
  config: { label: 'Rating', placeholder: 'e.g., 4.9/5 Rating' }
};
docData.json.Main['accepting_patients'] = {
  type: 'Boolean',
  config: { label: 'Accepting New Patients', default_value: true, placeholder_false: 'false', placeholder_true: 'true' }
};
docData.json.Main['free_consultation'] = {
  type: 'Boolean',
  config: { label: 'Free Initial Video Consultation', default_value: false, placeholder_false: 'false', placeholder_true: 'true' }
};
fs.writeFileSync(docPath, JSON.stringify(docData, null, 2), 'utf8');
console.log('Updated Doctor custom type.');

// ACCOMMODATION
const accPath = path.join(process.cwd(), 'customtypes', 'accommodation', 'index.json');
const accData = JSON.parse(fs.readFileSync(accPath, 'utf8'));
accData.json.Main['rating'] = {
  type: 'Text',
  config: { label: 'Guest Rating', placeholder: 'e.g., 4.8 Guest Rating' }
};
fs.writeFileSync(accPath, JSON.stringify(accData, null, 2), 'utf8');
console.log('Updated Accommodation custom type.');
