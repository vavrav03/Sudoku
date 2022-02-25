// @index('./**/**', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}'`)
export { default as ClassicPage } from './games/ClassicPage'
export { default as ClassicXPage } from './games/ClassicXPage'
export { default as JigsawPage } from './games/JigsawPage'
export { default as SamuraiMixedPage } from './games/SamuraiMixedPage'
export { default as SamuraiPage } from './games/SamuraiPage'
export { default as HomePage } from './HomePage'
export { default as ShopPage } from './ShopPage'
export { default as SignInPage } from './signing/SignInPage'
export { default as SignUpPage } from './signing/SignUpPage'
export { default as UnfinishedGamesPage } from './UnfinishedGamesPage'
export { default as UserProfilePage } from './UserProfilePage'
// @endindex