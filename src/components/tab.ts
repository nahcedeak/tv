import { IElement } from '../types/element'

const radioLanguage: IElement = {
  tagName: 'input',
  id: 'radio-language',
  attribute: { type: 'radio', name: 'radio-tab', checked: '' },
  classList: 'hidden',
  subelement: []
}
const radioCountry: IElement = {
  tagName: 'input',
  id: 'radio-country',
  attribute: { type: 'radio', name: 'radio-tab' },
  classList: 'hidden',
  subelement: []
}
const radioCategory: IElement = {
  tagName: 'input',
  id: 'radio-category',
  attribute: { type: 'radio', name: 'radio-tab' },
  classList: 'hidden',
  subelement: []
}

const tabLanguage: IElement = {
  tagName: 'label',
  attribute: { for: 'radio-language' },
  subelement: [
    {
      tagName: 'span',
      classList: 'py-2 px-5 rounded-full inline-block ',
      innerHtml: 'Languages'
    }
  ]
}
const tabCountry: IElement = {
  tagName: 'label',
  attribute: { for: 'radio-country' },
  subelement: [
    {
      tagName: 'span',
      classList: 'py-2 px-5 rounded-full inline-block',
      innerHtml: 'Countries'
    }
  ]
}
const tabCategory: IElement = {
  tagName: 'label',
  attribute: { for: 'radio-category' },
  subelement: [
    {
      tagName: 'span',
      classList: 'py-2 px-5 rounded-full inline-block',
      innerHtml: 'categories'
    }
  ]
}

const classificationTab: IElement = {
  tagName: 'div',
  classList: 'my-1 nav uppercase text-md font-bold justify-center',
  subelement: [tabLanguage, tabCountry, tabCategory]
}

const listLanguage: IElement = {
  tagName: 'div',
  id: 'tab-language',
  classList: 'p-3 flex-wrap rounded-xl  hidden bg-white',
  subelement: []
}
const listCountry: IElement = {
  tagName: 'div',
  id: 'tab-country',
  classList: 'p-3 flex-wrap rounded-xl hidden bg-white',
  subelement: []
}
const listCategory: IElement = {
  tagName: 'div',
  id: 'tab-category',
  classList: 'p-3 flex-wrap rounded-xl hidden bg-white',
  subelement: []
}

export const tab: IElement = {
  tagName: 'div',
  classList: 'container mx-auto appearance-none text-blue-900',
  subelement: [
    radioCategory,
    radioCountry,
    radioLanguage,
    classificationTab,
    listCategory,
    listCountry,
    listLanguage
  ]
}
