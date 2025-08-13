'use client';

import React, { useState } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';

export default function TestRetellPage() {
  const [status, setStatus] = useState('Ready');
  const [logs, setLogs] = useState<string[]>([]);
  const [retellClient, setRetellClient] = useState<RetellWebClient | null>(null);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] ${message}`]);
    console.log(message);
  };

  const testConnection = async () => {
    setStatus('Testing...');
    setLogs([]);
    const startTime = Date.now();

    try {
      // Step 1: Get token from backend
      addLog('1. Requesting access token from server...');
      const response = await fetch('/api/retell/create-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          language: 'en',
          agentId: process.env.NEXT_PUBLIC_RETELL_AGENT_ID || ''
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const elapsed = Date.now() - startTime;
      addLog(`2. Got token in ${elapsed}ms`);
      addLog(`   Call ID: ${data.call_id}`);
      addLog(`   Status: ${data.call_status}`);
      addLog(`   Token length: ${data.access_token?.length}`);

      // Step 2: Initialize SDK
      addLog('3. Initializing Retell SDK...');
      const client = new RetellWebClient();
      setRetellClient(client);

      // Step 3: Set up minimal listeners
      client.on('call_started', () => {
        const connTime = Date.now() - startTime;
        addLog(`✅ CONNECTED in ${connTime}ms!`);
        setStatus('Connected');
      });

      client.on('error', (error) => {
        addLog(`❌ ERROR: ${error.message || error}`);
        setStatus('Error');
      });

      client.on('call_ended', () => {
        addLog('📞 Call ended');
        setStatus('Ended');
      });

      // Step 4: Connect IMMEDIATELY
      const beforeConnect = Date.now() - startTime;
      addLog(`4. Connecting at ${beforeConnect}ms...`);
      
      await client.startCall({
        accessToken: data.access_token,
        sampleRate: 24000
      });

      const afterConnect = Date.now() - startTime;
      addLog(`5. startCall() completed at ${afterConnect}ms`);
      
      // Try audio after a short delay
      setTimeout(async () => {
        try {
          await client.startAudioPlayback();
          addLog('6. Audio playback started');
        } catch (e) {
          addLog(`6. Audio error: ${e}`);
        }
      }, 500);

    } catch (error: any) {
      addLog(`❌ FAILED: ${error.message}`);
      setStatus('Failed');
    }
  };

  const endCall = () => {
    if (retellClient) {
      retellClient.stopCall();
      setRetellClient(null);
      addLog('Call stopped');
      setStatus('Ready');
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'monospace' 
    }}>
      <h1>Retell Connection Test</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <strong>Status:</strong> {status}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={testConnection disabled={status === 'Testing...' || status === 'Connected'} style={{
            padding: '10px 20px',
            marginRight: '10px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Test Connection
        </button>
        
        <button 
          onClick={endCall disabled={!retellClient} style={{
            padding: '10px 20px',
            background: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          End Call
        </button>
      </div>

      <div style={{
        background: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        height: '400px',
        overflow: 'auto'
      }}>
        <h3>Logs:</h3>
        {logs.map((log, i) => (
          <div key={i}

                style={{ 
            marginBottom: '5px',
            color: log.includes('✅') ? 'green' : 
                   log.includes('❌') ? 'red' : 'black'
          }}>
            {log}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>This is a minimal test to diagnose the "user not joined" error.</p>
        <p>Open browser console for detailed logs.</p>
        <p>The connection must happen within 30 seconds of token creation.</p>
      </div>
    </div>
  );
}