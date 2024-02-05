interface Encryption {
  encrypt: (data: string) => string
  hashCompare: (correctPassword: string, enteredPassword: string) => boolean
}

export default interface ToolBox extends Encryption {}
