import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Agent Control Center - Vasquez Law Firm',
  description:
    'Manage CrewAI agents, monitor performance, and control automation for legal services',
};

export default function AgentsPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">AI Agent Control Center</h1>
          <p className="text-gray-300">
            Manage and monitor all CrewAI agents powering our legal automation services
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg shadow-xl p-4">
          <iframe
            src="/api/gradio"
            className="w-full h-[800px] rounded-lg"
            title="CrewAI Agent Control Panel"
          />
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Active Agents</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Legal Consultation Agent</li>
              <li>• Appointment Scheduling Agent</li>
              <li>• Document Analysis Agent</li>
              <li>• SEO Blog Generator</li>
              <li>• Social Media Monitor</li>
              <li>• Competition Monitor</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Integrations</h3>
            <ul className="space-y-2 text-gray-300">
              <li>✓ GoHighLevel CRM</li>
              <li>✓ Retell Voice AI</li>
              <li>✓ CrewAI Framework</li>
              <li>✓ OpenAI GPT-4</li>
              <li>✓ Database Storage</li>
              <li>✓ Email Automation</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-yellow-400 mb-3">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition-colors">
                View Agent Logs
              </button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition-colors">
                Train New Agent
              </button>
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors">
                System Health Check
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
