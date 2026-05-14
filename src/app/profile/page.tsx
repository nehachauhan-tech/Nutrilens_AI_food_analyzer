"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  Calendar,
  Save,
  ArrowLeft,
  Loader2,
  CheckCircle,
  Heart,
  Dumbbell,
  Leaf,
  Scale,
  AlertTriangle,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { getSupabase } from "@/lib/supabase";

interface HealthCondition {
  id: string;
  label: string;
  description: string;
}

interface HealthPreference {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const healthConditions: HealthCondition[] = [
  { id: "diabetes", label: "Diabetes", description: "Type 1 or Type 2 diabetes" },
  { id: "high_bp", label: "High Blood Pressure", description: "Hypertension" },
  { id: "low_bp", label: "Low Blood Pressure", description: "Hypotension" },
  { id: "high_sugar", label: "High Blood Sugar", description: "Hyperglycemia" },
  { id: "cholesterol", label: "High Cholesterol", description: "Hypercholesterolemia" },
  { id: "heart_disease", label: "Heart Disease", description: "Cardiovascular conditions" },
  { id: "kidney_disease", label: "Kidney Disease", description: "Renal conditions" },
  { id: "thyroid", label: "Thyroid Issues", description: "Hypo/Hyperthyroidism" },
  { id: "gluten_allergy", label: "Gluten Allergy", description: "Celiac disease or gluten intolerance" },
  { id: "lactose_intolerance", label: "Lactose Intolerance", description: "Dairy sensitivity" },
  { id: "nut_allergy", label: "Nut Allergy", description: "Peanut or tree nut allergy" },
  { id: "seafood_allergy", label: "Seafood Allergy", description: "Fish or shellfish allergy" },
  { id: "soy_allergy", label: "Soy Allergy", description: "Soy sensitivity" },
  { id: "egg_allergy", label: "Egg Allergy", description: "Egg sensitivity" },
];

const dietPreferences: HealthPreference[] = [
  { id: "vegetarian", label: "Vegetarian", icon: Leaf, color: "text-green-600 bg-green-100" },
  { id: "non_vegetarian", label: "Non-Vegetarian", icon: Utensils, color: "text-red-600 bg-red-100" },
  { id: "vegan", label: "Vegan", icon: Leaf, color: "text-emerald-600 bg-emerald-100" },
  { id: "eggetarian", label: "Eggetarian", icon: Utensils, color: "text-yellow-600 bg-yellow-100" },
];

const fitnessGoals: HealthPreference[] = [
  { id: "weight_loss", label: "Weight Loss", icon: Scale, color: "text-blue-600 bg-blue-100" },
  { id: "weight_gain", label: "Weight Gain", icon: Scale, color: "text-purple-600 bg-purple-100" },
  { id: "muscle_building", label: "Muscle Building", icon: Dumbbell, color: "text-orange-600 bg-orange-100" },
  { id: "gym_user", label: "Gym User", icon: Dumbbell, color: "text-pink-600 bg-pink-100" },
  { id: "maintain_weight", label: "Maintain Weight", icon: Heart, color: "text-teal-600 bg-teal-100" },
  { id: "athletic_performance", label: "Athletic Performance", icon: Dumbbell, color: "text-indigo-600 bg-indigo-100" },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  });

  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedDiet, setSelectedDiet] = useState<string>("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        name: session.user.name || "",
      }));
      loadProfile();
    }
  }, [session]);

  const loadProfile = async () => {
    const supabase = getSupabase();
    if (!supabase || !session?.user?.email) return;

    setLoading(true);
    try {
      const { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", session.user.email)
        .single();

      if (data) {
        setFormData({
          name: data.name || session.user.name || "",
          age: data.age?.toString() || "",
          gender: data.gender || "",
          height: data.height?.toString() || "",
          weight: data.weight?.toString() || "",
        });
        setSelectedConditions(data.health_conditions || []);
        setSelectedDiet(data.diet_preference || "");
        setSelectedGoals(data.fitness_goals || []);
      }
    } catch {
      console.log("Profile not found, using defaults");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess(false);
  };

  const toggleCondition = (conditionId: string) => {
    setSelectedConditions((prev) =>
      prev.includes(conditionId)
        ? prev.filter((id) => id !== conditionId)
        : [...prev, conditionId]
    );
    setSuccess(false);
  };

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((id) => id !== goalId)
        : [...prev, goalId]
    );
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess(false);

    const supabase = getSupabase();
    if (!supabase) {
      setError("Database not configured");
      setSaving(false);
      return;
    }

    try {
      const profileData = {
        email: session?.user?.email,
        name: formData.name,
        age: formData.age ? parseInt(formData.age) : null,
        gender: formData.gender,
        height: formData.height ? parseFloat(formData.height) : null,
        weight: formData.weight ? parseFloat(formData.weight) : null,
        health_conditions: selectedConditions,
        diet_preference: selectedDiet,
        fitness_goals: selectedGoals,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertError } = await supabase
        .from("user_profiles")
        .upsert(profileData, { onConflict: "email" });

      if (upsertError) {
        throw upsertError;
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <Logo size="sm" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900">My Profile</h1>
            <div className="w-10" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit}>
          {/* Profile Picture & Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <div className="flex items-center gap-6 mb-6">
              <div className="relative">
                {session.user?.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-20 h-20 rounded-full object-cover border-4 border-teal-100"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-white text-2xl font-bold border-4 border-teal-100">
                    {formData.name?.charAt(0) || session.user?.email?.charAt(0) || "U"}
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{formData.name || "Your Name"}</h2>
                <p className="text-gray-500">{session.user?.email}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Age
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min="1"
                    max="120"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Height (cm)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  placeholder="Enter height in cm"
                  min="50"
                  max="300"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                />
              </div>

              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter weight in kg"
                  min="20"
                  max="500"
                  step="0.1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                />
              </div>
            </div>
          </motion.div>

          {/* Health Conditions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Health Conditions</h3>
                <p className="text-sm text-gray-500">Select any conditions that apply to you</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {healthConditions.map((condition) => (
                <button
                  key={condition.id}
                  type="button"
                  onClick={() => toggleCondition(condition.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedConditions.includes(condition.id)
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 hover:border-gray-300 bg-white"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedConditions.includes(condition.id)
                        ? "border-red-500 bg-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedConditions.includes(condition.id) && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{condition.label}</p>
                    <p className="text-xs text-gray-500">{condition.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Diet Preference */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Diet Preference</h3>
                <p className="text-sm text-gray-500">Select your dietary preference</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {dietPreferences.map((diet) => {
                const Icon = diet.icon;
                return (
                  <button
                    key={diet.id}
                    type="button"
                    onClick={() => setSelectedDiet(diet.id === selectedDiet ? "" : diet.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      selectedDiet === diet.id
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${diet.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-medium text-gray-900 text-sm text-center">{diet.label}</span>
                    {selectedDiet === diet.id && (
                      <CheckCircle className="w-5 h-5 text-teal-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Fitness Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Fitness Goals</h3>
                <p className="text-sm text-gray-500">Select your health and fitness goals</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {fitnessGoals.map((goal) => {
                const Icon = goal.icon;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                      selectedGoals.includes(goal.id)
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${goal.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="font-medium text-gray-900 text-sm">{goal.label}</span>
                    </div>
                    {selectedGoals.includes(goal.id) && (
                      <CheckCircle className="w-5 h-5 text-teal-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Error/Success Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600"
            >
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Profile saved successfully!
            </motion.div>
          )}

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-end"
          >
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 gradient-bg text-white font-semibold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-teal-500/25"
            >
              {saving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </motion.div>
        </form>
      </main>
    </div>
  );
}
