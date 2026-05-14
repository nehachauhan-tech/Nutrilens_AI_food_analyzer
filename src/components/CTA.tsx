"use client";

import { motion } from "framer-motion";
import { ArrowRight, Camera, Apple, PlayCircle } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-bg" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Take Control of
            <br />
            Your Nutrition?
          </h2>
          <p className="text-lg sm:text-xl text-teal-100 max-w-2xl mx-auto mb-10">
            Join over 500,000 users who have transformed their eating habits with NutriLens.
            Start your journey to healthier living today.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white text-teal-600 font-semibold rounded-full shadow-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
            >
              <Camera size={20} />
              Start Free Trial
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <PlayCircle size={20} />
              Watch Demo
            </motion.button>
          </div>

          {/* App store badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <p className="text-teal-100 text-sm">Available on:</p>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-5 py-3 bg-black/30 rounded-xl hover:bg-black/40 transition-colors">
                <Apple size={24} className="text-white" />
                <div className="text-left">
                  <div className="text-[10px] text-teal-100">Download on the</div>
                  <div className="text-white font-semibold text-sm">App Store</div>
                </div>
              </button>
              <button className="flex items-center gap-2 px-5 py-3 bg-black/30 rounded-xl hover:bg-black/40 transition-colors">
                <PlayCircle size={24} className="text-white" />
                <div className="text-left">
                  <div className="text-[10px] text-teal-100">Get it on</div>
                  <div className="text-white font-semibold text-sm">Google Play</div>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
