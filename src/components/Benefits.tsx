"use client";

import { motion } from "framer-motion";
import { Check, TrendingUp, Clock, Heart } from "lucide-react";

const stats = [
  { value: "10M+", label: "Products Analyzed" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "500K+", label: "Happy Users" },
  { value: "2sec", label: "Avg. Scan Time" },
];

const benefits = [
  {
    icon: Heart,
    title: "Protect Your Health",
    points: [
      "Identify hidden allergens before consumption",
      "Detect harmful additives and preservatives",
      "Track your daily nutritional intake",
      "Get alerts for ingredients that conflict with your conditions",
    ],
  },
  {
    icon: TrendingUp,
    title: "Make Smarter Choices",
    points: [
      "Compare products side-by-side",
      "Find healthier alternatives instantly",
      "Understand what you're really eating",
      "Build long-term healthy habits",
    ],
  },
  {
    icon: Clock,
    title: "Save Time & Effort",
    points: [
      "No more googling ingredient names",
      "Instant AI-powered analysis",
      "All information in one place",
      "Quick decisions at the store",
    ],
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 md:py-32 bg-gradient-to-b from-teal-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-teal-100"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Benefits That{" "}
            <span className="gradient-text">Transform Your Life</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join hundreds of thousands who have taken control of their nutrition with NutriLens.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mb-6">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {benefit.title}
              </h3>

              <ul className="space-y-4">
                {benefit.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-teal-600" />
                    </div>
                    <span className="text-gray-600">{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
