const fs = require('fs');
const glob = require('glob');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Fix patterns where } is missing before another attribute
  const patterns = [
    // Missing } in attributes
    [/placeholder=\{([^}]+)\s+className=/g, 'placeholder={$1} className='],
    [/value=\{([^}]+)\s+(onChange|className|onClick|style)=/g, 'value={$1} $2='],
    [/onClick=\{([^}]+)\s+(className|style|disabled|type)=/g, 'onClick={$1} $2='],
    [/onChange=\{([^}]+)\s+(className|style|placeholder|value)=/g, 'onChange={$1} $2='],
    [/onSubmit=\{([^}]+)\s+className=/g, 'onSubmit={$1} className='],
    [/href=\{([^}]+)\s+(className|style|target)=/g, 'href={$1} $2='],
    [/src=\{([^}]+)\s+(alt|className|style)=/g, 'src={$1} $2='],
    [/alt=\{([^}]+)\s+className=/g, 'alt={$1} className='],
    [/title=\{([^}]+)\s+className=/g, 'title={$1} className='],
    [/checked=\{([^}]+)\s+onChange=/g, 'checked={$1} onChange='],
    [/disabled=\{([^}]+)\s+(className|style)=/g, 'disabled={$1} $2='],
    [/htmlFor=\{([^}]+)\s+className=/g, 'htmlFor={$1} className='],
    [/min=\{([^}]+)\s+value=/g, 'min={$1} value='],
    [/download=\{([^}]+)\s+className=/g, 'download={$1} className='],
    [/onError=\{([^}]+)\s+className=/g, 'onError={$1} className='],
    [/type=\{([^}]+)\s+className=/g, 'type={$1} className='],
    [/sizes=\{([^}]+)\s+placeholder=/g, 'sizes={$1} placeholder='],
    [/as=\{([^}]+)\s+href=/g, 'as={$1} href='],
    [/cite=\{([^}]+)\s+className=/g, 'cite={$1} className='],
    [/data=\{([^}]+)\s+onChange=/g, 'data={$1} onChange='],
    [/aiFeature=\{([^}]+)\s+href=/g, 'aiFeature={$1} href='],
    [/onKeyPress=\{([^}]+)\s+placeholder=/g, 'onKeyPress={$1} placeholder='],
    [/onMouseLeave=\{([^}]+)\s+onClick=/g, 'onMouseLeave={$1} onClick='],
    [/hrefLang=\{([^}]+)\s+href=/g, 'hrefLang={$1} href='],
    [/aria-checked=\{([^}]+)\s+data-state=/g, 'aria-checked={$1} data-state='],
    [/data-state=\{([^}]+)\s+(disabled|className)=/g, 'data-state={$1} $2='],
    [/data-width=\{([^}]+)\s+data-height=/g, 'data-width={$1} data-height='],
    [/data-height=\{([^}]+)\s+data-theme=/g, 'data-height={$1} data-theme='],
    [/data-theme=\{([^}]+)\s+href=/g, 'data-theme={$1} href='],
    [/data-video-id=\{([^}]+)\s+style=/g, 'data-video-id={$1} style='],
    // Missing ) for cn function
    [/className=\{cn\(([^)]+)\s+(style|onClick|onChange)=/g, 'className={cn($1)} $2='],
    // Source tags
    [/<source\s+src=\{([^}]+)\s+type=/g, '<source src={$1} type='],
    // Form tags
    [/<form\s+onSubmit=\{([^}]+)\s+className=/g, '<form onSubmit={$1} className='],
    // Button tags
    [/<button\s+onClick=\{([^}]+)\s+className=/g, '<button onClick={$1} className='],
    // Link tags
    [/<Link\s+href=\{([^}]+)\s+className=/g, '<Link href={$1} className='],
    // Style with double braces
    [/style=\{\{([^}]+)\s+className=/g, 'style={{$1}} className=']
  ];
  
  patterns.forEach(([pattern, replacement]) => {
    content = content.replace(pattern, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    return true;
  }
  
  return false;
}

const files = glob.sync('src/**/*.{tsx,ts,jsx,js}', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.next/**']
});

console.log(`Processing ${files.length} files...`);

let fixedCount = 0;

files.forEach(file => {
  try {
    if (fixFile(file)) {
      fixedCount++;
      console.log(`Fixed: ${file}`);
    }
  } catch (error) {
    console.error(`Error processing ${file}:`, error.message);
  }
});

console.log(`\nFixed ${fixedCount} files`);
