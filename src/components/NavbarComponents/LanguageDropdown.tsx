import { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { getCurrentLanguageName, getCurrentLanguageCode } from "../../service/utils/langUtils";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(getCurrentLanguageName() || "English");
  const handleSelect = (e: string | null) => {
    if(!e) return
    const langName = e.split('|')
    setLanguage(langName[1])
    i18n.changeLanguage(langName[0]);
    localStorage.setItem("lang", JSON.stringify({ code: langName[0], name: langName[1] }))
  };

  return (
    <NavDropdown
      title={language}
      id="collapsible-nav-dropdown"
      onSelect={handleSelect}
    >
      <NavDropdown.Item eventKey="uz|Uzbek">Uzbek</NavDropdown.Item>
      <NavDropdown.Item eventKey="en|English">English</NavDropdown.Item>
    </NavDropdown>
  );
};

export default LanguageDropdown;
