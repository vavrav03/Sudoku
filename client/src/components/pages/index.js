// @index('./**/**', (f, _) => `export { default as ${_.pascalCase(f.name)} } from '${f.path}'`)
export { default as ClassicEasyPage } from './games/ClassicEasyPage'
export { default as ClassicHardPage } from './games/ClassicHardPage'
export { default as ClassicNormalPage } from './games/ClassicNormalPage'
export { default as DiagonalPage } from './games/DiagonalPage'
export { default as JigsawPage } from './games/JigsawPage'
export { default as SamuraiMixedPage } from './games/SamuraiMixedPage'
export { default as SamuraiPage } from './games/SamuraiPage'
export { default as Size2x2Page } from './games/Size2x2Page'
export { default as Size2x3Page } from './games/Size2x3Page'
export { default as Size4x4Page } from './games/Size4x4Page'

export { default as HomePage } from './HomePage'

export { default as SignInPage } from './signing/SignInPage'
export { default as SignUpPage } from './signing/SignUpPage'
// @endindex