// Terminal HUD Logger
const TerminalHUD = (() => {
  const maxLogs = 6;
  let logs = [];

  const init = () => {
    const terminal = document.getElementById('terminal-hud');
    if (!terminal) return;

    // Initial system logs
    log('✔', 'System initialized', 'success');
    log('✔', 'Particles loaded', 'success');
    log('✔', 'UI initialized', 'success');
    
    // Fetch server status
    fetchServerStatus();
  };

  const log = (icon, message, type = 'info') => {
    const terminal = document.getElementById('terminal-logs');
    if (!terminal) return;

    const logEntry = document.createElement('div');
    logEntry.className = `terminal-log terminal-${type}`;
    logEntry.innerHTML = `<span class="log-icon">${icon}</span> <span class="log-text">${message}</span>`;
    
    terminal.appendChild(logEntry);
    logs.push(logEntry);

    // Keep only last N logs
    if (logs.length > maxLogs) {
      const removed = logs.shift();
      removed.remove();
    }

    // Auto-scroll to bottom
    terminal.scrollTop = terminal.scrollHeight;
  };

  const fetchServerStatus = async () => {
    try {
      // Mock server API call - replace with real API endpoint
      const latency = Math.floor(Math.random() * 50) + 15; // 15-65ms
      const onlinePlayers = Math.floor(Math.random() * 150) + 10; // 10-160 players
      const serverStatus = Math.random() > 0.2 ? 'Online' : 'Offline'; // 80% online

      log('◌', 'Pinging server...', 'info');
      
      setTimeout(() => {
        log('✔', `Server ${serverStatus}`, serverStatus === 'Online' ? 'success' : 'warning');
        log('✔', `Latency: ${latency}ms`, 'success');
        log('✔', `Players: ${onlinePlayers}`, 'success');
      }, 500);

      // Store status for display
      window.serverStatus = {
        status: serverStatus,
        latency,
        onlinePlayers,
        timestamp: new Date()
      };
    } catch (err) {
      log('✘', 'Server unreachable', 'error');
    }
  };

  const updatePlayerCount = (count) => {
    log('🔄', `Players: ${count}`, 'info');
  };

  return { init, log, fetchServerStatus, updatePlayerCount };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  TerminalHUD.init();
  
  // Refresh server status every 30 seconds
  setInterval(() => {
    TerminalHUD.fetchServerStatus();
  }, 30000);
});
