const fs = require('fs');
const path = require('path');

const slicesToCreate = [
  { id: 'procedures_grid', name: 'ProceduresGrid', typeTarget: 'procedure', label: 'Procedure' },
  { id: 'hospitals_grid', name: 'HospitalsGrid', typeTarget: 'hospital', label: 'Hospital' },
  { id: 'doctors_grid', name: 'DoctorsGrid', typeTarget: 'doctor', label: 'Doctor' },
  { id: 'accommodations_grid', name: 'AccommodationsGrid', typeTarget: 'accommodation', label: 'Accommodation' },
];

slicesToCreate.forEach(s => {
  const dir = path.join(process.cwd(), 'slices', s.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const model = {
    id: s.id,
    type: 'SharedSlice',
    name: s.name,
    description: `Grid of selected ${s.label.toLowerCase()}s`,
    variations: [{
      id: 'default',
      name: 'Default',
      docURL: '...',
      version: 'smp-initial-version',
      description: 'Default variation',
      imageUrl: '',
      primary: {
        title: { type: 'StructuredText', config: { single: 'h2', label: 'Title' } },
        description: { type: 'StructuredText', config: { single: 'p', label: 'Description' } }
      },
      items: {
        item: { type: 'Link', config: { select: 'document', customtypes: [s.typeTarget], label: s.label } }
      }
    }]
  };

  fs.writeFileSync(path.join(dir, 'model.json'), JSON.stringify(model, null, 2), 'utf8');
  
  const comp = `import { SliceComponentProps } from "@prismicio/react";

export type ${s.name}Props = SliceComponentProps<any>;

export default function ${s.name}({ slice }: ${s.name}Props) {
  return (
    <section>
      <h2>{slice.name} component needs to be built!</h2>
    </section>
  );
}
`;
  fs.writeFileSync(path.join(dir, 'index.tsx'), comp, 'utf8');
  console.log(`Created slice: ${s.name}`);
});

// Update page model
const pageModelPath = path.join(process.cwd(), 'customtypes', 'page', 'index.json');
const pageModel = JSON.parse(fs.readFileSync(pageModelPath, 'utf8'));
pageModel.json.Main.slices.config.choices['procedures_grid'] = { type: 'SharedSlice' };
pageModel.json.Main.slices.config.choices['hospitals_grid'] = { type: 'SharedSlice' };
pageModel.json.Main.slices.config.choices['doctors_grid'] = { type: 'SharedSlice' };
pageModel.json.Main.slices.config.choices['accommodations_grid'] = { type: 'SharedSlice' };
fs.writeFileSync(pageModelPath, JSON.stringify(pageModel, null, 2), 'utf8');
console.log('Updated Page custom type to allow new grid slices.');
