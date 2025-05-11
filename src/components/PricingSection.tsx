import React from 'react';
import { Check, X } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  isPopular?: boolean;
}

const PricingSection: React.FC = () => {
  const tiers: PricingTier[] = [
    {
      name: "Starter",
      price: "$49",
      description: "Perfect for beginners looking to learn WordPress basics",
      features: [
        { text: "WordPress Fundamentals Course", included: true },
        { text: "Basic Theme Customization", included: true },
        { text: "3 Months Access", included: true },
        { text: "Community Support", included: true },
        { text: "Plugin Development", included: false },
        { text: "1-on-1 Mentoring", included: false },
        { text: "Advanced Development", included: false },
        { text: "Certification", included: false }
      ],
      buttonText: "Start Learning"
    },
    {
      name: "Professional",
      price: "$149",
      description: "Comprehensive training for WordPress professionals",
      features: [
        { text: "WordPress Fundamentals Course", included: true },
        { text: "Advanced Theme Development", included: true },
        { text: "6 Months Access", included: true },
        { text: "Priority Support", included: true },
        { text: "Plugin Development", included: true },
        { text: "Monthly Group Mentoring", included: true },
        { text: "Advanced Development", included: true },
        { text: "Certification", included: false }
      ],
      buttonText: "Go Professional",
      isPopular: true
    },
    {
      name: "Enterprise",
      price: "$299",
      description: "Complete mastery with personal mentoring",
      features: [
        { text: "WordPress Fundamentals Course", included: true },
        { text: "Advanced Theme Development", included: true },
        { text: "Lifetime Access", included: true },
        { text: "24/7 Priority Support", included: true },
        { text: "Plugin Development", included: true },
        { text: "Weekly 1-on-1 Mentoring", included: true },
        { text: "Advanced Development", included: true },
        { text: "Official Certification", included: true }
      ],
      buttonText: "Get Started"
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Learning Path
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the perfect plan to kickstart your WordPress journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl ${
                tier.isPopular
                  ? 'bg-white shadow-xl border-2 border-blue-500 scale-105'
                  : 'bg-white shadow-lg'
              } p-8`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-6 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-xl font-semibold text-gray-500">
                    /course
                  </span>
                </div>
                <p className="mt-4 text-gray-600">{tier.description}</p>
              </div>

              <ul className="mt-8 space-y-4">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start"
                  >
                    {feature.included ? (
                      <Check className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-red-300 mt-0.5" />
                    )}
                    <span className={`ml-3 ${
                      feature.included ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full py-3 px-6 rounded-lg text-center font-medium ${
                    tier.isPopular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  {tier.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;