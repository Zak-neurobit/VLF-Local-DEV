'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SettlementCalculator } from '@/components/calculators/SettlementCalculator';
import { ChildSupportCalculator } from '@/components/calculators/ChildSupportCalculator';

type CalculatorType = 'settlement' | 'childSupport' | 'bac' | 'immigration';

export default function CalculatorsPage() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>('settlement');

  const calculators = [
    {
      id: 'settlement' as CalculatorType,
      title: 'Personal Injury Settlement',
      description: 'Estimate your potential compensation',
      icon: '💰',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'childSupport' as CalculatorType,
      title: 'Child Support',
      description: 'Calculate NC child support obligations',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'bac' as CalculatorType,
      title: 'BAC Calculator',
      description: 'Estimate blood alcohol content',
      icon: '🍺',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'immigration' as CalculatorType,
      title: 'Immigration Timeline',
      description: 'Estimate processing times',
      icon: '🌎',
      color: 'from-red-500 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#6B1F2E] to-[#8B2635] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Legal Calculators & Tools</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Free tools to help you understand your legal situation and potential outcomes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Calculator Selection */}
      <section className="py-12 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {calculators.map(calc => (
              <motion.button
                key={calc.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCalculator(calc.id)}
                className={`relative overflow-hidden rounded-lg shadow-lg p-6 text-white transition-all ${
                  activeCalculator === calc.id ? 'ring-4 ring-[#C9974D]' : ''
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${calc.color}`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{calc.icon}</div>
                  <h3 className="text-lg font-bold mb-1">{calc.title}</h3>
                  <p className="text-sm opacity-90">{calc.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Calculator */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeCalculator}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeCalculator === 'settlement' && <SettlementCalculator />}
            {activeCalculator === 'childSupport' && <ChildSupportCalculator />}
            {activeCalculator === 'bac' && <BACCalculator />}
            {activeCalculator === 'immigration' && <ImmigrationTimelineCalculator />}
          </motion.div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-bold text-[#6B1F2E] mb-4">Important Legal Disclaimer</h3>
          <p className="text-gray-600 mb-6">
            These calculators provide estimates only and should not be considered legal advice.
            Every case is unique, and actual outcomes may vary significantly. For accurate legal
            guidance specific to your situation, please consult with one of our attorneys.
          </p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635] transition-all"
          >
            Get Professional Legal Advice
          </a>
        </div>
      </section>
    </div>
  );
}

