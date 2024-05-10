import { useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const LanguageDropdown = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("English");

  const handleSelect = (e: string | null) => {
    if(!e) return
    const langName = e.split('|')
    setLanguage(langName[1])
    i18n.changeLanguage(langName[0]);
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
