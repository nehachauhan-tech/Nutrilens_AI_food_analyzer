"use client";

import { motion } from "framer-motion";
import { Camera, Sparkles, ArrowRight, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 blob-animation" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 blob-animation animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 blob-animation animation-delay-4000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full text-teal-700 font-medium text-sm mb-6 border border-teal-200"
            >
              <Sparkles size={16} className="text-teal-500" />
              AI-Powered Food Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="gradient-text">Scan.</span>{" "}
              <span className="text-gray-800">Decode.</span>{" "}
              <span className="gradient-text">Decide.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Unlock the truth behind food labels with AI. Understand hidden ingredients,
              decode scientific names, and make informed health decisions in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <button className="group px-8 py-4 gradient-bg text-white font-semibold rounded-full hover:opacity-90 transition-all shadow-xl shadow-teal-500/30 flex items-center justify-center gap-2">
                <Camera size={20} />
                Start Scanning Free
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-full border-2 border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-teal-500" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap size={18} className="text-teal-500" />
                <span>Instant Results</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-72 sm:w-80 h-[580px] sm:h-[640px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl float-animation">
                {/* Phone screen */}
                <div className="w-full h-full bg-gradient-to-b from-teal-50 to-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl" />

                  {/* App content */}
                  <div className="pt-12 px-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-gray-500">Good morning</p>
                        <p className="font-semibold text-gray-800">Start Your Scan</p>
                      </div>
                      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center">
                        <span className="text-white text-sm font-bold">N</span>
                      </div>
                    </div>

                    {/* Scan area */}
                    <div className="relative w-full aspect-square bg-white rounded-3xl shadow-lg overflow-hidden mb-4">
                      {/* Scan frame */}
                      <div className="absolute inset-4 border-2 border-teal-400 rounded-2xl">
                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-teal-500 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-teal-500 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-teal-500 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-teal-500 rounded-br-lg" />

                        {/* Scan line */}
                        <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-teal-500 to-transparent scan-line" />
                      </div>

                      {/* Sample food package placeholder */}
                      <div className="absolute inset-8 flex items-center justify-center">
                        <div className="w-24 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg shadow-md flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-1 rounded-full bg-orange-200" />
                            <div className="w-12 h-1 bg-orange-200 rounded mx-auto mb-1" />
                            <div className="w-10 h-1 bg-orange-200 rounded mx-auto" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick actions */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                        <div className="w-8 h-8 rounded-full bg-teal-100 mx-auto mb-1 flex items-center justify-center">
                          <Camera size={14} className="text-teal-600" />
                        </div>
                        <p className="text-xs text-gray-600">Scan</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                        <div className="w-8 h-8 rounded-full bg-teal-100 mx-auto mb-1 flex items-center justify-center">
                          <span className="text-xs">|||</span>
                        </div>
                        <p className="text-xs text-gray-600">Barcode</p>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm text-center">
                        <div className="w-8 h-8 rounded-full bg-teal-100 mx-auto mb-1 flex items-center justify-center">
                          <Sparkles size={14} className="text-teal-600" />
                        </div>
                        <p className="text-xs text-gray-600">AI Coach</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-20 bg-white rounded-2xl shadow-xl p-4 w-48"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">A+</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Health Score</p>
                    <p className="font-semibold text-gray-800">Excellent</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
                className="absolute -left-4 bottom-32 bg-white rounded-2xl shadow-xl p-4 w-44"
              >
                <p className="text-xs text-gray-500 mb-1">Detected</p>
                <p className="text-sm font-semibold text-gray-800 mb-2">3 Hidden Sugars</p>
                <div className="flex gap-1">
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">Maltose</span>
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-xs rounded-full">+2</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
