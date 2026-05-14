"use client";

import { motion } from "framer-motion";
import { Camera, Cpu, FileCheck, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Scan or Upload",
    description:
      "Point your camera at any food package, ingredient list, or barcode. You can also upload existing images from your gallery.",
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Analysis",
    description:
      "Our advanced AI processes the image, extracts text, identifies ingredients, and cross-references with our nutrition database.",
  },
  {
    icon: FileCheck,
    step: "03",
    title: "Get Insights",
    description:
      "Receive a comprehensive breakdown with health scores, risk alerts, ingredient explanations in simple language.",
  },
  {
    icon: ThumbsUp,
    step: "04",
    title: "Make Decisions",
    description:
      "Armed with knowledge, choose healthier alternatives, track your intake, and build better eating habits.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-[128px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-teal-500/20 text-teal-400 rounded-full text-sm font-medium mb-4 border border-teal-500/30">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            How <span className="text-teal-400">NutriLens</span> Works
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            From scan to decision in seconds. Our streamlined process makes healthy
            choices effortless.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-teal-500 to-teal-500/0" />
              )}

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-colors">
                {/* Step number */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-5xl font-bold text-gray-700/50">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
