
import arrow from '../assets/arrow.png'; // Make sure to adjust the import path for your arrow image
import { Lightbulb, LogIn, PlaneTakeoff } from 'lucide-react';

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      className="min-h-screen bg-background/90 w-full flex justify-center items-center px-5 md:px-0 py-10 md:py-20"
    >
      <div className="flex flex-col gap-20">
        <section className="flex flex-col gap-5">
          <h2 className="text-blue-500 text-center text-lg font-bold tracking-wide">
            How it works?
          </h2>
          <h3 className="text-foreground text-center md:text-3xl text-xl font-bold">
            Craft Your Ideal Journey Swiftly
          </h3>
        </section>

        <section className="flex items-center justify-center gap-28 w-full h-full flex-col md:flex-row">
          <Item
            text="Login"
            description="Log in to start your journey."
            icon={<LogIn className="h-8 w-8 text-blue-500" />}
            className="rotate-[202deg] hidden md:block"
          />
          <Item
            text="Key in the travel idea"
            description="Tell us about your ideal trip"
            icon={<Lightbulb className="h-8 w-8 text-blue-500" />}
            className="rotate-[350deg] scale-x-[-1] hidden md:block"  // Added scale-x-[-1] to reverse the image
        />

          <Item
            text="Get AI Plan"
            description="Get your AI-driven tailored travel plan"
            icon={<PlaneTakeoff className="h-8 w-8 text-blue-500" />}
            className="hidden"
          />
        </section>
      </div>
    </section>
  );
};

const Item = ({ text, icon, description, className }) => {
  return (
    <article className="flex flex-col items-center justify-center gap-5 relative">
      <div className="bg-muted w-24 h-24 rounded-2xl shadow-2xl items-center flex justify-center">
        {icon}
      </div>
      <span className="font-bold tracking-wide text-lg mt-5">{text}</span>
      <span className="text-sm w-2/3 text-center text-muted-foreground">{description}</span>

      {/* Image for arrow */}
      <img
        src={arrow}
        alt="arrow"
        className={`absolute -right-[120px] top-[15%] opacity-40 ${className}`}
        style={{ width: '100px', height: '100px' }} // Added inline style for the image size
      />
    </article>
  );
};

export default HowItWorks;
