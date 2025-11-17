interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  gradient?: boolean;
}

export function ProgressBar({ steps, currentStep, gradient = true }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 relative">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  index < currentStep
                    ? gradient
                      ? 'bg-gradient-to-br from-[#2A7D46] to-[#6FCF97] text-white'
                      : 'bg-[#2A7D46] text-white'
                    : index === currentStep
                    ? gradient
                      ? 'bg-gradient-to-br from-[#F8C300] to-[#FFD95E] text-[#0D0D0D]'
                      : 'bg-[#F8C300] text-[#0D0D0D]'
                    : 'bg-[#E5E7EB] text-[#6B7280]'
                }`}
              >
                {index + 1}
              </div>
              <p className="text-xs mt-2 text-center font-medium text-[#6B7280]">{step}</p>
            </div>
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-1 -z-10">
                <div className="h-full bg-[#E5E7EB]">
                  <div
                    className={`h-full transition-all duration-500 ${
                      index < currentStep
                        ? gradient
                          ? 'bg-gradient-to-r from-[#2A7D46] to-[#6FCF97]'
                          : 'bg-[#2A7D46]'
                        : 'w-0'
                    }`}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
