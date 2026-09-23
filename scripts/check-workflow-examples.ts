import fs from 'node:fs';
import path from 'node:path';
import { validateWorkflowDefinition } from '../../modules/workflow/src/workflow/validation.ts';
import { parse } from '../../modules/workflow/node_modules/yaml/dist/index.js';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../workflows/', import.meta.url));
let count=0, failures=0;
for (const name of ['introduction.mdx','creating-workflows.mdx','advanced-workflows.mdx']) {
 const text=fs.readFileSync(path.join(root,name),'utf8');
 for (const [i,m] of [...text.matchAll(/```yaml\n([\s\S]*?)```/g)].entries()) {
  const doc=parse(m[1]);
  const definition=Array.isArray(doc)?{jobs:{main:{steps:doc}}}:doc;
  const workflow={version:'agent-workflow/v1',title:'Documentation example',description:'Validate the documented syntax.',...definition};
  const result=validateWorkflowDefinition({workflow});count++;
  if(!result.valid){failures++;console.error(name,i+1,JSON.stringify(result.errors));}
 }
}
console.log(JSON.stringify({examples:count,failures}));process.exitCode=failures?1:0;
