import path from 'path';
import { existsSync } from 'fs';
import { readdir, readFile, writeFile, mkdir } from 'fs/promises';
import { v4 as uuid } from 'uuid';

export default {
  write,
  update,
  read,
};

async function write(o){
  await mkdir(path.join(configuration.db, o.id), {recursive: true});
  o.ver = `1-${uuid()}`;
  await writeFile(path.join(configuration.db, o.id, o.ver + '.json'), JSON.stringify(o,null,'  '))
  return o;
}

async function update(o){
  await mkdir(path.join(configuration.db, o.id), {recursive: true});
  const ver = parseInt(o.ver.split('-')[0]);
  o.ver = `${ver+1}-${uuid()}`;
  await writeFile(path.join(configuration.db, o.id, o.ver + '.json'), JSON.stringify(o,null,'  '))
  return o;
}

async function read(id){
  const latest = (await list(id)).reverse().shift().name;
  return JSON.parse((await readFile(path.join(configuration.db, id, latest))).toString());
}
