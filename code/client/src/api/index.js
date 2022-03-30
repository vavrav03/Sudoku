// @index('./**/*.js', f => `import * as ${f.name} from '${f.path}'`)
import * as client from './client'
import * as games from './games'
import * as shop from './shop'
import * as user from './user'
// @endindex
const modules = {
// @index('./**/*.js', f => `...${f.name},`)
...client,
...games,
...shop,
...user,
// @endindex
}
export default modules;