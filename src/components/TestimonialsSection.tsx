import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  rating: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, role, image, rating }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 relative transition-transform hover:-translate-y-1 duration-300">
      <div className="absolute -top-3 -left-3 bg-blue-600 rounded-full p-2 shadow-md">
        <Quote className="h-4 w-4 text-white" />
      </div>
      <div className="flex space-x-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">{quote}</p>
      <div className="flex items-center">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={image}
          alt={name}
        />
        <div className="ml-3">
          <h4 className="text-sm font-medium text-gray-900">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "This WordPress training completely transformed my career. I went from knowing nothing about websites to building them professionally for clients.",
      name: "Alex Morgan",
      role: "Freelance Web Developer",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    },
    {
      quote: "The course structure is perfect - starting from basics and gradually moving to advanced topics. The instructors are true WordPress experts.",
      name: "Sarah Johnson",
      role: "Digital Marketing Manager",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    },
    {
      quote: "I've taken many online courses before, but this one stood out for its practical approach. Every lesson had real-world applications.",
      name: "Michael Chen",
      role: "Small Business Owner",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 4
    },
    {
      quote: "Learning WordPress development opened new doors for my agency. We now offer comprehensive WordPress services thanks to this training.",
      name: "Emily Rodriguez",
      role: "Creative Agency Director",
      image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Join thousands of successful students who transformed their skills with our WordPress training.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;