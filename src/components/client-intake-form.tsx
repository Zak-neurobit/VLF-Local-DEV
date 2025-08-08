'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ClientIntakeRequest, CaseAssessmentResult } from '@/lib/crewai/ai-powered-client-intake';

interface IntakeFormProps {
  onSubmit?: (assessment: CaseAssessmentResult) => void;
  initialData?: Partial<ClientIntakeRequest>;
}

export default function ClientIntakeForm({ onSubmit, initialData }: IntakeFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessment, setAssessment] = useState<CaseAssessmentResult | null>(null);
  const [formData, setFormData] = useState<ClientIntakeRequest>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      preferredLanguage: 'en',
      location: {
        city: '',
        state: '',
        zipCode: '',
      },
    },
    legalIssue: {
      primaryArea: 'unknown',
      description: '',
      urgency: 'within_weeks',
      hasDeadlines: false,
    },
    priorLegalExperience: {
      hasAttorney: false,
      priorCases: false,
      priorDenials: false,
    },
    financialSituation: {
      employmentStatus: 'employed',
      hasInsurance: false,
      abilityToPay: 'payment_plan',
    },
    clientGoals: [],
    specificQuestions: [],
    source: 'website',
    ...initialData,
  });

  const totalSteps = 5;

  const handleInputChange = (
    section: keyof ClientIntakeRequest,
    field: string,
    value: string | boolean | string[]
  ): void => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, unknown>),
        [field]: value,
      },
    }));
  };

  const handleNestedInputChange = (
    section: keyof ClientIntakeRequest,
    nestedField: string,
    field: string,
    value: string
  ): void => {
    setFormData(prev => {
      const sectionData = prev[section] as Record<string, any>;
      return {
        ...prev,
        [section]: {
          ...sectionData,
          [nestedField]: {
            ...(sectionData?.[nestedField] || {}),
            [field]: value,
          },
        },
      };
    });
  };

  // Array input handler for potential future use
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleArrayInputChange = (
    section: keyof ClientIntakeRequest,
    field: string,
    value: string[]
  ): void => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, unknown>),
        [field]: value,
      },
    }));
  };

  const addGoal = (goal: string) => {
    if (goal.trim() && !formData.clientGoals.includes(goal.trim())) {
      setFormData(prev => ({
        ...prev,
        clientGoals: [...prev.clientGoals, goal.trim()],
      }));
    }
  };

  const removeGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      clientGoals: prev.clientGoals.filter(g => g !== goal),
    }));
  };

  const addQuestion = (question: string) => {
    if (question.trim() && !formData.specificQuestions.includes(question.trim())) {
      setFormData(prev => ({
        ...prev,
        specificQuestions: [...prev.specificQuestions, question.trim()],
      }));
    }
  };

  const removeQuestion = (question: string) => {
    setFormData(prev => ({
      ...prev,
      specificQuestions: prev.specificQuestions.filter(q => q !== question),
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.personalInfo.firstName &&
          formData.personalInfo.lastName &&
          formData.personalInfo.email &&
          formData.personalInfo.phone &&
          formData.personalInfo.location.city &&
          formData.personalInfo.location.state
        );
      case 2:
        return !!(formData.legalIssue.description && formData.legalIssue.description.length >= 10);
      case 3:
        return true; // Prior experience is optional
      case 4:
        return true; // Financial info has defaults
      case 5:
        return formData.clientGoals.length > 0;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitForm = async () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/client-intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success && result.assessment) {
        setAssessment(result.assessment);

        if (onSubmit) {
          onSubmit(result.assessment);
        } else {
          // Redirect to assessment results page
          router.push(`/assessment-results?id=${result.assessment.assessmentId}`);
        }
      } else {
        throw new Error(result.error || 'Failed to submit intake form');
      }
    } catch (error) {
      console.error('Failed to submit intake form:', error);
      alert('Failed to submit intake form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(field, value) => handleInputChange('personalInfo', field, value)}
            onNestedChange={(nested, field, value) =>
              handleNestedInputChange('personalInfo', nested, field, value)
            }
          />
        );
      case 2:
        return (
          <LegalIssueStep
            data={formData.legalIssue}
            onChange={(field, value) => handleInputChange('legalIssue', field, value)}
          />
        );
      case 3:
        return (
          <PriorExperienceStep
            data={formData.priorLegalExperience}
            onChange={(field, value) => handleInputChange('priorLegalExperience', field, value)}
          />
        );
      case 4:
        return (
          <FinancialStep
            data={formData.financialSituation}
            onChange={(field, value) => handleInputChange('financialSituation', field, value)}
          />
        );
      case 5:
        return (
          <GoalsAndQuestionsStep
            goals={formData.clientGoals}
            questions={formData.specificQuestions}
            onAddGoal={addGoal}
            onRemoveGoal={removeGoal}
            onAddQuestion={addQuestion}
            onRemoveQuestion={removeQuestion}
          />
        );
      default:
        return null;
    }
  };

  if (assessment) {
    return <AssessmentResults assessment={assessment} />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Legal Consultation Request</h2>
          <span className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form Content */}
      <div className="min-h-[400px]">{renderStep()}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8 pt-6 border-t">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="px-6 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {[...Array(totalSteps)].map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 === currentStep
                  ? 'bg-blue-600'
                  : index + 1 < currentStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {currentStep < totalSteps ? (
          <button
            type="button"
            onClick={nextStep}
            disabled={!validateStep(currentStep)}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={submitForm}
            disabled={!validateStep(5) || isSubmitting}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        )}
      </div>
    </div>
  );
}

