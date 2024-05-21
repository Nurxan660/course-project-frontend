
const getCurrentLanguageName = () => {
    const langJSON = localStorage.getItem('lang');
  
    if (langJSON) {
      const langObj = JSON.parse(langJSON);
        return langObj.name;
    }
}

const getCurrentLanguageCode = () => {
  const langJSON = localStorage.getItem('lang');

  if (langJSON) {
    const langObj = JSON.parse(langJSON);
      return langObj.code;
  }
}

export { getCurrentLanguageName, getCurrentLanguageCode }