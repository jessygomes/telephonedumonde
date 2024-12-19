import { BackButton } from "./BackBtn";
import { Social } from "./Social";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = true,
}: CardWrapperProps) => {
  return (
    <div className="flex flex-col gap-4 p-2 bg-noir">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-white text-center uppercase w-full">
          {headerLabel}
        </h1>
      </div>

      <div>{children}</div>

      {showSocial && (
        <div>
          <Social />
        </div>
      )}

      <div>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </div>
    </div>
  );
};

