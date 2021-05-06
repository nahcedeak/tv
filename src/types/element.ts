export interface IElement {
  tagName: keyof HTMLElementTagNameMap
  id?:string
  innerHtml?: string
  classList?: string 
  attribute?: IElementAttr 
  subelement?: IElement[]
}

export interface IElementAttr{
  [atrr: string]: string | boolean 
}