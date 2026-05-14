"use client";

import { motion } from "framer-motion";
import {
  Camera,
  QrCode,
  Brain,
  AlertTriangle,
  RefreshCw,
  Calendar,
  Bot,
  FileText,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Food Packet Analysis",
    description:
      "Upload any food packet image and get instant AI-powered analysis of ingredients, nutritional values, and health implications.",
    color: "bg-teal-500",
    lightColor: "bg-teal-50",
  },
  {
    icon: QrCode,
    title: "Barcode Scanner",
    description:
      "Scan barcodes to instantly retrieve product information, compare brands, and access our extensive food database.",
    color: "bg-cyan-500",
    lightColor: "bg-cyan-50",
  },
  {
    icon: Brain,
    title: "Ingredient Intelligence",
    description:
      "Decode complex scientific names into simple terms. Understand what E-numbers, preservatives, and additives really mean.",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50",
  },
  {
    icon: AlertTriangle,
    title: "Health Risk Detection",
    description:
      "Identify potential allergens, harmful additives, and ingredients that may conflict with your health conditions.",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
  },
  {
    icon: RefreshCw,
    title: "Better Alternatives",
    description:
      "Get personalized recommendations for healthier product alternatives based on your dietary preferences and health goals.",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
  },
  {
    icon: Calendar,
    title: "Diet Planner",
    description:
      "Create customized meal plans based on your scanned products, nutritional needs, and health objectives.",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
  },
  {
    icon: Bot,
    title: "AI Health Coach",
    description:
      "Get personalized nutrition advice, ask questions about ingredients, and receive guidance from our AI nutritionist.",
    color: "bg-pink-500",
    lightColor: "bg-pink-50",
  },
  {
    icon: FileText,
    title: "Final Health Report",
    description:
      "Generate comprehensive health reports with all your scanned products, trends, and personalized recommendations.",
    color: "bg-indigo-500",
    lightColor: "bg-indigo-50",
  },
  {
    icon: Star,
    title: "Reviews & Ratings",
    description:
      "Access community reviews, expert ratings, and real user experiences to make informed purchasing decisions.",
    color: "bg-amber-500",
    lightColor: "bg-amber-50",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-white to-teal-50/50">
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
            Powerful Features
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need to{" "}
            <span className="gradient-text">Eat Smarter</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From scanning to understanding, our AI-powered platform gives you complete
            control over what you put in your body.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 card-hover"
            >
              <div
                className={`w-14 h-14 ${feature.lightColor} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className={`w-7 h-7 text-${feature.color.replace('bg-', '')}`} style={{ color: feature.color.includes('teal') ? '#0d9488' : feature.color.includes('cyan') ? '#06b6d4' : feature.color.includes('emerald') ? '#10b981' : feature.color.includes('orange') ? '#f97316' : feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('purple') ? '#a855f7' : feature.color.includes('pink') ? '#ec4899' : feature.color.includes('indigo') ? '#6366f1' : '#f59e0b' }} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
