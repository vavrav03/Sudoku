// @index('./**/*.js', f => `import * as ${f.name} from '${f.path}'`)
import * as client from './client'
import * as games from './games'
import * as user from './user'
// @endindex
const modules = {
// @index('./**/*.js', f => `...${f.name},`)
...client,
...games,
...user,
// @endindex
}
export default modules;