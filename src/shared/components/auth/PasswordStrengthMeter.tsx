"use client";

interface PasswordStrengthMeterProps {
  password: string;
}

function getStrength(password: string): { score: number; label: string } {
  if (!password) return { score: 0, label: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["Muito fraca", "Fraca", "Razoável", "Boa", "Forte", "Muito forte"];
  return { score, label: labels[score] };
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const { score, label } = getStrength(password);
  if (!password) return null;

  const colors = [
    "bg-red-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-600",
  ];

  return (
    <div className="mt-1">
      <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded bg-gray-200">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-full flex-1 transition-colors ${
              i < score ? colors[score] : "bg-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-gray-500">{label}</p>
    </div>
  );
}
