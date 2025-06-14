import { LanguageCode } from 'iso-639-1'

type Locale = {
  header: string
  header_hub: string
  online: string
  members: string
  button: string
}

function getLocaleStrings(lang: string) {
  return (strings as Record<string, Locale>)[lang] || strings.en;
}