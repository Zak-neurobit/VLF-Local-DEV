import { NextRequest, NextResponse } from 'next/server';
import { getRetellClient } from '@/lib/retell-sdk/client';
import { logger } from '@/lib/safe-logger';

export async function GET(req: NextRequest) {
  try {
    const client = getRetellClient();
    const agentId = process.env.RETELL_AGENT_ID || '';
    const agentVersion = process.env.RETELL_AGENT_VERSION ? 
      parseInt(process.env.RETELL_AGENT_VERSION) : undefined;
    
    // 1. Test creating a web call
    logger.info('Testing web call creation...');
    const startTime = Date.now();
    
    const callParams: any = {
      agent_id: agentId,
    };
    
    if (agentVersion) {
      callParams.agent_version = agentVersion;
    }
    
    const webCall = await client.call.createWebCall(callParams);
    const createTime = Date.now() - startTime;
    
    // 2. Check call status immediately
    let callStatus = 'unknown';
    let disconnectReason = null;
    
    try {
      const callDetails = await client.call.retrieve(webCall.call_id);
      callStatus = callDetails.call_status;
      disconnectReason = callDetails.disconnection_reason;
    } catch (e) {
      logger.warn('Could not retrieve call details:', e);
    }
    
    // 3. Return diagnostic info
    const diagnostics = {
      success: true,
      timing: {
        createCallMs: createTime,
        tokenExpiresIn: '30000ms',
        mustJoinWithin: '30000ms',
        currentTime: new Date().toISOString()
      },
      call: {
        id: webCall.call_id,
        status: webCall.call_status,
        currentStatus: callStatus,
        disconnectReason: disconnectReason,
        hasToken: !!webCall.access_token,
        tokenLength: webCall.access_token?.length
      },
      agent: {
        id: agentId,
        version: agentVersion || 'not specified'
      },
      recommendations: []
    };
    
    // Add recommendations based on findings
    if (disconnectReason === 'error_user_not_joined') {
      diagnostics.recommendations.push('User must join within 30 seconds');
    }
    
    if (createTime > 5000) {
      diagnostics.recommendations.push('Call creation took too long (' + createTime + 'ms)');
    }
    
    if (!agentVersion) {
      diagnostics.recommendations.push('Consider specifying agent version for consistency');
    }
    
    logger.info('Connection test completed:', diagnostics);
    
    return NextResponse.json(diagnostics);
    
  } catch (error: any) {
    logger.error('Connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      details: error.body || error.status || 'Unknown error',
      recommendations: [
        'Check RETELL_API_KEY is valid',
        'Verify agent ID exists',
        'Ensure agent is published (not in draft mode)'
      ]
    }, { status: 500 });
  }
}