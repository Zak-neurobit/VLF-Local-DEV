'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  FileText, 
  Calendar,
  Target,
  Info,
  Percent,
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface CalculatorResultsProps {
  result: any;
  onNewCalculation: () => void;
  onScheduleConsultation: () => void;
}

export default function CalculatorResults({ 
  result, 
  onNewCalculation, 
  onScheduleConsultation 
}: CalculatorResultsProps) {
  
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getAccuracyBadge = (accuracy: number) => {
    if (accuracy >= 80) return { variant: 'success' as const, label: 'High Accuracy' };
    if (accuracy >= 60) return { variant: 'warning' as const, label: 'Moderate Accuracy' };
    return { variant: 'secondary' as const, label: 'Estimate Only' };
  };

  const renderPersonalInjuryResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Economic Damages</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.results.economicDamages)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pain & Suffering</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.results.painAndSufferingAmount)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Estimated Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.results.adjustedTotal)}
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Settlement Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Conservative Estimate:</span>
              <span className="text-xl font-bold text-orange-600">
                {formatCurrency(result.results.settlementRange.low)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-medium">Optimistic Estimate:</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(result.results.settlementRange.high)}
              </span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-medium">Estimated Net to Client:</span>
              <span className="text-xl font-bold text-blue-600">
                {formatCurrency(result.results.estimatedNettoClient)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderImmigrationResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Success Probability</p>
                <p className="text-2xl font-bold text-green-600">
                  {result.results.successProbability}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estimated Timeline</p>
                <p className="text-2xl font-bold text-blue-600">
                  {result.results.estimatedTimeframe} mo
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.results.estimatedCost.total)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Attorney Fees:</span>
              <span className="font-medium">{formatCurrency(result.results.estimatedCost.attorney)}</span>
            </div>
            <div className="flex justify-between">
              <span>Filing Fees:</span>
              <span className="font-medium">{formatCurrency(result.results.estimatedCost.filing)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>{formatCurrency(result.results.estimatedCost.total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {result.results.nextSteps && (
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-2">
              {result.results.nextSteps.map((step: string, index: number) => (
                <li key={index} className="text-sm">{step}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderWorkersCompResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Weekly Benefit</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.results.weeklyBenefit)}
                </p>
              </div>
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Compensation</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(result.results.totalCompensation)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Medical Benefits</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(result.results.medicalBenefits)}
                </p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Benefits</p>
                <p className="text-2xl font-bold text-orange-600">
                  {formatCurrency(result.results.totalBenefits)}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Benefit Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Benefit Duration:</p>
              <p className="text-gray-600">{result.results.duration} weeks</p>
            </div>
            <div>
              <p className="font-medium">Medical Coverage:</p>
              <p className="text-gray-600">{result.results.maxMedicalBenefit}</p>
            </div>
            <div>
              <p className="font-medium">Vocational Rehabilitation:</p>
              <p className="text-gray-600">{result.results.vocationalRehab}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCriminalDefenseResults = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estimated Sentence</p>
                <p className="text-2xl font-bold text-red-600">
                  {result.results.estimatedSentenceMonths} months
                </p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Probation Likelihood</p>
                <p className="text-2xl font-bold text-green-600">
                  {result.results.probationLikelihood}%
                </p>
              </div>
              <Percent className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Costs</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(result.results.estimatedCosts.total)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Possible Outcomes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {result.results.possibleOutcomes.map((outcome: string, index: number) => (
              <Badge key={index} variant="outline" className="justify-center p-2">
                {outcome}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderFamilyLawResults = () => {
    const calculationType = result.inputs.calculationType;
    
    return (
      <div className="space-y-6">
        {calculationType === 'child_support' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Child Support</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.results.monthlyChildSupport)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Annual Support</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.results.annualSupport)}
                    </p>
                  </div>
                  <Calendar className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Income Share</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {result.results.payorIncomeShare.toFixed(1)}%
                    </p>
                  </div>
                  <Percent className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {calculationType === 'spousal_support' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Monthly Support</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.results.recommendedMonthlySupport)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="text-2xl font-bold text-green-600">
                      {result.results.estimatedDurationYears} years
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {formatCurrency(result.results.totalSupportAmount)}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {calculationType === 'property_division' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Marital Estate</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {formatCurrency(result.results.netMaritalEstate)}
                    </p>
                  </div>
                  <DollarSign className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Estimated Share</p>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(result.results.estimatedShare)}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  };

  const renderResults = () => {
    switch (result.calculatorType) {
      case 'personal_injury':
        return renderPersonalInjuryResults();
      case 'immigration':
        return renderImmigrationResults();
      case 'workers_compensation':
        return renderWorkersCompResults();
      case 'criminal_defense':
        return renderCriminalDefenseResults();
      case 'family_law':
        return renderFamilyLawResults();
      default:
        return <div>Results not available for this calculator type.</div>;
    }
  };

  const accuracyBadge = getAccuracyBadge(result.estimatedAccuracy);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Calculation Results
              </CardTitle>
              <p className="text-gray-600">
                Calculated {formatDistanceToNow(new Date(result.timestamp), { addSuffix: true })}
              </p>
            </div>
            <Badge {...accuracyBadge}>
              {accuracyBadge.label} ({result.estimatedAccuracy}%)
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Results */}
      {renderResults()}

      {/* Recommendations */}
      {result.recommendations && result.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {result.recommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Follow-up Actions */}
      {result.followUpActions && result.followUpActions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {result.followUpActions.map((action: any, index: number) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    action.priority === 'high' ? 'bg-red-500' :
                    action.priority === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <h4 className="font-medium capitalize">{action.action.replace(/_/g, ' ')}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    {action.timeframe && (
                      <p className="text-xs text-gray-500 mt-1">
                        Timeline: {action.timeframe}
                      </p>
                    )}
                  </div>
                  <Badge variant={
                    action.priority === 'high' ? 'destructive' :
                    action.priority === 'medium' ? 'warning' :
                    'secondary'
                  }>
                    {action.priority}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Important:</strong> {result.disclaimer}
        </AlertDescription>
      </Alert>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onScheduleConsultation} size="lg" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Schedule Free Consultation
        </Button>
        <Button onClick={onNewCalculation} variant="outline" size="lg" className="flex-1">
          <FileText className="h-4 w-4 mr-2" />
          New Calculation
        </Button>
      </div>
    </div>
  );
}