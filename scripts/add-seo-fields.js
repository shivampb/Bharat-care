const fs = require('fs');
const path = require('path');

const customTypes = ['doctor', 'hospital', 'procedure', 'accommodation', 'page'];

const seoFields = {
  "meta_title": {
    "type": "Text",
    "config": {
      "label": "Meta Title",
      "placeholder": "A title of the page used for social media and search engines"
    }
  },
  "meta_description": {
    "type": "Text",
    "config": {
      "label": "Meta Description",
      "placeholder": "A brief summary of the page"
    }
  },
  "meta_image": {
    "type": "Image",
    "config": {
      "label": "Meta Image",
      "constraint": { "width": 1200, "height": 630 },
      "thumbnails": []
    }
  }
};

customTypes.forEach(ct => {
  const p = path.join(process.cwd(), 'customtypes', ct, 'index.json');
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (!data.json['SEO & Metadata']) {
      data.json['SEO & Metadata'] = seoFields;
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Added SEO fields to ${ct}`);
    } else {
      console.log(`SEO fields already exist in ${ct}`);
    }
  } else {
    console.log(`Model for ${ct} not found`);
  }
});
