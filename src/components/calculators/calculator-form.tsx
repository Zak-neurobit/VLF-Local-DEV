'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Removed unused Select imports
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, AlertTriangle, CheckCircle, DollarSign, Clock, Info } from 'lucide-react';

interface CalculatorFormProps {
  calculatorType: string;
  onResult: (result: any) => void;
}

export default function CalculatorForm({ calculatorType, onResult }: CalculatorFormProps) {
  const [schema, setSchema] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSchema();
  }, [calculatorType]);

  const fetchSchema = async () => {
    try {
      const response = await fetch(`/api/calculators/${calculatorType}`);
      const data = await response.json();

      if (data.success) {
        setSchema(data.schema);
        setMetadata(data.metadata);

        // Initialize form data with defaults
        const initialData: Record<string, any> = {};
        Object.entries(data.schema as Record<string, any>).forEach(([key, field]) => {
          if (field.default !== undefined) {
            initialData[key] = field.default;
          } else if (field.type === 'boolean') {
            initialData[key] = false;
          } else if (field.type === 'number') {
            initialData[key] = field.min || 0;
          }
        });
        setFormData(initialData);
      }
    } catch (error) {
      console.error('Failed to fetch calculator schema:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    Object.entries(schema as Record<string, any>).forEach(([key, field]) => {
      const value = formData[key];

      if (field.required && (value === undefined || value === null || value === '')) {
        newErrors[key] = `${field.label} is required`;
      }

      if (field.type === 'number' && value !== undefined && value !== null) {
        if (field.min !== undefined && value < field.min) {
          newErrors[key] = `${field.label} must be at least ${field.min}`;
        }
        if (field.max !== undefined && value > field.max) {
          newErrors[key] = `${field.label} must be no more than ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsCalculating(true);

    try {
      const response = await fetch(`/api/calculators/${calculatorType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        onResult(data.result);
      } else {
        if (data.details) {
          // Handle validation errors from server
          const serverErrors: Record<string, string> = {};
          data.details.forEach((detail: any) => {
            serverErrors[detail.field] = detail.message;
          });
          setErrors(serverErrors);
        } else {
          alert('Calculation failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Calculation failed. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const renderField = (key: string, field: any) => {
    const value = formData[key];
    const error = errors[key];

    switch (field.type) {
      case 'text':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={key}
              type="text"
              value={value || ''}
              onChange={e => handleInputChange(key, e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'number':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={key}
              type="number"
              min={field.min}
              max={field.max}
              value={value || ''}
              onChange={e => handleInputChange(key, parseFloat(e.target.value) || 0)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'select':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <select
              id={key}
              value={value || ''}
              onChange={e => handleInputChange(key, e.target.value)}
              className={`flex h-10 w-full appearance-none rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-red-500' : 'border-input'}`}
            >
              <option value="">Select {field.label}</option>
              {field.options.map((option: any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'boolean':
        return (
          <div key={key} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value || false}
                onCheckedChange={checked => handleInputChange(key, checked)}
              />
              <Label htmlFor={key} className="text-sm font-medium">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </Label>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'range':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {field.label}: {value || field.min || 0}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Slider
              id={key}
              min={field.min || 0}
              max={field.max || 100}
              step={1}
              value={[value || field.min || 0]}
              onValueChange={values => handleInputChange(key, values[0])}
              className="w-full"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      case 'date':
        return (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Input
              id={key}
              type="date"
              value={value || ''}
              onChange={e => handleInputChange(key, e.target.value)}
              className={error ? 'border-red-500' : ''}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Loading calculator...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!schema || !metadata) {
    return (
      <Card>
        <CardContent className="p-8">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>Calculator not available. Please try again later.</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          {metadata.title}
        </CardTitle>
        <p className="text-gray-600">{metadata.description}</p>

        {metadata.practiceArea && (
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Info className="h-4 w-4" />
              Practice Area: {metadata.practiceArea}
            </span>
            {metadata.processingTime && (
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Typical Timeline: {metadata.processingTime}
              </span>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(schema).map(([key, field]) => renderField(key, field))}
          </div>

          <div className="border-t pt-6">
            <Button type="submit" disabled={isCalculating} className="w-full" size="lg">
              {isCalculating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Calculating...
                </>
              ) : (
                <>
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Results
                </>
              )}
            </Button>
          </div>

          {metadata.disclaimer && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Disclaimer:</strong> {metadata.disclaimer}
              </AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
