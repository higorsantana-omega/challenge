import bcrypt from 'bcrypt'

import type ToolBox from './IToolbox'

class ToolBoxImpl implements ToolBox {
  hashCompare(correctPassword: string, enteredPassword: string): boolean {
    return bcrypt.compareSync(enteredPassword, correctPassword)
  }

  encrypt(data: string): string {
    return bcrypt.hashSync(data, 10)
  }
}

const toolbox = new ToolBoxImpl()
export default toolbox
