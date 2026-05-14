"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Health Coach",
    avatar: "SM",
    rating: 5,
    comment:
      "NutriLens has transformed how I help my clients make food choices. The ingredient breakdown is incredibly detailed and easy to understand.",
  },
  {
    name: "David Chen",
    role: "Parent of 2",
    avatar: "DC",
    rating: 5,
    comment:
      "As a parent, knowing exactly what's in my kids' food is crucial. This app has helped me avoid hidden allergens multiple times!",
  },
  {
    name: "Emma Rodriguez",
    role: "Fitness Enthusiast",
    avatar: "ER",
    rating: 5,
    comment:
      "The AI coach feature is like having a nutritionist in my pocket. It helped me understand macros and find better protein sources.",
  },
  {
    name: "Michael Thompson",
    role: "Diabetic Patient",
    avatar: "MT",
    rating: 5,
    comment:
      "Managing my sugar intake has never been easier. The app catches hidden sugars I would have never noticed on my own.",
  },
  {
    name: "Priya Sharma",
    role: "Vegan Lifestyle",
    avatar: "PS",
    rating: 5,
    comment:
      "Finally an app that actually identifies hidden animal products in processed foods. Game changer for vegans!",
  },
  {
    name: "James Wilson",
    role: "Busy Professional",
    avatar: "JW",
    rating: 5,
    comment:
      "Quick scans while grocery shopping save me so much time. I can make healthy choices without spending hours reading labels.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Loved by <span className="gradient-text">Health-Conscious</span> People
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our community has to say about their NutriLens experience.
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-6 border border-teal-100 hover:shadow-lg transition-shadow relative"
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-teal-200" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.comment}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
