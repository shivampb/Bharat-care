const fs = require('fs');
const path = require('path');

const customTypes = ['doctor', 'hospital', 'procedure', 'accommodation', 'page'];
const fullRichTextConfig = "paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl";

customTypes.forEach(ct => {
  const p = path.join(process.cwd(), 'customtypes', ct, 'index.json');
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    let modified = false;

    // Scan through all fields in all tabs
    for (const tab in data.json) {
      for (const fieldKey in data.json[tab]) {
        if (data.json[tab][fieldKey].type === 'StructuredText') {
          data.json[tab][fieldKey].config = data.json[tab][fieldKey].config || {};
          data.json[tab][fieldKey].config.multi = fullRichTextConfig;
          
          // Clean up old 'allowTargetBlank' if we have 'hyperlink' setup correctly
          data.json[tab][fieldKey].config.allowTargetBlank = true;

          modified = true;
        }
      }
    }

    if (modified) {
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Updated all Rich Text (StructuredText) fields in ${ct} to include bold, italic, links, and all formatting options.`);
    }
  }
});
