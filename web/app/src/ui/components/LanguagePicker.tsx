import { Languages } from "lucide-react";
import { localeLabels, type Locale } from "../../i18n/i18n";

type Props = {
  locale: Locale;
  onChange: (locale: Locale) => void;
  label: string;
};

export function LanguagePicker({ locale, onChange, label }: Props) {
  return (
    <label className="select-control">
      <Languages aria-hidden="true" />
      <span>{label}</span>
      <select value={locale} onChange={(event) => onChange(event.target.value as Locale)}>
        {Object.entries(localeLabels).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </label>
  );
}