// Step Components
interface PersonalInfoStepProps {
  data: ClientIntakeRequest['personalInfo'];
  onChange: (field: string, value: string) => void;
  onNestedChange: (nested: string, field: string, value: string) => void;
}

function PersonalInfoStep({ data, onChange, onNestedChange }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={data.firstName}
            onChange={e => onChange('firstName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={data.lastName}
            onChange={e => onChange('lastName', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            value={data.phone}
            onChange={e => onChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
          <select
            value={data.preferredLanguage}
            onChange={e => onChange('preferredLanguage', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish / Español</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Location</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
            <input
              type="text"
              value={data.location.city}
              onChange={e => onNestedChange('location', 'city', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
            <input
              type="text"
              value={data.location.state}
              onChange={e => onNestedChange('location', 'state', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., North Carolina"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              value={data.location.zipCode}
              onChange={e => onNestedChange('location', 'zipCode', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface LegalIssueStepProps {
  data: ClientIntakeRequest['legalIssue'];
  onChange: (field: string, value: string | boolean) => void;
}

function LegalIssueStep({ data, onChange }: LegalIssueStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Legal Issue Information</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Legal Area (if known)
        </label>
        <select
          value={data.primaryArea}
          onChange={e => onChange('primaryArea', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="unknown">Not sure / Need help determining</option>
          <option value="immigration">Immigration Law</option>
          <option value="personal_injury">Personal Injury</option>
          <option value="workers_compensation">Workers Compensation</option>
          <option value="family_law">Family Law / Divorce</option>
          <option value="criminal_defense">Criminal Defense</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Describe your legal issue * (minimum 10 characters)
        </label>
        <textarea
          value={data.description}
          onChange={e => onChange('description', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Please provide as much detail as possible about your legal situation..."
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          {data.description.length} characters (minimum 10 required)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How urgent is your situation?
          </label>
          <select
            value={data.urgency}
            onChange={e => onChange('urgency', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="immediate">Immediate (emergency)</option>
            <option value="within_days">Within days</option>
            <option value="within_weeks">Within weeks</option>
            <option value="within_months">Within months</option>
            <option value="planning">Just planning ahead</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Estimated case value (if applicable)
          </label>
          <input
            type="text"
            value={data.estimatedValue || ''}
            onChange={e => onChange('estimatedValue', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., $10,000 or Unknown"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasDeadlines"
            checked={data.hasDeadlines}
            onChange={e => onChange('hasDeadlines', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hasDeadlines" className="text-sm font-medium text-gray-700">
            There are important deadlines in my case
          </label>
        </div>

        {data.hasDeadlines && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Deadline Date</label>
            <input
              type="date"
              value={data.deadlineDate || ''}
              onChange={e => onChange('deadlineDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface PriorExperienceStepProps {
  data: ClientIntakeRequest['priorLegalExperience'];
  onChange: (field: string, value: string | boolean) => void;
}

function PriorExperienceStep({ data, onChange }: PriorExperienceStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Previous Legal Experience</h3>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasAttorney"
            checked={data.hasAttorney}
            onChange={e => onChange('hasAttorney', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hasAttorney" className="text-sm font-medium text-gray-700">
            I currently have or have had an attorney for this matter
          </label>
        </div>

        {data.hasAttorney && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attorney{`'`}s Name (optional)
            </label>
            <input
              type="text"
              value={data.priorAttorneyName || ''}
              onChange={e => onChange('priorAttorneyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="priorCases"
            checked={data.priorCases}
            onChange={e => onChange('priorCases', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="priorCases" className="text-sm font-medium text-gray-700">
            I have had legal cases before
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="priorDenials"
            checked={data.priorDenials}
            onChange={e => onChange('priorDenials', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="priorDenials" className="text-sm font-medium text-gray-700">
            I have had applications or cases denied before
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="priorConvictions"
            checked={data.priorConvictions}
            onChange={e => onChange('priorConvictions', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="priorConvictions" className="text-sm font-medium text-gray-700">
            I have criminal convictions (if applicable)
          </label>
        </div>
      </div>
    </div>
  );
}

interface FinancialStepProps {
  data: ClientIntakeRequest['financialSituation'];
  onChange: (field: string, value: string | boolean) => void;
}

function FinancialStep({ data, onChange }: FinancialStepProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Financial Information</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
          <select
            value={data.employmentStatus}
            onChange={e => onChange('employmentStatus', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="employed">Employed</option>
            <option value="unemployed">Unemployed</option>
            <option value="self_employed">Self-employed</option>
            <option value="retired">Retired</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Monthly Income (optional)
          </label>
          <input
            type="text"
            value={data.monthlyIncome || ''}
            onChange={e => onChange('monthlyIncome', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., $3,000"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="hasInsurance"
            checked={data.hasInsurance}
            onChange={e => onChange('hasInsurance', e.target.checked)}
            className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hasInsurance" className="text-sm font-medium text-gray-700">
            I have relevant insurance coverage
          </label>
        </div>

        {data.hasInsurance && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Insurance Type</label>
            <input
              type="text"
              value={data.insuranceType || ''}
              onChange={e => onChange('insuranceType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Auto, Health, Workers Comp"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ability to Pay for Legal Services
        </label>
        <select
          value={data.abilityToPay}
          onChange={e => onChange('abilityToPay', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="full_payment">Can pay full amount upfront</option>
          <option value="payment_plan">Need payment plan</option>
          <option value="limited_budget">Very limited budget</option>
          <option value="seeking_pro_bono">Seeking pro bono help</option>
        </select>
      </div>
    </div>
  );
}

interface GoalsAndQuestionsStepProps {
  goals: string[];
  questions: string[];
  onAddGoal: (goal: string) => void;
  onRemoveGoal: (goal: string) => void;
  onAddQuestion: (question: string) => void;
  onRemoveQuestion: (question: string) => void;
}

function GoalsAndQuestionsStep({
  goals,
  questions,
  onAddGoal,
  onRemoveGoal,
  onAddQuestion,
  onRemoveQuestion,
}: GoalsAndQuestionsStepProps) {
  const [newGoal, setNewGoal] = useState('');
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      onAddGoal(newGoal);
      setNewGoal('');
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim()) {
      onAddQuestion(newQuestion);
      setNewQuestion('');
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-xl font-semibold text-gray-900">Goals and Questions</h3>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">What are your goals? *</h4>
        <p className="text-sm text-gray-600 mb-4">
          Please add at least one goal for your legal matter.
        </p>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newGoal}
              onChange={e => setNewGoal(e.target.value)}
              placeholder="e.g., Get citizenship, Resolve accident claim, etc."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={e => e.key === 'Enter' && handleAddGoal()}
            />
            <button
              type="button"
              onClick={handleAddGoal}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Goal
            </button>
          </div>

          {goals.length > 0 && (
            <div className="space-y-2">
              {goals.map((goal: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                >
                  <span className="text-gray-800">{goal}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveGoal(goal)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Specific Questions (optional)</h4>
        <p className="text-sm text-gray-600 mb-4">
          Do you have any specific questions about your legal situation?
        </p>

        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newQuestion}
              onChange={e => setNewQuestion(e.target.value)}
              placeholder="e.g., How long will this take? What documents do I need?"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={e => e.key === 'Enter' && handleAddQuestion()}
            />
            <button
              type="button"
              onClick={handleAddQuestion}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Question
            </button>
          </div>

          {questions.length > 0 && (
            <div className="space-y-2">
              {questions.map((question: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
                >
                  <span className="text-gray-800">{question}</span>
                  <button
                    type="button"
                    onClick={() => onRemoveQuestion(question)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AssessmentResults({ assessment }: { assessment: CaseAssessmentResult }) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900">Assessment Complete!</h2>
        <p className="text-gray-600 mt-2">
          Thank you for providing your information. We{`'`}ve completed an initial assessment of
          your case.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Case Information</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Assessment ID:</strong> {assessment.assessmentId}
            </p>
            <p>
              <strong>Practice Area:</strong>{' '}
              {assessment.practiceArea.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
            <p>
              <strong>Case Viability:</strong>{' '}
              {assessment.caseAnalysis.viability
                .replace('_', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            </p>
            <p>
              <strong>Priority:</strong>{' '}
              {assessment.followUpStrategy.priority
                .replace('_', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Next Steps</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Recommended Contact:</strong>{' '}
              {assessment.followUpStrategy.recommendedContact.replace('_', ' ')}
            </p>
            <p>
              <strong>Attorney Necessity:</strong>{' '}
              {assessment.recommendations.attorney_necessity
                .replace('_', ' ')
                .replace(/\b\w/g, l => l.toUpperCase())}
            </p>
            <p>
              <strong>Estimated Timeframe:</strong> {assessment.caseAnalysis.timeframe}
            </p>
            <p>
              <strong>Estimated Costs:</strong>{' '}
              {assessment.costAnalysis.estimatedCosts.total_estimated}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Immediate Actions Recommended</h3>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
          {assessment.recommendations.immediate_actions.map((action, index) => (
            <li key={index}>{action}</li>
          ))}
        </ul>
      </div>

      <div className="text-center">
        <p className="text-gray-600 mb-4">
          We will be in touch with you soon to discuss your case further.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => (window.location.href = '/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Return to Home
          </button>
          <button
            onClick={() =>
              (window.location.href = `/client-dashboard?email=${encodeURIComponent(assessment.clientId)}`)
            }
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            View Client Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
