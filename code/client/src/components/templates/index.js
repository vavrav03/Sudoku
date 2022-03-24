// @index('./**/**/**/**.jsx', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}'`)
export { default as NormalPage } from './NormalPage'
// @endindex