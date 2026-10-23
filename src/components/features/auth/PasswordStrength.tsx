import { cn } from "@/packages/utils/cn";
import {
  PASSWORD_RULES,
  passwordStrength,
} from "@/packages/utils/password-rules";

const SEGMENT_KEYS = ["s1", "s2", "s3", "s4", "s5"] as const;

interface PasswordStrengthProps {
  value: string;
  id?: string;
}

/** The meter and the requirement checklist under a "new password" field. */
const PasswordStrength = ({ value, id }: PasswordStrengthProps) => {
  const strength = passwordStrength(value);

  return (
    <div id={id} className="password-strength" data-level={strength.level}>
      <div className="password-strength__row">
        <div className="password-strength__bar" aria-hidden="true">
          {SEGMENT_KEYS.map((key, index) => (
            <span
              key={key}
              className={cn(
                "password-strength__segment",
                index < strength.segments && "is-filled",
              )}
            />
          ))}
        </div>
        <span className="password-strength__label">{strength.label}</span>
      </div>

      <ul className="password-strength__rules">
        {PASSWORD_RULES.map((rule) => {
          const ok = rule.test(value);
          return (
            <li key={rule.id} className={cn(ok && "is-met")}>
              <span aria-hidden="true" className="password-strength__tick">
                {ok ? "✓" : ""}
              </span>
              <span>
                {rule.label}
                <span className="sr-only">
                  {ok ? " (met)" : " (not met yet)"}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PasswordStrength;