// BAC Calculator Component
function BACCalculator() {
  const [inputs, setInputs] = useState({
    weight: 150,
    gender: 'male',
    drinks: 0,
    hours: 0,
    drinkType: 'beer',
  });

  const [bac, setBac] = useState(0);

  const calculateBAC = () => {
    // Widmark formula
    const genderConstant = inputs.gender === 'male' ? 0.68 : 0.55;
    const alcoholGrams = inputs.drinks * 14; // Standard drink = 14g alcohol
    const bodyWaterKg = inputs.weight * 0.453592 * genderConstant;
    const bacPercent = (alcoholGrams / (bodyWaterKg * 1000)) * 100;
    const metabolismRate = 0.015 * inputs.hours;
    const finalBAC = Math.max(0, bacPercent - metabolismRate);
    setBac(finalBAC);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
        Blood Alcohol Content (BAC) Calculator
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (lbs)</label>
          <input
            type="number"
            value={inputs.weight}
            onChange={e => setInputs({ ...inputs, weight: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
          <select
            value={inputs.gender}
            onChange={e => setInputs({ ...inputs, gender: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Drinks</label>
          <input
            type="number"
            value={inputs.drinks}
            onChange={e => setInputs({ ...inputs, drinks: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hours Since First Drink
          </label>
          <input
            type="number"
            step="0.5"
            value={inputs.hours}
            onChange={e => setInputs({ ...inputs, hours: Number(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <button
        onClick={calculateBAC}
        className="w-full mt-6 px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635]"
      >
        Calculate BAC
      </button>

      {bac > 0 && (
        <div className="mt-6 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">
            Estimated BAC: {bac.toFixed(3)}%
          </h3>
          <div
            className={`p-4 rounded-lg ${
              bac >= 0.08
                ? 'bg-red-100 text-red-800'
                : bac >= 0.05
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
            }`}
          >
            {bac >= 0.08 && <p className="font-semibold">⚠️ Over Legal Limit - Do Not Drive!</p>}
            {bac >= 0.05 && bac < 0.08 && (
              <p className="font-semibold">⚠️ Impaired - Driving Not Recommended</p>
            )}
            {bac < 0.05 && <p className="font-semibold">Below Legal Limit - Still Use Caution</p>}
          </div>
          <p className="mt-4 text-sm text-gray-600">
            <strong>Warning:</strong> This is an estimate only. Many factors affect BAC. Never drive
            if you\&apos;ve been drinking. DWI arrests can happen at any BAC level.
          </p>
        </div>
      )}
    </div>
  );
}

// Immigration Timeline Calculator
function ImmigrationTimelineCalculator() {
  const [caseType, setCaseType] = useState('family-immediate');
  const [showTimeline, setShowTimeline] = useState(false);

  const timelines = {
    'family-immediate': { min: 8, max: 14, name: 'Immediate Relative (Spouse/Parent of USC)' },
    'family-preference': { min: 12, max: 60, name: 'Family Preference Categories' },
    'employment-eb1': { min: 8, max: 16, name: 'Employment-Based First Preference' },
    'employment-eb2': { min: 18, max: 48, name: 'Employment-Based Second Preference' },
    'employment-eb3': { min: 24, max: 72, name: 'Employment-Based Third Preference' },
    asylum: { min: 6, max: 60, name: 'Asylum Application' },
    daca: { min: 4, max: 7, name: 'DACA Renewal' },
    naturalization: { min: 8, max: 14, name: 'Citizenship/Naturalization' },
  };

  const timeline = timelines[caseType as keyof typeof timelines];

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-3xl font-bold text-[#6B1F2E] mb-6">
        Immigration Processing Timeline Estimator
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Select Case Type</label>
        <select
          value={caseType}
          onChange={e => setCaseType(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        >
          {Object.entries(timelines).map(([key, value]) => (
            <option key={key} value={key}>
              {value.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={() => setShowTimeline(true)}
        className="w-full px-6 py-3 bg-[#6B1F2E] text-white font-bold rounded-lg hover:bg-[#8B2635]"
      >
        Show Timeline Estimate
      </button>

      {showTimeline && timeline && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-xl font-bold text-[#6B1F2E] mb-4">Estimated Processing Time</h3>

          <div className="mb-6">
            <div className="bg-[#C9974D] bg-opacity-20 rounded-lg p-4">
              <p className="text-2xl font-bold text-[#6B1F2E]">
                {timeline.min} - {timeline.max} months
              </p>
              <p className="text-sm text-gray-600 mt-2">Based on current USCIS processing times</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="ml-4">
                <p className="font-semibold">File Application</p>
                <p className="text-sm text-gray-600">Submit forms and supporting documents</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="ml-4">
                <p className="font-semibold">Biometrics (if required)</p>
                <p className="text-sm text-gray-600">1-2 months after filing</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="ml-4">
                <p className="font-semibold">Interview (if required)</p>
                <p className="text-sm text-gray-600">
                  {timeline.min - 2} - {timeline.max - 2} months after filing
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-[#6B1F2E] text-white rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <div className="ml-4">
                <p className="font-semibold">Decision</p>
                <p className="text-sm text-gray-600">
                  Total: {timeline.min} - {timeline.max} months
                </p>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-600">
            <strong>Note:</strong> Processing times vary by case and USCIS office. Premium
            processing may be available for some employment-based cases.
          </p>
        </motion.div>
      )}
    </div>
  );
}
